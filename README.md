# ТехМехКомплекс (tehmehcomplex.ru)

Сайт ООО «ТехМехКомплекс»: контрактная металлообработка на ЧПУ в Смоленске. Логотип **TMK**, палитра как у платформы RMV; юридически и для SEO — отдельный проект.

См. [docs/SEO-UNIQUENESS.md](docs/SEO-UNIQUENESS.md) — как не попасть под фильтр дублей.

## Разработка

```sh
npm i
npm run dev
```

```sh
npm run build
npm run preview
```

Конфигурация компании: `src/lib/site.ts`, `src/lib/contacts.ts`, `src/lib/legal.ts`.

## Деплой (Vercel)

- Сборка: `npm run build` или `npm run build:vercel` → весь статический сайт в **`dist/`** (страницы, assets, `robots.txt`, `sitemap.xml`, `api/`).
- `robots.txt` и `sitemap.xml` генерируются при сборке (`scripts/generate-seo.mjs`).
- Форма заявки на Vercel: `api/submit.ts` (не PHP). В проекте Vercel задайте переменные из `.env.example` (`TELEGRAM_*`, при необходимости SMTP).
- На PHP-хостинге: скопируйте `public/api/config.example.php` → `config.php`, заявки идут на `/api/submit.php`.

После push на `main` — redeploy в Vercel. Домен: `tehmehcomplex.ru`.
