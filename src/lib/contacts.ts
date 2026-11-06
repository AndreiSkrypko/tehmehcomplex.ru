export type ContactPhone = {
  label: string;
  display: string;
  href: string;
  email: string;
};

export const PHONES: ContactPhone[] = [
  {
    label: "Приём заказов",
    display: "+7 920 338 12 29",
    href: "tel:+79203381229",
    email: "tehmehkomplex@inbox.ru",
  },
];

export const PHONE_DISPLAY = PHONES[0].display;
export const PHONE_HREF = PHONES[0].href;
export const MARKETING_PHONE_DISPLAY = PHONES[0].display;
export const MARKETING_PHONE_HREF = PHONES[0].href;

export const EMAIL = "tehmehkomplex@inbox.ru";
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const TELEGRAM_HREF = "https://t.me/+79203381229";
export const VIBER_HREF = "viber://chat?number=%2B79203381229";

export const ADDRESS_LEGAL =
  "214030, Российская Федерация, г. Смоленск, ул. Докучаева, д. 5, оф. 1";
export const ADDRESS_POSTAL = ADDRESS_LEGAL;
