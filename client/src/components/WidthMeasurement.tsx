import { cn } from "@/lib/utils";

interface WidthMeasurementProps {
  showWidth: boolean;
  width: number;
}

export default function WidthMeasurement({
  showWidth,
  width,
}: WidthMeasurementProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center text-xs text-neutral-400 transition-all",
        showWidth && width > 0 ? "visible opacity-100" : "invisible opacity-0"
      )}
    >
      {width > 0 && <span>{width}px</span>}
    </div>
  );
}
