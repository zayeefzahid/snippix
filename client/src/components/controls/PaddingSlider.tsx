import { Slider } from "@/components/ui/slider";
import { usePreferencesStore } from "@/stores/usePreferencesStore";

export default function PaddingSlider() {
  const padding = usePreferencesStore((state) => state.padding);
  const setPadding = usePreferencesStore((state) => state.setPadding);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium">
        Padding: {padding}px
      </label>
      <Slider
        value={[padding]}
        onValueChange={(value) => setPadding(value[0])}
        min={16}
        max={128}
        step={8}
        className="w-44"
      />
    </div>
  );
}
