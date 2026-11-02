import { PHONES } from "@/lib/contacts";

type ContactPhonesProps = {
  variant?: "footer" | "section";
};

export function ContactPhones({ variant = "footer" }: ContactPhonesProps) {
  const linkClass =
    variant === "section"
      ? "block font-display text-xl font-semibold transition-colors hover:text-lime-deep lg:text-2xl"
      : "block font-display text-lg text-background transition-colors hover:text-brand";

  const labelClass =
    variant === "section"
      ? "text-xs uppercase tracking-wider text-muted-foreground"
      : "text-xs uppercase tracking-wider text-background/55";

  const emailClass =
    variant === "section"
      ? "mt-1.5 block text-sm text-muted-foreground transition-colors hover:text-lime-deep"
      : "mt-1.5 block text-sm text-background/70 transition-colors hover:text-brand";

  return (
    <div className="space-y-5">
      {PHONES.map((phone) => (
        <div key={phone.label}>
          <p className={labelClass}>{phone.label}</p>
          <a href={phone.href} className={`${linkClass} mt-1.5`}>
            {phone.display}
          </a>
          <a href={`mailto:${phone.email}`} className={emailClass}>
            {phone.email}
          </a>
        </div>
      ))}
    </div>
  );
}
