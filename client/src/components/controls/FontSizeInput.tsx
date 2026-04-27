import { Input } from "@/components/ui/input";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import ControlField from "./ControlField";

export default function FontSizeInput() {
  const fontSize = usePreferencesStore(state => state.fontSize);
  const setFontSize = usePreferencesStore(state => state.setFontSize);

  return (
    <ControlField label="Size">
      <Input
        type="number"
        min={12}
        max={32}
        value={fontSize}
        onChange={e => setFontSize(Number(e.target.value))}
        className="w-24"
      />
    </ControlField>
  );
}
