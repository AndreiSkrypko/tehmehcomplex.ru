/** Настройки доставки заявок (почта + Telegram). Без .env — правьте здесь и в public/api/config.php */
export const DELIVERY_CONFIG = {
  emailTo: "tehmehkomplex@inbox.ru",
  emailFrom: "noreply@tehmehcomplex.ru",

  smtpHost: "",
  smtpPort: 587,
  smtpSecure: false,
  smtpUser: "",
  smtpPass: "",

  telegramBotToken: "8661491352:AAE0WeO8oIbW5DBBiAlNOcbr9KdfROro_gY",
  telegramChatId: "8885035429",
};
