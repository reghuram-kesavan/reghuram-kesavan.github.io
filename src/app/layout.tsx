import type { Metadata } from "next";
import { Inter, Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SocialSidebar, StatusSidebar } from "@/components/Sidebars";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProtocolSwitcher } from "@/components/ProtocolSwitcher";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fira = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "reghuram.kesavan.portfolio // PORTFOLIO_ARCHIVE",
  description: "Senior Aerospace Engineer | TUM MSc candidate | ISAE-Supaero",
  metadataBase: new URL("https://reghuram-kesavan.github.io"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          fira.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased transition-colors duration-1000"
        )}
      >
        <LoadingScreen />
        <ProtocolSwitcher />

        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          {/* Advanced HUD Background */}
          <div className="fixed inset-0 z-[-1] grid-bg" />
          <div className="scan-bar" />
          <div className="fixed inset-0 z-[-2] carbon-mask" />

          <Navbar />
          <SocialSidebar />
          <StatusSidebar />

          <main className="flex-1 pt-32">{children}</main>

          {/* Global Texture Overlay */}
          <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.02] grayscale bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      </body>
    </html>
  );
}
