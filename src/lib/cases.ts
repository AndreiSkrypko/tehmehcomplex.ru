import caseAssemblyPack from "@/assets/cases/case-assembly-pack.png";
import caseHardwarePlates from "@/assets/cases/case-hardware-plates.jpg";
import caseKitMixed from "@/assets/cases/case-kit-mixed.jpg";
import caseFlangesImg from "@/assets/case-flanges.jpg";
import caseFrameImg from "@/assets/case-frame.jpg";
import caseTurnedImg from "@/assets/case-turned.jpg";

export type CaseStudy = {
  id: string;
  eyebrow: string;
  title: string;
  img: string;
  alt: string;
  place: string;
  kind: string;
  task: string;
  solution: string;
  result: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "flanges",
    eyebrow: "Машиностроение",
    title: "Крепёжная серия для агрегата",
    img: caseFlangesImg,
    alt: "Стальные фланцы после фрезерования на обрабатывающем центре",
    place: "Смоленск",
    kind: "Серия 80 шт.",
    task: "Планшайбы с шлицем, допуск ±0,02 мм",
    solution: "ЧПУ-фреза, калибровка, упаковка под отгрузку",
    result: "Сдано за 7 рабочих дней, брак 0 %",
  },
  {
    id: "frame",
    eyebrow: "Оборудование",
    title: "Силовая рама станка",
    img: caseFrameImg,
    alt: "Сварная рама из листового металла после лазерной резки и гибки",
    place: "Смоленская область",
    kind: "Единичный проект",
    task: "Рама по DXF, контроль диагоналей",
    solution: "Лазер + гибка + сварка MIG",
    result: "Монтаж у заказчика без подгонки",
  },
  {
    id: "turned",
    eyebrow: "Цветной металл",
    title: "Втулки из латуни Л63",
    img: caseTurnedImg,
    alt: "Латунные втулки после токарной обработки",
    place: "Москва",
    kind: "Приборостроение",
    task: "60 втулок, внутренняя резьба M8",
    solution: "Токарка ЧПУ, пассивация по согласованию",
    result: "Повторный заказ через 3 недели",
  },
  {
    id: "kit-mixed",
    eyebrow: "Комплектация под ключ",
    title: "Смешанный комплект: металл, пластик, крепёж",
    img: caseKitMixed,
    alt: "Комплект металлических и пластиковых деталей с крепежом после обработки на ЧПУ",
    place: "Смоленск",
    kind: "Сборочный комплект",
    task: "Изготовить набор деталей из разных материалов под единый монтажный узел",
    solution: "ЧПУ-обработка металла и пластика, подбор метизов, отгрузка одной партией",
    result: "",
  },
  {
    id: "hardware-plates",
    eyebrow: "Срочный заказ",
    title: "Монтажная фурнитура и пластины",
    img: caseHardwarePlates,
    alt: "Пластины, болты и фурнитура для монтажного узла после лазерной резки и мехобработки",
    place: "Смоленск",
    kind: "Фурнитура по спецификации",
    task: "Листовые детали и крепёж для узла по чертежу в сжатые сроки",
    solution: "Лазерная резка, мехобработка пластин, комплектация по ведомости",
    result: "",
  },
  {
    id: "assembly-pack",
    eyebrow: "Готово к монтажу",
    title: "Сборочный комплект в упаковке",
    img: caseAssemblyPack,
    alt: "Сборочный комплект в упаковке с маркировкой перед отгрузкой заказчику",
    place: "Смоленск",
    kind: "Комплектация и маркировка",
    task: "Упаковать детали и крепёж с маркировкой для выездного монтажа",
    solution: "Комплектация по спецификации, маркировка, защитная фасовка",
    result: "",
  },
];

export const CASE_STUDIES_HOME = CASE_STUDIES.filter((c) =>
  ["flanges", "frame", "turned"].includes(c.id),
);

export const CASES_HERO_IMAGE = caseFrameImg;

export const CASES_PAGE_TITLE = "Кейсы — примеры металлообработки | ТехМехКомплекс";
export const CASES_PAGE_DESC =
  "Реальные заказы ТехМехКомплекс в Смоленске: серийные и единичные изделия, комплекты деталей, листовая фурнитура. Фрезерование, лазер, гибка, токарка. Поставки по России.";
