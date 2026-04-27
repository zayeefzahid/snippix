import { Switch } from "@/components/ui/switch";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import ControlField from "./ControlField";

export default function DarkModeSwitch() {
  const darkMode = usePreferencesStore(state => state.darkMode);
  const setDarkMode = usePreferencesStore(state => state.setDarkMode);

  return (
    <ControlField label="Mode">
      <div className="glass-control flex h-10 items-center rounded-lg px-3">
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        <span className="ml-3 text-sm text-muted-foreground">
          {darkMode ? "Dark" : "Light"}
        </span>
      </div>
    </ControlField>
  );
}
