import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { themes } from "@/lib/options";
import ControlField from "./ControlField";

export default function ThemeSelect() {
  const theme = usePreferencesStore(state => state.theme);
  const setTheme = usePreferencesStore(state => state.setTheme);

  const themeNames: Record<string, string> = {
    hyper: "Hyper",
    oceanic: "Oceanic",
    candy: "Candy",
    sublime: "Sublime",
    horizon: "Horizon",
    coral: "Coral",
    peach: "Peach",
    flamingo: "Flamingo",
    gotham: "Gotham",
    ice: "Ice",
  };

  return (
    <ControlField label="Theme">
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-full min-w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(themes).map(key => (
            <SelectItem key={key} value={key}>
              {themeNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ControlField>
  );
}
