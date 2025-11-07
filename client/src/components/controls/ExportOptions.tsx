import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toPng, toSvg, toBlob } from "html-to-image";
import { Download, Share2, Copy, Link2, Image } from "lucide-react";
import { toast } from "react-hot-toast";
import { usePreferencesStore } from "@/stores/usePreferencesStore";
import { useHotkeys } from "react-hotkeys-hook";

interface ExportOptionsProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

export default function ExportOptions({ targetRef }: ExportOptionsProps) {
  const title = usePreferencesStore((state) => state.title);

  const copyImage = async () => {
    if (!targetRef.current) return;

    const loading = toast.loading("Copying image...");

    try {
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      });

      const img = new ClipboardItem({ "image/png": imgBlob as Blob });
      await navigator.clipboard.write([img]);

      toast.remove(loading);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      console.error("Copy error:", error);
      toast.remove(loading);
      toast.error("Failed to copy image");
    }
  };

  const copyLink = () => {
    try {
      const state = usePreferencesStore.getState();
      const encodedCode = btoa(state.code);

      const queryParams = new URLSearchParams({
        code: encodedCode,
        theme: state.theme,
        language: state.language,
        fontSize: state.fontSize.toString(),
        fontStyle: state.fontStyle,
        padding: state.padding.toString(),
        showBackground: state.showBackground.toString(),
        darkMode: state.darkMode.toString(),
        autoDetectLanguage: state.autoDetectLanguage.toString(),
        title: state.title,
      } as Record<string, string>).toString();

      const url = `${location.href.split("?")[0]}?${queryParams}`;
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      console.error("Copy link error:", error);
      toast.error("Failed to copy link");
    }
  };

  const saveImage = async (format: string) => {
    if (!targetRef.current) return;

    const loading = toast.loading(`Exporting ${format} image...`);

    try {
      let imgUrl: string;
      let filename: string;

      switch (format) {
        case "PNG":
          imgUrl = await toPng(targetRef.current, { pixelRatio: 2 });
          filename = `${title}.png`;
          break;
        case "SVG":
          imgUrl = await toSvg(targetRef.current, { pixelRatio: 2 });
          filename = `${title}.svg`;
          break;
        default:
          toast.remove(loading);
          return;
      }

      const a = document.createElement("a");
      a.href = imgUrl;
      a.download = filename;
      a.click();

      toast.remove(loading);
      toast.success("Exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.remove(loading);
      toast.error("Failed to export image");
    }
  };

  // Keyboard shortcuts
  useHotkeys("ctrl+c, cmd+c", (e) => {
    e.preventDefault();
    copyImage();
  });

  useHotkeys("shift+ctrl+c, shift+cmd+c", (e) => {
    e.preventDefault();
    copyLink();
  });

  useHotkeys("ctrl+s, cmd+s", (e) => {
    e.preventDefault();
    saveImage("PNG");
  });

  useHotkeys("shift+ctrl+s, shift+cmd+s", (e) => {
    e.preventDefault();
    saveImage("SVG");
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button">
          <Share2 className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={copyImage}>
          <Image className="w-4 h-4" />
          Copy Image
          <span className="ml-auto text-xs text-muted-foreground">⌘C</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2 cursor-pointer" onClick={copyLink}>
          <Link2 className="w-4 h-4" />
          Copy Link
          <span className="ml-auto text-xs text-muted-foreground">⇧⌘C</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => saveImage("PNG")}
        >
          <Download className="w-4 h-4" />
          Save as PNG
          <span className="ml-auto text-xs text-muted-foreground">⌘S</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-2 cursor-pointer"
          onClick={() => saveImage("SVG")}
        >
          <Download className="w-4 h-4" />
          Save as SVG
          <span className="ml-auto text-xs text-muted-foreground">⇧⌘S</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
