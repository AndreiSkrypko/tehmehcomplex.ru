import { useEffect, useRef, useState } from "react";

import { PHONE_DISPLAY } from "@/lib/contacts";
import {
  REQUEST_ACCEPT,
  REQUEST_MAX_FILE_BYTES,
  formatRequestFileSize,
  isAllowedRequestFile,
} from "@/lib/request-form";
import { sendRequest } from "@/lib/send-request";

type Errors = { name?: string; phone?: string; agree?: string; file?: string; submit?: string };

type RequestModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  presetMessage?: string;
  contactPhone?: string;
};

export function RequestModal({
  open,
  onClose,
  title = "Рассчитать стоимость",
  subtitle = "Опишите задачу — ответим со сроками и ценой.",
  presetMessage = "",
  contactPhone = PHONE_DISPLAY,
}: RequestModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSent(false);
      setErrors({});
      setSubmitting(false);
      setMessage(presetMessage);
    }
  }, [open, presetMessage]);

  if (!open) return null;

  const validate = () => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Укажите имя (минимум 2 символа)";
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9) e.phone = "Укажите корректный номер телефона";
    if (!agree) e.agree = "Необходимо согласие на обработку данных";
    if (file) {
      if (file.size > REQUEST_MAX_FILE_BYTES) {
        e.file = "Файл слишком большой (максимум 10 МБ)";
      } else if (!isAllowedRequestFile(file)) {
        e.file = "Недопустимый тип файла";
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const pickFile = (next: File | null) => {
    if (!next) {
      setFile(null);
      return;
    }
    if (next.size > REQUEST_MAX_FILE_BYTES) {
      setErrors((prev) => ({ ...prev, file: "Файл слишком большой (максимум 10 МБ)" }));
      return;
    }
    if (!isAllowedRequestFile(next)) {
      setErrors((prev) => ({ ...prev, file: "Недопустимый тип файла" }));
      return;
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    setFile(next);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || submitting) return;

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("phone", phone.trim());
    formData.append("company", company.trim());
    formData.append("message", message.trim());
    if (file) formData.append("file", file);

    setSubmitting(true);
    const result = await sendRequest(formData);
    setSubmitting(false);

    if (!result.ok) {
      setErrors((prev) => ({ ...prev, submit: result.error }));
      return;
    }

    setSent(true);
    setName("");
    setPhone("");
    setCompany("");
    setMessage("");
    setFile(null);
    setAgree(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const field =
    "w-full rounded-md border border-border bg-background px-3 py-1.5 text-sm outline-none transition-colors focus:border-ink sm:py-2";
  const label = "mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-carbon/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Заявка на расчёт"
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-base leading-none transition-colors hover:bg-secondary"
        >
          ×
        </button>

        <div className="p-4 sm:p-6">
          {sent ? (
            <div className="py-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lime text-xl font-bold text-ink">
                ✓
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold uppercase tracking-wide">
                Заявка отправлена
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Свяжемся в течение рабочего дня. Срочно — {contactPhone}.
              </p>
              <button
                onClick={onClose}
                className="mt-5 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition-colors hover:bg-graphite"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3 className="pr-8 font-display text-lg font-semibold uppercase leading-tight sm:text-2xl">
                {title}
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{subtitle}</p>

              <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className={label}>Имя*</label>
                    <input
                      className={field}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ваше имя"
                    />
                    {errors.name && <p className="mt-0.5 text-[11px] text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={label}>Телефон*</label>
                    <input
                      className={field}
                      value={phone}
                      inputMode="tel"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 ___ ___-__-__"
                    />
                    {errors.phone && (
                      <p className="mt-0.5 text-[11px] text-destructive">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={label}>Компания</label>
                  <input
                    className={field}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Необязательно"
                  />
                </div>

                <div>
                  <label className={label}>Задача</label>
                  <textarea
                    className={`${field} min-h-[2.75rem] resize-none leading-snug sm:min-h-[3.5rem]`}
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Что изготовить, тираж, сроки"
                  />
                </div>

                <div>
                  <label className={label}>Файл</label>
                  <div
                    className={`flex items-center gap-2 rounded-md border px-3 py-2 ${
                      file ? "border-lime-deep/40 bg-lime/10" : "border-dashed border-border bg-secondary/30"
                    }`}
                  >
                    <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept={REQUEST_ACCEPT}
                        className="hidden"
                        onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                      />
                      <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-lime-deep">
                        {file ? "Файл" : "Добавить"}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {file
                          ? `${file.name} · ${formatRequestFileSize(file.size)}`
                          : "PDF, DXF, DWG · до 10 МБ"}
                      </span>
                    </label>
                    {file ? (
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="shrink-0 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-ink"
                      >
                        ×
                      </button>
                    ) : null}
                  </div>
                  {errors.file && <p className="mt-0.5 text-[11px] text-destructive">{errors.file}</p>}
                </div>

                <label className="flex items-center gap-2 text-[11px] leading-tight text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="h-3.5 w-3.5 shrink-0 accent-ink"
                  />
                  <span>Согласен на обработку персональных данных</span>
                </label>
                {errors.agree && <p className="text-[11px] text-destructive">{errors.agree}</p>}
                {errors.submit && <p className="text-[11px] text-destructive">{errors.submit}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-3 w-full rounded-full bg-brand px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.12em] text-brand-foreground transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:mt-4 sm:py-3"
              >
                {submitting ? "Отправка…" : "Отправить заявку"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
