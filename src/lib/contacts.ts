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
  "214036, Российская Федерация, г. Смоленск, ул. Рыленкова, д. 50, оф. 7";
export const ADDRESS_POSTAL = ADDRESS_LEGAL;
export const ADDRESS_PRODUCTION = "г. Смоленск, ул. Нормандия-Неман, д. 23";
export const ACCESS_NOTE = "";

export const PRODUCTION_LAT = 54.776444;
export const PRODUCTION_LON = 32.016108;
export const PRODUCTION_COORDINATES = "54.776444, 32.016108";
export const PRODUCTION_MAP_HREF = `https://www.openstreetmap.org/?mlat=${PRODUCTION_LAT}&mlon=${PRODUCTION_LON}#map=17/${PRODUCTION_LAT}/${PRODUCTION_LON}`;
export const PRODUCTION_MAP_EMBED_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=32.001108%2C54.766444%2C32.031108%2C54.786444&layer=mapnik&marker=${PRODUCTION_LAT}%2C${PRODUCTION_LON}`;
