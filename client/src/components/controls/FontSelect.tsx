import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { fonts } from "@/lib/options";

export default function FontSelect() {
  const fontStyle = usePreferencesStore((state) => state.fontStyle);
  const setFontStyle = usePreferencesStore((state) => state.setFontStyle);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium">Font</label>
      <Select value={fontStyle} onValueChange={setFontStyle}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(fonts).map(([key, { name }]) => (
            <SelectItem key={key} value={key}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
