"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ja";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Preloader
    "preloader.wait": "Wait Bro",
    "preloader.loading": "Loading Experience",
    
    // Navigation
    "nav.home": "Home",
    "nav.works": "Works",
    "nav.tech": "Tech Stacks",
    "nav.contact": "Contact",
    
    // Home
    "home.name": "aMeeN abdUllah",
    "home.subtitle": "Where Front-End Gets Real.",
    "home.description": "The 1% of Population who actually makes cRazY WebGL eXpeRieNceS.",
    "home.scroll": "Scroll to explore",
    "home.cinematic1": "Building immersive digital experiences",
    "home.cinematic2": "One shader at a time",
    "home.cinematic3": "Where code meets art",
    
    // Works
    "works.title": "Featured wOrks.",
    "works.subtitle": "Some things I&apos;ve built that didn&apos;t break production.",
    "works.cosmos": "Cosmos clone",
    "works.rejouice": "Rejouice clone",
    "works.trionn": "Trionn clone",
    "works.twogood": "TwoGood Co clone",
    "works.hover1": "+70 style points",
    "works.hover2": "+69 Rizz points",
    "works.hover3": "Watchu doin tonight baby gurl",
    "works.hover4": "This one hits different",
    
    // Tech
    "tech.title": "Tech Stacks",
    "tech.subtitle": "The weapons of choice",
    "tech.webgl": "WebGL",
    "tech.gsap": "GSAP",
    "tech.shaders": "Shaders",
    "tech.threejs": "THREE.js",
    "tech.why": "Why plain JavaScript doesn&apos;t cut it:",
    "tech.reason1": "Because document.createElement(&apos;div&apos;) doesn&apos;t make things spin in 3D space.",
    "tech.reason2": "Because setTimeout isn&apos;t smooth enough for 60fps buttery animations.",
    "tech.reason3": "Because CSS transforms can&apos;t bend reality like vertex shaders do.",
    
    // Contact
    "contact.title": "LET&apos;S TALK",
    "contact.subtitle": "ABOUT THE NEXT BIG THING.",
    "contact.available": "Currently available for freelance",
    "contact.email": "hello@ameen.dev",
  },
  ja: {
    // Preloader
    "preloader.wait": "ちょっと待って",
    "preloader.loading": "体験を読み込み中",
    
    // Navigation
    "nav.home": "ホーム",
    "nav.works": "作品",
    "nav.tech": "技術スタック",
    "nav.contact": "連絡先",
    
    // Home
    "home.name": "aMeeN abdUllah",
    "home.subtitle": "フロントエンドが本気になる場所。",
    "home.description": "実際にクレイジーなWebGL体験を作る人口の1%。",
    "home.scroll": "スクロールして探索",
    "home.cinematic1": "没入型デジタル体験を構築",
    "home.cinematic2": "一つずつシェーダーで",
    "home.cinematic3": "コードとアートが出会う場所",
    
    // Works
    "works.title": "注目の作品。",
    "works.subtitle": "本番環境を壊さなかったもの。",
    "works.cosmos": "Cosmos クローン",
    "works.rejouice": "Rejouice クローン",
    "works.trionn": "Trionn クローン",
    "works.twogood": "TwoGood Co クローン",
    "works.hover1": "+70 スタイルポイント",
    "works.hover2": "+69 リズポイント",
    "works.hover3": "今夜何してる？",
    "works.hover4": "これは違う",
    
    // Tech
    "tech.title": "技術スタック",
    "tech.subtitle": "選ばれし武器",
    "tech.webgl": "WebGL",
    "tech.gsap": "GSAP",
    "tech.shaders": "シェーダー",
    "tech.threejs": "THREE.js",
    "tech.why": "なぜプレーンなJavaScriptでは不十分なのか：",
    "tech.reason1": "document.createElement('div')では3D空間で回転させられないから。",
    "tech.reason2": "setTimeoutは60fpsのスムーズなアニメーションには不十分だから。",
    "tech.reason3": "CSS変換では頂点シェーダーのように現実を曲げられないから。",
    
    // Contact
    "contact.title": "話しましょう",
    "contact.subtitle": "次の大きなことについて。",
    "contact.available": "現在フリーランス可能",
    "contact.email": "hello@ameen.dev",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
