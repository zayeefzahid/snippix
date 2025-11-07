import { Switch } from "@/components/ui/switch";
import { usePreferencesStore } from "@/stores/usePreferencesStore";

export default function BackgroundSwitch() {
  const showBackground = usePreferencesStore((state) => state.showBackground);
  const setShowBackground = usePreferencesStore(
    (state) => state.setShowBackground
  );

  return (
    <div>
      <label className="block mb-2 text-xs font-medium">Background</label>
      <Switch checked={showBackground} onCheckedChange={setShowBackground} />
    </div>
  );
}
