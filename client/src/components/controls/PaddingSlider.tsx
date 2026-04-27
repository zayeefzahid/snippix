import { Slider } from "@/components/ui/slider";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import ControlField from "./ControlField";

export default function PaddingSlider() {
  const padding = usePreferencesStore(state => state.padding);
  const setPadding = usePreferencesStore(state => state.setPadding);

  return (
    <ControlField label="Padding" value={`${padding}px`} className="min-w-48">
      <Slider
        value={[padding]}
        onValueChange={value => setPadding(value[0])}
        min={16}
        max={128}
        step={8}
        className="h-10 w-full"
      />
    </ControlField>
  );
}
