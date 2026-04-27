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
import {
  ArrowDown,
  BatteryMedium,
  Command,
  Github,
  Sparkles,
  Wand2,
  Wifi,
  Zap,
} from "lucide-react";
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
    <main className="desktop-wallpaper dark relative min-h-screen overflow-x-hidden text-white">
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

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/18 backdrop-blur-2xl">
        <nav
          className="container flex h-12 min-w-0 items-center justify-between gap-3"
          aria-label="Primary navigation"
        >
          <a href="/" className="flex min-w-0 items-center gap-3">
            <span className="glass-control grid size-8 place-items-center rounded-lg">
              <Sparkles className="size-4 text-cyan-300" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold tracking-tight">
                Snippix
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                Glass Studio
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-4 text-xs font-medium text-zinc-300 md:flex">
            <span>File</span>
            <span>Edit</span>
            <span>Export</span>
            <span>Window</span>
          </div>

          <div className="flex shrink-0 items-center gap-2 text-muted-foreground">
            <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.055] px-2.5 py-1 text-xs backdrop-blur-xl sm:flex">
              <Wifi className="size-3.5" aria-hidden="true" />
              <BatteryMedium className="size-3.5" aria-hidden="true" />
              <span>Ready</span>
            </div>
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
                href="https://github.com/zayeefzahid/snippix"
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

      <section className="container relative z-10 grid min-h-[calc(100vh-3rem)] min-w-0 items-center gap-8 py-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-12">
        <div className="min-w-0 max-w-[22rem] sm:max-w-2xl">
          <div className="glass-control mb-5 inline-flex w-full max-w-[22rem] items-start gap-2 rounded-lg px-3 py-1.5 text-sm leading-6 text-zinc-200 sm:w-auto sm:max-w-full">
            <Zap
              className="mt-1 size-4 shrink-0 text-amber-300"
              aria-hidden="true"
            />
            <span>Native-feeling captures for snippets worth sharing</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-[0_1px_22px_rgb(255_255_255_/_0.12)] sm:text-5xl lg:text-6xl">
            Snippix
          </h1>
          <p className="mt-5 max-w-[22rem] text-base leading-7 text-zinc-200/86 sm:max-w-xl sm:text-lg">
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
            <div className="glass-control rounded-lg p-3">
              <dt className="text-muted-foreground">Themes</dt>
              <dd className="mt-1 font-semibold text-white">10 presets</dd>
            </div>
            <div className="glass-control rounded-lg p-3">
              <dt className="text-muted-foreground">Formats</dt>
              <dd className="mt-1 font-semibold text-white">PNG + SVG</dd>
            </div>
            <div className="glass-control rounded-lg p-3">
              <dt className="text-muted-foreground">Sharing</dt>
              <dd className="mt-1 font-semibold text-white">Copy link</dd>
            </div>
          </dl>
        </div>

        <section
          id="composer"
          aria-label="Snippet composer preview"
          className="glass-panel w-full min-w-0 max-w-[22rem] rounded-lg p-3 sm:max-w-full sm:p-4"
        >
          <div className="mb-3 flex flex-col gap-3 border-b border-white/12 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_14px_rgb(255_95_87_/_0.45)]" />
                <span className="size-3 rounded-full bg-[#ffbd2e] shadow-[0_0_14px_rgb(255_189_46_/_0.35)]" />
                <span className="size-3 rounded-full bg-[#28c840] shadow-[0_0_14px_rgb(40_200_64_/_0.35)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Capture Studio</p>
                <p className="text-xs text-muted-foreground">
                  Drag the left or right edge to resize the export.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="glass-control rounded-md px-2 py-1">
                <Command className="mr-1 inline size-3" aria-hidden="true" />
                PNG
              </span>
              <span className="glass-control rounded-md px-2 py-1">
                Auto language
              </span>
            </div>
          </div>

          <div className="mb-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="glass-control rounded-lg px-3 py-2">
              <span className="block text-white">Material</span>
              <span>Glass</span>
            </div>
            <div className="glass-control rounded-lg px-3 py-2">
              <span className="block text-white">Canvas</span>
              <span>Retina 2x</span>
            </div>
            <div className="glass-control rounded-lg px-3 py-2">
              <span className="block text-white">Share</span>
              <span>Linkable</span>
            </div>
          </div>

          <div className="flex min-h-[420px] w-full items-center justify-start overflow-auto rounded-lg border border-white/12 bg-[linear-gradient(145deg,rgb(255_255_255_/_0.075),rgb(255_255_255_/_0.025)_36%,rgb(0_0_0_/_0.12))] p-3 shadow-inner shadow-black/25 backdrop-blur-xl sm:justify-center sm:p-5">
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
        className="relative z-10 border-y border-white/10 bg-black/10 py-6 backdrop-blur-xl"
      >
        <div className="container">
          <Card className="glass-panel rounded-lg py-0">
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

      <footer className="container relative z-10 flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Made by{" "}
          <a
            href="https://zayeef.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md text-cyan-200 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            Zayeef Zahid
          </a>
          .
        </p>
        <a
          href="https://github.com/zayeefzahid/snippix"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit rounded-md text-cyan-200 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        >
          View GitHub repo
        </a>
      </footer>
    </main>
  );
}
