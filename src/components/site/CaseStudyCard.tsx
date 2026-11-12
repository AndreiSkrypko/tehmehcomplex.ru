import type { CaseStudy } from "@/lib/cases";

type Props = {
  study: CaseStudy;
  variant?: "compact" | "detailed";
};

export function CaseStudyCard({ study, variant = "compact" }: Props) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition-colors hover:border-ink">
      <div className="overflow-hidden bg-secondary">
        <img
          src={study.img}
          alt={study.alt}
          loading="lazy"
          width={900}
          height={540}
          className="aspect-[5/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.16em] text-lime-deep">
          {study.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-base font-semibold uppercase leading-snug lg:text-lg">
          {study.title}
        </h3>
        <p className="mt-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
          {study.place} · {study.kind}
        </p>

        {variant === "compact" ? (
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {study.task}
            <span className="mx-1.5 text-border">·</span>
            {study.solution}
          </p>
        ) : (
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Задача
              </dt>
              <dd className="mt-1.5 leading-relaxed text-foreground">{study.task}</dd>
            </div>
            <div>
              <dt className="font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Решение
              </dt>
              <dd className="mt-1.5 leading-relaxed text-muted-foreground">{study.solution}</dd>
            </div>
          </dl>
        )}
      </div>
    </article>
  );
}
