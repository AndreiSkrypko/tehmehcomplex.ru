import { submitRequest } from "./submit-request.functions";

type SendResult = { ok: true } | { ok: false; error: string };

export async function sendRequest(formData: FormData): Promise<SendResult> {
  try {
    if (import.meta.env.DEV) {
      await submitRequest({ data: formData });
      return { ok: true };
    }

    const response = await fetch("/api/submit.php", {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

    if (!response.ok || !payload?.ok) {
      return { ok: false, error: payload?.error ?? "Не удалось отправить заявку" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Не удалось отправить заявку. Попробуйте позже." };
  }
}
