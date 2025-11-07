import { Input } from "@/components/ui/input";
import { usePreferencesStore } from "@/stores/usePreferencesStore";

export default function FontSizeInput() {
  const fontSize = usePreferencesStore((state) => state.fontSize);
  const setFontSize = usePreferencesStore((state) => state.setFontSize);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium">Font Size</label>
      <Input
        type="number"
        min={12}
        max={32}
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
        className="w-20"
      />
    </div>
  );
}
