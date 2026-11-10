/** Настройки доставки заявок (почта + Telegram). На Vercel — переменные окружения; на PHP-хостинге — public/api/config.php */
export const DELIVERY_CONFIG = {
  emailTo: process.env.EMAIL_TO ?? "info@tehmehcomplex.ru",
  emailFrom: process.env.EMAIL_FROM ?? "noreply@tehmehcomplex.ru",

  smtpHost: process.env.SMTP_HOST ?? "",
  smtpPort: Number(process.env.SMTP_PORT ?? 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER ?? "",
  smtpPass: process.env.SMTP_PASS ?? "",

  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN ?? "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID ?? "",
};
