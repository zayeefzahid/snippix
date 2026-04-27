import { Switch } from "@/components/ui/switch";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import ControlField from "./ControlField";

export default function BackgroundSwitch() {
  const showBackground = usePreferencesStore(state => state.showBackground);
  const setShowBackground = usePreferencesStore(
    state => state.setShowBackground
  );

  return (
    <ControlField label="Background">
      <div className="flex h-10 items-center rounded-lg border border-white/10 bg-white/[0.03] px-3">
        <Switch checked={showBackground} onCheckedChange={setShowBackground} />
        <span className="ml-3 text-sm text-muted-foreground">
          {showBackground ? "Visible" : "Off"}
        </span>
      </div>
    </ControlField>
  );
}
