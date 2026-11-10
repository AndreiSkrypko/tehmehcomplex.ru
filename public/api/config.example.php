<?php
/**
 * Скопируйте в config.php на хостинге и заполните значения.
 * Заявка сначала уходит на почту, затем дублируется в Telegram (если указан бот).
 */
return [
    'email_to' => 'info@tehmehcomplex.ru',
    'email_from' => 'noreply@tehmehcomplex.ru',

    'telegram_bot_token' => '',
    'telegram_chat_id' => '',
];
