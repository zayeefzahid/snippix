import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { languages } from "@/lib/options";

export default function LanguageSelect() {
  const language = usePreferencesStore((state) => state.language);
  const setLanguage = usePreferencesStore((state) => state.setLanguage);
  const setAutoDetectLanguage = usePreferencesStore(
    (state) => state.setAutoDetectLanguage
  );

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setAutoDetectLanguage(value === "auto");
  };

  return (
    <div>
      <label className="block mb-2 text-xs font-medium">Language</label>
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Auto Detect</SelectItem>
          {Object.entries(languages).map(([key, name]) => (
            <SelectItem key={key} value={key}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
