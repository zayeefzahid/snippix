import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { fonts, codeSnippets } from "@/lib/options";
import { useEffect } from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import flourite from "flourite";
import { cn } from "@/lib/utils";

export default function CodeEditor() {
  const code = usePreferencesStore((state) => state.code);
  const setCode = usePreferencesStore((state) => state.setCode);
  const title = usePreferencesStore((state) => state.title);
  const setTitle = usePreferencesStore((state) => state.setTitle);
  const language = usePreferencesStore((state) => state.language);
  const setLanguage = usePreferencesStore((state) => state.setLanguage);
  const autoDetectLanguage = usePreferencesStore(
    (state) => state.autoDetectLanguage
  );
  const fontSize = usePreferencesStore((state) => state.fontSize);
  const fontStyle = usePreferencesStore((state) => state.fontStyle);
  const darkMode = usePreferencesStore((state) => state.darkMode);

  // Load random code snippet on mount
  useEffect(() => {
    const randomSnippet =
      codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    usePreferencesStore.setState({
      code: randomSnippet.code,
      title: randomSnippet.title,
      language: randomSnippet.language,
    });
  }, []);

  // Auto detect language
  useEffect(() => {
    if (autoDetectLanguage) {
      const { language: detectedLang } = flourite(code, { noUnknown: true });
      if (detectedLang) {
        setLanguage(detectedLang.toLowerCase() || "plaintext");
      }
    }
  }, [code, autoDetectLanguage, setLanguage]);

  const highlightCode = (code: string) => {
    if (!code) return code;
    
    try {
      // Ensure we always have a valid language
      const validLanguage = language && language !== "auto" ? language : "plaintext";
      const result = hljs.highlight(code, { language: validLanguage });
      return result.value;
    } catch (error) {
      // Fallback to auto-detection if specific language fails
      try {
        return hljs.highlightAuto(code).value;
      } catch (e) {
        // Last resort: return plain code
        return code;
      }
    }
  };

  return (
    <div
      className={cn(
        "border-2 rounded-xl shadow-2xl",
        darkMode
          ? "bg-black/75 border-gray-600/40"
          : "bg-white/75 border-gray-200/20"
      )}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500"></div>
          <div className="rounded-full h-3 w-3 bg-yellow-500"></div>
          <div className="rounded-full h-3 w-3 bg-green-500"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            spellCheck={false}
            onClick={(e) => {
              if (e.target instanceof HTMLInputElement) {
                e.target.select();
              }
            }}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none w-full"
          />
        </div>
      </header>
      <div
        className={cn(
          "px-4 pb-4",
          darkMode
            ? "brightness-110"
            : "text-gray-800 brightness-50 saturate-200 contrast-200"
        )}
      >
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={highlightCode}
          style={{
            fontFamily: fonts[fontStyle as keyof typeof fonts]?.name || "monospace",
            fontSize: `${fontSize}px`,
            backgroundColor: "transparent",
            minHeight: "200px",
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => {
            if (e.target instanceof HTMLTextAreaElement) {
              e.target.select();
            }
          }}
        />
      </div>
    </div>
  );
}
