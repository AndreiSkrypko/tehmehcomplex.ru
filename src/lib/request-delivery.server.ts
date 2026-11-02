import nodemailer from "nodemailer";

import { DELIVERY_CONFIG } from "./delivery-config";
import { SITE_DOMAIN } from "./site";
import {
  REQUEST_ALLOWED_EXTENSIONS,
  REQUEST_MAX_FILE_BYTES,
  isAllowedRequestFile,
} from "./request-form";

type RequestPayload = {
  name: string;
  phone: string;
  company: string;
  message: string;
  file?: File | null;
};

type DeliveryConfig = {
  emailTo: string;
  emailFrom: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  telegramBotToken: string;
  telegramChatId: string;
};

function getConfig(): DeliveryConfig {
  return { ...DELIVERY_CONFIG };
}

function buildMessageText(payload: RequestPayload): string {
  const lines = [
    `Новая заявка с сайта ${SITE_DOMAIN}`,
    "",
    `Имя: ${payload.name}`,
    `Телефон: ${payload.phone}`,
  ];

  if (payload.company.trim()) lines.push(`Компания: ${payload.company.trim()}`);
  if (payload.message.trim()) {
    lines.push("");
    lines.push("Задача:");
    lines.push(payload.message.trim());
  }

  if (payload.file) {
    lines.push("");
    lines.push(`Файл: ${payload.file.name}`);
  }

  return lines.join("\n");
}

function validatePayload(payload: RequestPayload) {
  if (payload.name.trim().length < 2) {
    throw new Error("Укажите имя (минимум 2 символа)");
  }

  const digits = payload.phone.replace(/\D/g, "");
  if (digits.length < 9) {
    throw new Error("Укажите корректный номер телефона");
  }

  if (payload.file) {
    if (payload.file.size > REQUEST_MAX_FILE_BYTES) {
      throw new Error("Файл слишком большой (максимум 10 МБ)");
    }
    if (!isAllowedRequestFile(payload.file)) {
      throw new Error(`Разрешены файлы: ${REQUEST_ALLOWED_EXTENSIONS.join(", ")}`);
    }
  }
}

async function sendEmail(config: DeliveryConfig, payload: RequestPayload, text: string) {
  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: config.smtpUser
      ? {
          user: config.smtpUser,
          pass: config.smtpPass,
        }
      : undefined,
  });

  const subject = `Заявка с сайта: ${payload.name.trim()}`;
  const attachments =
    payload.file && payload.file.size > 0
      ? [
          {
            filename: payload.file.name,
            content: Buffer.from(await payload.file.arrayBuffer()),
          },
        ]
      : undefined;

  await transporter.sendMail({
    from: config.emailFrom,
    to: config.emailTo,
    subject,
    text,
    attachments,
  });
}

async function sendTelegram(config: DeliveryConfig, text: string, file?: File | null) {
  if (!config.telegramBotToken || !config.telegramChatId) {
    throw new Error("Не настроен Telegram в delivery-config.ts / api/config.php");
  }

  if (file && file.size > 0) {
    const body = new FormData();
    body.append("chat_id", config.telegramChatId);
    body.append("caption", text);
    body.append("document", file, file.name);

    const response = await fetch(
      `https://api.telegram.org/bot${config.telegramBotToken}/sendDocument`,
      {
        method: "POST",
        body,
      },
    );

    if (!response.ok) {
      throw new Error(`Не удалось отправить заявку в Telegram: ${await response.text()}`);
    }
    return;
  }

  const response = await fetch(
    `https://api.telegram.org/bot${config.telegramBotToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: config.telegramChatId,
        text,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Не удалось отправить заявку в Telegram: ${await response.text()}`);
  }
}

export async function deliverRequest(payload: RequestPayload) {
  validatePayload(payload);
  const config = getConfig();
  const text = buildMessageText(payload);

  const tasks: Promise<void>[] = [sendTelegram(config, text, payload.file)];

  if (config.smtpHost) {
    tasks.push(sendEmail(config, payload, text));
  }

  await Promise.all(tasks);

  return { ok: true as const };
}
