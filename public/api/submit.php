<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Сервер не настроен: отсутствует api/config.php']);
    exit;
}

$config = require $configPath;
$token = trim((string) ($config['telegram_bot_token'] ?? ''));
$chatId = trim((string) ($config['telegram_chat_id'] ?? ''));
$emailTo = trim((string) ($config['email_to'] ?? 'info@tehmehcomplex.ru'));
$emailFrom = trim((string) ($config['email_from'] ?? 'noreply@tehmehcomplex.ru'));

if ($emailTo === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Сервер не настроен: укажите email_to в config.php']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$company = trim((string) ($_POST['company'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$file = $_FILES['file'] ?? null;

if (mb_strlen($name) < 2) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Укажите имя (минимум 2 символа)']);
    exit;
}

$phoneDigits = preg_replace('/\D+/', '', $phone) ?? '';
if (strlen($phoneDigits) < 9) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Укажите корректный номер телефона']);
    exit;
}

$allowedExtensions = ['pdf', 'dxf', 'dwg', 'zip', 'rar', '7z', 'png', 'jpg', 'jpeg', 'stp', 'step'];
$maxFileBytes = 10 * 1024 * 1024;
$uploadedFile = null;

if (is_array($file) && ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Не удалось загрузить файл']);
        exit;
    }

    if (($file['size'] ?? 0) > $maxFileBytes) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Файл слишком большой (максимум 10 МБ)']);
        exit;
    }

    $originalName = (string) ($file['name'] ?? 'file');
    $extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));

    if (!in_array($extension, $allowedExtensions, true)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Недопустимый тип файла']);
        exit;
    }

    $uploadedFile = $file;
}

$textLines = [
    'Новая заявка с сайта tehmehcomplex.ru',
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
];

if ($company !== '') {
    $textLines[] = 'Компания: ' . $company;
}

if ($message !== '') {
    $textLines[] = '';
    $textLines[] = 'Задача:';
    $textLines[] = $message;
}

if ($uploadedFile !== null) {
    $textLines[] = '';
    $textLines[] = 'Файл: ' . (string) $uploadedFile['name'];
}

$text = implode("\n", $textLines);
$subject = 'Заявка с сайта: ' . $name;

function sendTelegram(string $token, string $chatId, string $text, ?array $file): bool
{
    if ($file !== null) {
        $url = "https://api.telegram.org/bot{$token}/sendDocument";
        $postFields = [
            'chat_id' => $chatId,
            'caption' => $text,
            'document' => new CURLFile((string) $file['tmp_name'], (string) ($file['type'] ?? 'application/octet-stream'), (string) $file['name']),
        ];
    } else {
        $url = "https://api.telegram.org/bot{$token}/sendMessage";
        $postFields = [
            'chat_id' => $chatId,
            'text' => $text,
        ];
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $postFields,
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $response !== false && $status >= 200 && $status < 300;
}

function sendEmail(string $to, string $from, string $subject, string $text, ?array $file): bool
{
    $boundary = 'romedov_' . md5((string) microtime(true));
    $headers = [
        'From: ' . $from,
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    ];

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $text . "\r\n";

    if ($file !== null) {
        $fileName = (string) $file['name'];
        $fileContent = chunk_split(base64_encode((string) file_get_contents((string) $file['tmp_name'])));
        $body .= "--{$boundary}\r\n";
        $body .= 'Content-Type: application/octet-stream; name="' . $fileName . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= 'Content-Disposition: attachment; filename="' . $fileName . "\"\r\n\r\n";
        $body .= $fileContent . "\r\n";
    }

    $body .= "--{$boundary}--";

    return mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

// 1. Сначала почта — без неё заявка не считается принятой
$emailOk = sendEmail($emailTo, $emailFrom, $subject, $text, $uploadedFile);

if (!$emailOk) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Не удалось отправить заявку на почту']);
    exit;
}

// 2. Дублируем в Telegram (ошибка бота не отменяет успешную заявку)
if ($token !== '' && $chatId !== '') {
    sendTelegram($token, $chatId, $text, $uploadedFile);
}

echo json_encode(['ok' => true]);
