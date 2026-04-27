import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { fonts, codeSnippets } from "@/lib/options";
import { useEffect } from "react";
import Editor from "react-simple-code-editor";
import hljs from "highlight.js";
import flourite from "flourite";
import { cn } from "@/lib/utils";

export default function CodeEditor() {
  const code = usePreferencesStore(state => state.code);
  const setCode = usePreferencesStore(state => state.setCode);
  const title = usePreferencesStore(state => state.title);
  const setTitle = usePreferencesStore(state => state.setTitle);
  const language = usePreferencesStore(state => state.language);
  const setLanguage = usePreferencesStore(state => state.setLanguage);
  const autoDetectLanguage = usePreferencesStore(
    state => state.autoDetectLanguage
  );
  const fontSize = usePreferencesStore(state => state.fontSize);
  const fontStyle = usePreferencesStore(state => state.fontStyle);
  const darkMode = usePreferencesStore(state => state.darkMode);

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
      const validLanguage =
        language && language !== "auto" ? language : "plaintext";
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
        "overflow-hidden rounded-lg border shadow-2xl transition-all duration-300",
        darkMode
          ? "border-white/10 bg-zinc-950/82 shadow-black/45"
          : "border-white/45 bg-white/88 shadow-slate-900/15"
      )}
    >
      <header
        className={cn(
          "grid grid-cols-6 items-center gap-3 border-b px-4 py-3",
          darkMode ? "border-white/10" : "border-slate-900/10"
        )}
      >
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-rose-500 shadow-sm"></div>
          <div className="h-3 w-3 rounded-full bg-amber-400 shadow-sm"></div>
          <div className="h-3 w-3 rounded-full bg-emerald-400 shadow-sm"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            aria-label="Snippet title"
            type="text"
            value={title || ""}
            onChange={e => setTitle(e.target.value)}
            spellCheck={false}
            onClick={e => {
              if (e.target instanceof HTMLInputElement) {
                e.target.select();
              }
            }}
            className={cn(
              "w-full rounded-md bg-transparent px-2 py-1 text-center text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
              darkMode
                ? "text-zinc-300 placeholder:text-zinc-600"
                : "text-slate-600 placeholder:text-slate-400"
            )}
          />
        </div>
      </header>
      <div
        className={cn(
          "px-4 pb-4 pt-4",
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
            fontFamily:
              fonts[fontStyle as keyof typeof fonts]?.name || "monospace",
            fontSize: `${fontSize}px`,
            backgroundColor: "transparent",
            minHeight: "200px",
            lineHeight: 1.55,
          }}
          textareaClassName="focus:outline-none focus:ring-0"
          onClick={e => {
            if (e.target instanceof HTMLTextAreaElement) {
              e.target.select();
            }
          }}
        />
      </div>
    </div>
  );
}
