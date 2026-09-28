import type { Metadata } from "next";
import { Inter, Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { ReaderLanguage } from "@/components/ReaderLanguage";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { PortfolioMode } from "@/components/PortfolioMode";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fira = Fira_Code({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default:
      "Reghuram Kesavan — Aerospace Engineer & Multidisciplinary Creator",
    template: "%s | Reghuram Kesavan",
  },
  description:
    "Aircraft aerodynamics, turbomachinery, RANS CFD, competitive gaming reflex, and urban choreography. Explore Reghuram Kesavan's dual-mode research and personal portfolio.",
  metadataBase: new URL("https://reghuram-kesavan.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${fira.variable}`}>
        <ReaderLanguage>
          <PortfolioMode>
            <a className="skip-link" href="#main">
              Skip to content
            </a>
            <Navbar />
            <main id="main">{children}</main>

            <footer className="site-footer">
              <Link href="/" className="brand-mark">
                rk<span>.</span>
              </Link>
              <p>Engineering with curiosity. Creating with intent.</p>
              <div>
                <Link href="/skills">Capabilities</Link>
                <Link href="/mission-prep">Project matcher</Link>
                <Link href="/contact">Contact</Link>
                <a href="/resume.pdf">CV ↗</a>
              </div>
              <small>Reghuram Kesavan · Toulouse, France</small>
            </footer>
          </PortfolioMode>
        </ReaderLanguage>
      </body>
    </html>
  );
}
