import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { fonts } from "@/lib/options";
import ControlField from "./ControlField";

export default function FontSelect() {
  const fontStyle = usePreferencesStore(state => state.fontStyle);
  const setFontStyle = usePreferencesStore(state => state.setFontStyle);

  return (
    <ControlField label="Font">
      <Select value={fontStyle} onValueChange={setFontStyle}>
        <SelectTrigger className="w-full min-w-40">
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
    </ControlField>
  );
}
