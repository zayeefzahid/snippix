import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="premium-backdrop dark flex min-h-screen items-center justify-center p-6 text-white">
          <div className="flex w-full max-w-2xl flex-col items-center rounded-lg border border-white/10 bg-[#111722] p-6 text-center shadow-2xl shadow-black/25 sm:p-8">
            <div className="mb-6 grid size-14 place-items-center rounded-lg border border-destructive/25 bg-destructive/10">
              <AlertTriangle
                size={30}
                className="flex-shrink-0 text-destructive"
              />
            </div>

            <h2 className="mb-4 text-xl font-semibold">
              An unexpected error occurred.
            </h2>

            <div className="mb-6 max-h-72 w-full overflow-auto rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left">
              <pre className="whitespace-break-spaces text-sm text-muted-foreground">
                {this.state.error?.stack}
              </pre>
            </div>

            <Button onClick={() => window.location.reload()}>
              <RotateCcw size={16} />
              Reload Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
