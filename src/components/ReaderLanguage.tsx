"use client";
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
type Language = "en" | "fr" | "de";
const LanguageContext = createContext<{
  language: Language;
  setLanguage: (value: Language) => void;
}>({ language: "en", setLanguage: () => {} });
let memory: Language = "en";
function subscribe(fn: () => void) {
  window.addEventListener("reader-language", fn);
  window.addEventListener("storage", fn);
  return () => {
    window.removeEventListener("reader-language", fn);
    window.removeEventListener("storage", fn);
  };
}
function snapshot(): Language {
  try {
    const v = localStorage.getItem("reader-language");
    return v === "fr" || v === "de" ? v : "en";
  } catch {
    return memory;
  }
}
export function ReaderLanguage({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "en" as Language,
  );
  function setLanguage(v: Language) {
    memory = v;
    try {
      localStorage.setItem("reader-language", v);
    } catch {}
    window.dispatchEvent(new Event("reader-language"));
  }
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
const words: Record<string, [string, string]> = {
  Projects: ["Projets", "Projekte"],
  Experience: ["Expérience", "Erfahrung"],
  Profile: ["Profil", "Profil"],
  Contact: ["Contact", "Kontakt"],
  "View CV": ["Voir le CV", "Lebenslauf"],
  "Full profile": ["Profil complet", "Vollständiges Profil"],
  "Explore engineering": ["Explorer les projets", "Projekte entdecken"],
  "Enter my world": ["Découvrir mon travail", "Meine Arbeit entdecken"],
  "Explore all projects": ["Tous les projets", "Alle Projekte"],
  "AERODYNAMICS & PROPULSION": [
    "AÉRODYNAMIQUE ET PROPULSION",
    "AERODYNAMIK UND ANTRIEB",
  ],
  "ENGINEERING PORTFOLIO": ["PORTFOLIO D’INGÉNIERIE", "INGENIEURPORTFOLIO"],
  "ONE PERSON. MULTIPLE WORLDS.": [
    "UNE PERSONNE. PLUSIEURS HORIZONS.",
    "EIN MENSCH. VIELE PERSPEKTIVEN.",
  ],
  "AEROSPACE ENGINEERING. A DIFFERENT PERSPECTIVE.": [
    "INGÉNIERIE AÉROSPATIALE. UN AUTRE REGARD.",
    "LUFT- UND RAUMFAHRT. EIN ANDERER BLICKWINKEL.",
  ],
  Personal: ["Personnel", "Persönlich"],
  Professional: ["Professionnel", "Beruflich"],
  "Selected engineering": ["Projets sélectionnés", "Ausgewählte Projekte"],
  "Geometry explorer": ["Géométrie interactive", "Interaktive Geometrie"],
};
export function useReaderLanguage() {
  const ctx = useContext(LanguageContext);
  return {
    ...ctx,
    t: (text: string) =>
      ctx.language === "en"
        ? text
        : (words[text]?.[ctx.language === "fr" ? 0 : 1] ?? text),
  };
}
export function LanguagePicker() {
  const { language, setLanguage } = useReaderLanguage();
  return (
    <label className="reader-language">
      <span aria-hidden="true">◎</span>
      <select
        aria-label="Portfolio reader language"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
      </select>
    </label>
  );
}
const intros = {
  en: "Aerospace engineer with a mechanical engineering foundation. My work connects aerodynamics, propulsion, scientific computing and aerospace test hardware — through research at ISAE-SUPAERO, graduate studies at TUM and industry experience at Lilium.",
  fr: "Ingénieur en aérospatiale de formation mécanique. Mon travail relie aérodynamique, propulsion, calcul scientifique et essais de structures : recherche à l’ISAE-SUPAERO, études supérieures à la TUM et expérience industrielle chez Lilium.",
  de: "Luft- und Raumfahrtingenieur mit einem Hintergrund im Maschinenbau. Meine Arbeit verbindet Aerodynamik, Antrieb, wissenschaftliches Rechnen und Strukturversuche — durch Forschung an der ISAE-SUPAERO, weiterführende Studien an der TUM und Industrieerfahrung bei Lilium.",
};
export function ReaderIntro() {
  const { language } = useReaderLanguage();
  return (
    <p className="reader-intro" lang={language}>
      {intros[language]}
    </p>
  );
}
export function LanguageNote() {
  const { language } = useReaderLanguage();
  return (
    <p className="language-note">
      {language === "fr"
        ? "Navigation, présentation et résumés des projets en français. Les dossiers techniques et le CV restent en anglais. Ces traductions ne constituent pas une déclaration de maîtrise de la langue."
        : language === "de"
          ? "Navigation, Profilvorstellung und Projektzusammenfassungen auf Deutsch. Technische Unterlagen und Lebenslauf bleiben auf Englisch. Die Übersetzung ist keine Aussage über meine Sprachkenntnisse."
          : "Choose a reader language for navigation, introduction and project summaries. Detailed technical records and the CV remain in English. Language proficiency is listed separately."}
    </p>
  );
}
