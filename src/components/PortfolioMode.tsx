"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { Zap, Rocket } from "lucide-react";

type Mode = "personal" | "professional";
const ModeContext = createContext<{
  mode: Mode;
  setMode: (mode: Mode) => void;
}>({ mode: "personal", setMode: () => {} });

function subscribe(callback: () => void) {
  window.addEventListener("portfolio-mode", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("portfolio-mode", callback);
    window.removeEventListener("storage", callback);
  };
}

function snapshot(): Mode {
  try {
    return localStorage.getItem("portfolio-mode") === "professional"
      ? "professional"
      : "personal";
  } catch {
    return "personal";
  }
}

export function PortfolioMode({ children }: { children: React.ReactNode }) {
  const stored = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "personal" as Mode,
  );
  const [fallback, setFallback] = useState<Mode | null>(null);
  const mode = fallback ?? stored;
  const router = useRouter();
  const path = usePathname();

  function setMode(next: Mode) {
    try {
      localStorage.setItem("portfolio-mode", next);
      window.dispatchEvent(new Event("portfolio-mode"));
    } catch {
      setFallback(next);
    }
    if (next === "professional" && path === "/awards") router.push("/about");
  }

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <div data-mode={mode} className="mode-root">
        {children}
      </div>
    </ModeContext.Provider>
  );
}

export function usePortfolioMode() {
  return useContext(ModeContext);
}

export function ModeSwitch() {
  const { mode, setMode } = usePortfolioMode();
  return (
    <div
      className="mode-switch-segmented"
      role="radiogroup"
      aria-label="Portfolio protocol selector"
    >
      <button
        role="radio"
        aria-checked={mode === "personal"}
        className={`seg-btn ${mode === "personal" ? "active-personal" : ""}`}
        onClick={() => setMode("personal")}
        title="Personal portfolio"
      >
        <Zap size={14} className="seg-icon" />
        <span>Personal</span>
      </button>
      <button
        role="radio"
        aria-checked={mode === "professional"}
        className={`seg-btn ${mode === "professional" ? "active-aero" : ""}`}
        onClick={() => setMode("professional")}
        title="Professional portfolio"
      >
        <Rocket size={14} className="seg-icon" />
        <span>Professional</span>
      </button>
    </div>
  );
}
