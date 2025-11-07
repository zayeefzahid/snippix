import { Switch } from "@/components/ui/switch";
import { usePreferencesStore } from "@/stores/usePreferencesStore";

export default function DarkModeSwitch() {
  const darkMode = usePreferencesStore((state) => state.darkMode);
  const setDarkMode = usePreferencesStore((state) => state.setDarkMode);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium">Dark Mode</label>
      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
    </div>
  );
}
