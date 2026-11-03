import { deliverRequest } from "../src/lib/request-delivery.server";

export const config = {
  api: {
    bodyParser: false,
  },
};

function json(res: { statusCode: number; setHeader: (k: string, v: string) => void; end: (b: string) => void }, status: number, payload: object) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return value == null ? "" : String(value);
}

export default async function handler(
  req: { method?: string; headers: Record<string, string | string[] | undefined> },
  res: Parameters<typeof json>[0],
) {
  if (req.method !== "POST") {
    return json(res, 405, { ok: false, error: "Method not allowed" });
  }

  try {
    const host = (req.headers.host as string | undefined) ?? "tehmehcomplex.ru";
    const request = new Request(`https://${host}/api/submit`, {
      method: "POST",
      headers: req.headers as HeadersInit,
      body: req as unknown as BodyInit,
      duplex: "half",
    });

    const formData = await request.formData();
    const fileValue = formData.get("file");
    const file = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;

    await deliverRequest({
      name: field(formData, "name"),
      phone: field(formData, "phone"),
      company: field(formData, "company"),
      message: field(formData, "message"),
      file,
    });

    return json(res, 200, { ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось отправить заявку";
    const status = message.includes("Укажите") || message.includes("Файл") ? 400 : 502;
    return json(res, status, { ok: false, error: message });
  }
}
