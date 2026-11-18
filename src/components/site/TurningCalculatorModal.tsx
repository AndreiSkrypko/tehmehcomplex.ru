import { TurningCalculator } from "@/components/site/TurningCalculator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TURNING_EQUIPMENT_SLUG } from "@/lib/turning-rates";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function TurningCalculatorModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(92vh,880px)] max-w-2xl overflow-y-auto sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl uppercase tracking-wide">
            Калькулятор токарной обработки
          </DialogTitle>
          <DialogDescription className="text-left text-sm leading-relaxed">
            Предварительный расчёт в российских рублях (целые суммы), ориентир на 60 % выше
            белорусского прайса.
          </DialogDescription>
        </DialogHeader>

        <TurningCalculator variant="compact" />

        <p className="text-center text-xs">
          <a
            href={`/production/${TURNING_EQUIPMENT_SLUG}#turning-calculator`}
            className="font-semibold text-lime-deep underline-offset-2 hover:underline"
            onClick={() => onOpenChange(false)}
          >
            Открыть калькулятор на странице токарных работ
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}