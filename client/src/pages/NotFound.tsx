import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="dark flex min-h-screen w-full items-center justify-center bg-[linear-gradient(180deg,#08090d_0%,#101218_100%)] p-4 text-white">
      <Card className="mx-4 w-full max-w-lg border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/25 backdrop-blur">
        <CardContent className="px-6 pb-8 pt-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="grid size-16 place-items-center rounded-lg border border-red-400/20 bg-red-400/10">
              <AlertCircle className="h-8 w-8 text-red-300" />
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-bold text-white">404</h1>

          <h2 className="mb-4 text-xl font-semibold text-zinc-200">
            Page Not Found
          </h2>

          <p className="mb-8 leading-relaxed text-muted-foreground">
            Sorry, the page you are looking for doesn't exist.
            <br />
            It may have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleGoHome} className="px-6 py-2.5">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
