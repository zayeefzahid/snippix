import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { themes } from "@/lib/options";

export default function ThemeSelect() {
  const theme = usePreferencesStore((state) => state.theme);
  const setTheme = usePreferencesStore((state) => state.setTheme);

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
    <div>
      <label className="block mb-2 text-xs font-medium">Theme</label>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(themes).map((key) => (
            <SelectItem key={key} value={key}>
              {themeNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
