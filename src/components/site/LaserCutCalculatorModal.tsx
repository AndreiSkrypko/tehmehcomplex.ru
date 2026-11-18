import { LaserCutCalculator } from "@/components/site/LaserCutCalculator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LASER_EQUIPMENT_SLUG } from "@/lib/laser-cutting-rates";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LaserCutCalculatorModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(92vh,880px)] max-w-2xl overflow-y-auto sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase tracking-wide">
            Калькулятор лазерной резки
          </DialogTitle>
          <DialogDescription className="text-left text-sm leading-relaxed">
            Предварительный расчёт в ₽ (целые), на 60 % выше белорусского ориентира, без НДС.
          </DialogDescription>
        </DialogHeader>

        <LaserCutCalculator variant="compact" />

        <p className="text-center text-xs">
          <a
            href={`/production/${LASER_EQUIPMENT_SLUG}#laser-calculator`}
            className="font-semibold text-lime-deep underline-offset-2 hover:underline"
            onClick={() => onOpenChange(false)}
          >
            Открыть калькулятор на странице лазерной резки
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}