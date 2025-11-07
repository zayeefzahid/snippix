import { create } from "zustand";

interface PreferencesState {
  code: string;
  title: string;
  theme: string;
  darkMode: boolean;
  showBackground: boolean;
  language: string;
  autoDetectLanguage: boolean;
  fontSize: number;
  fontStyle: string;
  padding: number;
  setCode: (code: string) => void;
  setTitle: (title: string) => void;
  setTheme: (theme: string) => void;
  setDarkMode: (darkMode: boolean) => void;
  setShowBackground: (showBackground: boolean) => void;
  setLanguage: (language: string) => void;
  setAutoDetectLanguage: (autoDetectLanguage: boolean) => void;
  setFontSize: (fontSize: number) => void;
  setFontStyle: (fontStyle: string) => void;
  setPadding: (padding: number) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  code: "// Welcome to Snippix!\n// Create beautiful code screenshots\n\nfunction greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet(\"World\");",
  title: "Untitled",
  theme: "hyper",
  darkMode: true,
  showBackground: true,
  language: "auto",
  autoDetectLanguage: true,
  fontSize: 18,
  fontStyle: "jetbrains-mono",
  padding: 64,
  setCode: (code) => set({ code }),
  setTitle: (title) => set({ title }),
  setTheme: (theme) => set({ theme }),
  setDarkMode: (darkMode) => set({ darkMode }),
  setShowBackground: (showBackground) => set({ showBackground }),
  setLanguage: (language) => set({ language }),
  setAutoDetectLanguage: (autoDetectLanguage) => set({ autoDetectLanguage }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFontStyle: (fontStyle) => set({ fontStyle }),
  setPadding: (padding) => set({ padding }),
}));
