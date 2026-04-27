import { useEffect, useRef, useState } from "react";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { fonts, themes } from "@/lib/options";
import { cn } from "@/lib/utils";
import CodeEditor from "@/components/CodeEditor";
import WidthMeasurement from "@/components/WidthMeasurement";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Resizable } from "re-resizable";
import ThemeSelect from "@/components/controls/ThemeSelect";
import LanguageSelect from "@/components/controls/LanguageSelect";
import { ResetIcon } from "@radix-ui/react-icons";
import { ArrowDown, Github, Sparkles, Wand2, Zap } from "lucide-react";
import FontSelect from "@/components/controls/FontSelect";
import FontSizeInput from "@/components/controls/FontSizeInput";
import PaddingSlider from "@/components/controls/PaddingSlider";
import BackgroundSwitch from "@/components/controls/BackgroundSwitch";
import DarkModeSwitch from "@/components/controls/DarkModeSwitch";
import ExportOptions from "@/components/controls/ExportOptions";

export default function Home() {
  const [width, setWidth] = useState("auto");
  const [showWidth, setShowWidth] = useState(false);

  const theme = usePreferencesStore(state => state.theme);
  const padding = usePreferencesStore(state => state.padding);
  const fontStyle = usePreferencesStore(state => state.fontStyle);
  const showBackground = usePreferencesStore(state => state.showBackground);

  const editorRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.size === 0) return;
    const state = Object.fromEntries(queryParams);

    usePreferencesStore.setState({
      code: state.code ? atob(state.code) : undefined,
      title: state.title || undefined,
      theme: state.theme || undefined,
      language: state.language || undefined,
      fontStyle: state.fontStyle || undefined,
      autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode: state.darkMode === "true",
      showBackground: state.showBackground === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    });
  }, []);

  return (
    <main className="dark min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#08090d_0%,#101218_48%,#0b0d11_100%)] text-white">
      <link
        rel="stylesheet"
        href={themes[theme as keyof typeof themes]?.theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle as keyof typeof fonts]?.src}
        crossOrigin="anonymous"
      />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/75 backdrop-blur-xl">
        <nav
          className="container flex h-16 min-w-0 items-center justify-between gap-3"
          aria-label="Primary navigation"
        >
          <a href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.06] shadow-lg shadow-black/20">
              <Sparkles className="size-4 text-cyan-300" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-semibold tracking-tight">
                Snippix
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                Code shots in seconds
              </span>
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              asChild
            >
              <a href="#composer">Editor</a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://github.com/zayeefzahid"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
          </div>
        </nav>
      </header>

      <section className="container grid min-h-[calc(100vh-4rem)] min-w-0 items-center gap-8 py-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-12">
        <div className="min-w-0 max-w-[22rem] sm:max-w-2xl">
          <div className="mb-5 inline-flex w-full max-w-[22rem] items-start gap-2 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm leading-6 text-zinc-300 sm:w-auto sm:max-w-full">
            <Zap
              className="mt-1 size-4 shrink-0 text-amber-300"
              aria-hidden="true"
            />
            <span>Export polished code images without leaving the page</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Snippix
          </h1>
          <p className="mt-5 max-w-[22rem] text-base leading-7 text-zinc-300 sm:max-w-xl sm:text-lg">
            Turn snippets into sharp, shareable visuals with editable titles,
            themes, typography, padding, and one-click exports.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#composer">
                Start composing
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#controls">
                <Wand2 className="size-4" aria-hidden="true" />
                Customize style
              </a>
            </Button>
          </div>
          <dl className="mt-8 grid max-w-[22rem] grid-cols-1 gap-3 text-sm sm:max-w-xl sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <dt className="text-muted-foreground">Themes</dt>
              <dd className="mt-1 font-semibold text-white">10 presets</dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <dt className="text-muted-foreground">Formats</dt>
              <dd className="mt-1 font-semibold text-white">PNG + SVG</dd>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
              <dt className="text-muted-foreground">Sharing</dt>
              <dd className="mt-1 font-semibold text-white">Copy link</dd>
            </div>
          </dl>
        </div>

        <section
          id="composer"
          aria-label="Snippet composer preview"
          className="w-full min-w-0 max-w-[22rem] rounded-lg border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/30 backdrop-blur sm:max-w-full sm:p-4"
        >
          <div className="mb-3 flex flex-col gap-3 border-b border-white/10 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-white">Live preview</p>
              <p className="text-xs text-muted-foreground">
                Drag the left or right edge to resize the export.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-md border border-white/10 px-2 py-1">
                2x export
              </span>
              <span className="rounded-md border border-white/10 px-2 py-1">
                Auto language
              </span>
            </div>
          </div>

          <div className="flex min-h-[420px] w-full items-center justify-start overflow-auto rounded-lg border border-white/10 bg-zinc-950/70 p-3 sm:justify-center sm:p-5">
            <Resizable
              className="max-w-full"
              enable={{ left: true, right: true }}
              minWidth={padding * 2 + 300}
              size={{ width }}
              onResize={(e, dir, ref) => setWidth(ref.offsetWidth.toString())}
              onResizeStart={() => setShowWidth(true)}
              onResizeStop={() => setShowWidth(false)}
            >
              <div
                className={cn(
                  "mb-2 overflow-hidden rounded-lg transition-all duration-300 ease-out",
                  showBackground
                    ? themes[theme as keyof typeof themes]?.background
                    : "border border-white/10 bg-zinc-900"
                )}
                style={{ padding }}
                ref={editorRef}
              >
                <CodeEditor />
              </div>
              <WidthMeasurement showWidth={showWidth} width={Number(width)} />
              <div
                className={cn(
                  "mx-auto -mt-4 w-fit transition-opacity",
                  showWidth || width === "auto"
                    ? "invisible hidden opacity-0"
                    : "visible opacity-100"
                )}
              >
                <Button
                  size="sm"
                  onClick={() => setWidth("auto")}
                  variant="ghost"
                >
                  <ResetIcon className="mr-2" />
                  Reset width
                </Button>
              </div>
            </Resizable>
          </div>
        </section>
      </section>

      <section
        id="controls"
        className="border-y border-white/10 bg-black/20 py-6"
      >
        <div className="container">
          <Card className="border-white/10 bg-zinc-950/75 shadow-2xl shadow-black/20 backdrop-blur">
            <CardContent className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_auto_auto] xl:grid-cols-[repeat(7,max-content)] xl:items-end">
              <ThemeSelect />
              <LanguageSelect />
              <FontSelect />
              <FontSizeInput />
              <PaddingSlider />
              <BackgroundSwitch />
              <DarkModeSwitch />
              <div className="sm:col-span-2 lg:col-span-1 xl:col-span-1">
                <ExportOptions
                  targetRef={
                    editorRef as unknown as React.RefObject<HTMLDivElement>
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="container flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Made by Zayeef Zahid.</p>
        <a
          href="https://github.com/zayeefzahid"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit rounded-md text-cyan-300 underline-offset-4 transition-colors hover:text-cyan-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        >
          View more work
        </a>
      </footer>
    </main>
  );
}
