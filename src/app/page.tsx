"use client";

import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useContext,
  createContext,
  useCallback,
  type CSSProperties,
} from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  MessageCircle,
  Instagram,
  ArrowRight,
  Send,
  X,
  ShoppingBag,
  Star,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   DATA — Products & Brand
   ═══════════════════════════════════════════════════════════════ */

const products = [
  {
    name: "Oramande",
    image: "/images/products/oramande.jpeg",
    description: "Datte enrobée de chocolat noir, zeste d'orange confit.",
  },
  {
    name: "Kunafa Pistache",
    image: "/images/products/kunafa-pistache.jpeg",
    description: "Cheveux d'ange dorés et croustillants, cœur de pistache.",
  },
  {
    name: "Pistachio",
    image: "/images/products/pistachio.jpeg",
    description: "Datte garnie de pistaches concassées, fraîches et parfumées.",
  },
  {
    name: "Perle d'Amande",
    image: "/images/products/perle-amande.jpeg",
    description: "Amandes entières dorées à la feuille d'or comestible.",
  },
  {
    name: "Noisetta Croquante",
    image: "/images/products/noisetta.jpeg",
    description: "Praliné noisette enrobé de chocolat et éclats croquants.",
  },
  {
    name: "Framboisia",
    image: "/images/products/framboisia.jpeg",
    description: "Coque de chocolat noir, pétales de framboise.",
  },
  {
    name: "Perle de Coco",
    image: "/images/products/perle-coco.jpeg",
    description: "Datte moelleuse couronnée d'un voile de noix de coco.",
  },
  {
    name: "Rose d'Amande",
    image: "/images/products/rose-amande.jpeg",
    description: "Pâte d'amande délicate, parsemée de pétales de rose.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   TRANSLATIONS — Multilingual System (EN / FR / AR)
   ═══════════════════════════════════════════════════════════════ */

type Lang = "en" | "fr" | "ar";

const translations = {
  en: {
    // Navigation
    nav_collection: "Collection",
    nav_bespoke: "Bespoke",
    nav_ourWorld: "Our World",
    nav_order: "Order",
    nav_orderNow: "Order Now",

    // Hero
    hero_brandName: "Palma d'Or",
    hero_subtitle: "The Jewel of Marrakech",
    hero_tagline1: "Artisanal luxury dates, handcrafted in",
    hero_tagline2: "Marrakech for your most sacred moments.",
    hero_cta: "Discover the Collection",

    // Marquee
    marquee: "PALMA D'OR   MARRAKECH   CRAFTED IN LIMITED BATCHES   SUN-RIPENED PERFECTION   RESERVED FOR THE EXTRAORDINARY",

    // Brand Soul
    brandSoul_tag: "Brand Soul",
    brandSoul_heading1: "Born from the Palms.",
    brandSoul_heading2: "Crafted for the Sacred.",
    brandSoul_body: "Each date is a love letter written in gold — velvety, sun-ripened, hand-finished. Reserved for moments that outlive the ordinary.",
    brandSoul_pillar1: "Velvety. Sun-ripened. Hand-finished.",
    brandSoul_pillar2: "Crafted in limited batches for the extraordinary.",
    brandSoul_pillar3: "Reserved for your most sacred moments.",

    // Collection
    collection_tag: "The Collection",
    collection_heading: "Crafted Like Fine Jewelry",
    collection_desc: "Each date is a masterpiece — hand-selected, hand-filled, and presented with the precision of a couture atelier.",
    collection_crafted: "Crafted",
    collection_discover: "Discover",

    // Featured Product
    featured_tag: "Signature Piece",
    featured_heading: "Oramande",
    featured_desc: "A caramelized Moroccan date cradling a silken roasted almond heart, balanced with delicate floral nuance. Velvety, sun-ripened, hand-finished — crafted in limited quantities for the discerning palate.",
    featured_quote: "A velvet embrace of roasted almond elegance.",
    featured_cta: "Order This Piece",

    // Video Break
    video_heading: "Where Texture Meets Elegance",

    // Customization
    custom_tag: "Bespoke Service",
    custom_heading: "Tailored for Your Occasion",
    custom_desc: "Every celebration deserves its own signature. We craft custom luxury date experiences as unique as your story.",
    custom_option1_title: "Wedding Luxury Boxes",
    custom_option1_desc: "Bespoke boxes crafted for your most sacred celebration. Gold foil monograms, custom color palettes, and hand-arranged selections.",
    custom_option2_title: "Ramadan Signature Editions",
    custom_option2_desc: "Exclusive Ramadan collections with ornate crescent motifs, rich emerald and gold packaging, and curated date selections.",
    custom_option3_title: "Bespoke Color & Packaging",
    custom_option3_desc: "From ivory and blush to deep onyx — your vision, our craftsmanship. Tailored themes for corporate gifting, celebrations, and milestones.",
    custom_cta: "Begin Your Bespoke Journey",

    // Instagram
    insta_tag: "Our World",
    insta_heading: "From Our World",
    insta_desc: "Step inside the world of Palma d'Or — where every detail is a celebration of artistry and tradition.",
    insta_cta: "Follow @palma.dor._",

    // Footer
    footer_brandName: "Palma d'Or",
    footer_subtitle: "The Jewel of Marrakech",
    footer_desc: "Handcrafted artisanal dates for Ramadan, weddings, and exclusive celebrations.",
    footer_quickLinks: "Quick Links",
    footer_stayInWorld: "Stay in Our World",
    footer_welcome: "Welcome to the world of Palma d'Or.",
    footer_emailPlaceholder: "Your email",
    footer_subscribe: "Subscribe",
    footer_instagram: "Instagram",
    footer_whatsapp: "WhatsApp",
    footer_copyright: (year: number) => `© ${year} Palma d'Or. All rights reserved.`,

    // Modal
    modal_reserve: "Reserve This Piece",

    // Cursor
    cursor_view: "View",

    // Product translations
    product_oramande_name: "Oramande",
    product_oramande_desc: "Dark chocolate-coated date, candied orange zest.",
    product_kunafa_name: "Kunafa Pistache",
    product_kunafa_desc: "Golden crispy angel hair, pistachio heart.",
    product_pistachio_name: "Pistachio",
    product_pistachio_desc: "Date topped with crushed fresh, fragrant pistachios.",
    product_perleAmande_name: "Perle d'Amande",
    product_perleAmande_desc: "Whole almonds gilded with edible gold leaf.",
    product_noisetta_name: "Noisetta Croquante",
    product_noisetta_desc: "Hazelnut praline coated in chocolate with crunchy bits.",
    product_framboisia_name: "Framboisia",
    product_framboisia_desc: "Dark chocolate shell, raspberry petals.",
    product_perleCoco_name: "Perle de Coco",
    product_perleCoco_desc: "Tender date crowned with a veil of coconut.",
    product_roseAmande_name: "Rose d'Amande",
    product_roseAmande_desc: "Delicate almond paste, sprinkled with rose petals.",
  },
  fr: {
    // Navigation
    nav_collection: "Collection",
    nav_bespoke: "Sur Mesure",
    nav_ourWorld: "Notre Univers",
    nav_order: "Commander",
    nav_orderNow: "Commander",

    // Hero
    hero_brandName: "Palma d'Or",
    hero_subtitle: "Le Joyau de Marrakech",
    hero_tagline1: "Des dattes d'exception, façonnées à la main",
    hero_tagline2: "à Marrakech pour vos instants les plus précieux.",
    hero_cta: "Découvrir la Collection",

    // Marquee
    marquee: "PALMA D'OR   MARRAKECH   FAÇONNÉES EN SÉRIES LIMITÉES   PERFECTION SOLEIL MÛRE   RÉSERVÉES À L'EXTRAORDINAIRE",

    // Brand Soul
    brandSoul_tag: "L'Âme de la Maison",
    brandSoul_heading1: "Née des Palmiers.",
    brandSoul_heading2: "Façonnée pour le Sacré.",
    brandSoul_body: "Chaque datte est une déclaration d'amour calligraphiée en or — veloutée, gorgée de soleil, achevée à la main. Réservée aux instants qui transcendent l'ordinaire.",
    brandSoul_pillar1: "Veloutée. Gorgée de soleil. Achevée à la main.",
    brandSoul_pillar2: "Façonnée en séries limitées pour l'extraordinaire.",
    brandSoul_pillar3: "Réservée à vos instants les plus sacrés.",

    // Collection
    collection_tag: "La Collection",
    collection_heading: "Façonnée Comme Haute Joaillerie",
    collection_desc: "Chaque datte est un chef-d'œuvre — sélectionnée à la main, garnie avec soin, et présentée avec la précision d'un atelier de couture.",
    collection_crafted: "Façonné",
    collection_discover: "Découvrir",

    // Featured Product
    featured_tag: "Pièce Signature",
    featured_heading: "Oramande",
    featured_desc: "Une datte marocaine caramélisée enveloppant un cœur d'amande torréfiée soyeux, équilibré par une nuance florale délicate. Veloutée, gorgée de soleil, achevée à la main — façonnée en quantités limitées pour le palais exigeant.",
    featured_quote: "Une étreinte veloutée d'élégance amandée.",
    featured_cta: "Commander Cette Pièce",

    // Video Break
    video_heading: "Quand la Texture Rencontre l'Élégance",

    // Customization
    custom_tag: "Service Sur Mesure",
    custom_heading: "Façonné pour Votre Occasion",
    custom_desc: "Chaque célébration mérite sa signature. Nous créons des expériences de dattes de luxe aussi uniques que votre histoire.",
    custom_option1_title: "Coffrets de Mariage de Luxe",
    custom_option1_desc: "Des coffrets sur mesure façonnés pour votre célébration la plus sacrée. Monogrammes en feuille d'or, palettes de couleurs personnalisées et sélections disposées à la main.",
    custom_option2_title: "Éditions Signature du Ramadan",
    custom_option2_desc: "Collections exclusives du Ramadan avec des motifs de croissant ornés, un riche emballage émeraude et or, et des sélections de dattes curated.",
    custom_option3_title: "Couleur & Packaging Sur Mesure",
    custom_option3_desc: "De l'ivoire au onyx profond — votre vision, notre savoir-faire. Des thèmes sur mesure pour les cadeaux d'entreprise, les célébrations et les jalons.",
    custom_cta: "Commencer Votre Parcours Sur Mesure",

    // Instagram
    insta_tag: "Notre Univers",
    insta_heading: "De Notre Univers",
    insta_desc: "Entrez dans l'univers de Palma d'Or — où chaque détail est une célébration de l'art et de la tradition.",
    insta_cta: "Suivre @palma.dor._",

    // Footer
    footer_brandName: "Palma d'Or",
    footer_subtitle: "Le Joyau de Marrakech",
    footer_desc: "Dattes artisanales faconnées à la main pour le Ramadan, les mariages et les célébrations exclusives.",
    footer_quickLinks: "Liens Rapides",
    footer_stayInWorld: "Restez dans Notre Univers",
    footer_welcome: "Bienvenue dans l'univers de Palma d'Or.",
    footer_emailPlaceholder: "Votre email",
    footer_subscribe: "S'abonner",
    footer_instagram: "Instagram",
    footer_whatsapp: "WhatsApp",
    footer_copyright: (year: number) => `© ${year} Palma d'Or. Tous droits réservés.`,

    // Modal
    modal_reserve: "Réserver Cette Pièce",

    // Cursor
    cursor_view: "Voir",

    // Product translations
    product_oramande_name: "Oramande",
    product_oramande_desc: "Datte enrobée de chocolat noir, zeste d'orange confit.",
    product_kunafa_name: "Kunafa Pistache",
    product_kunafa_desc: "Cheveux d'ange dorés et croustillants, cœur de pistache.",
    product_pistachio_name: "Pistache",
    product_pistachio_desc: "Datte garnie de pistaches concassées, fraîches et parfumées.",
    product_perleAmande_name: "Perle d'Amande",
    product_perleAmande_desc: "Amandes entières dorées à la feuille d'or comestible.",
    product_noisetta_name: "Noisetta Croquante",
    product_noisetta_desc: "Praliné noisette enrobé de chocolat et éclats croquants.",
    product_framboisia_name: "Framboisia",
    product_framboisia_desc: "Coque de chocolat noir, pétales de framboise.",
    product_perleCoco_name: "Perle de Coco",
    product_perleCoco_desc: "Datte moelleuse couronnée d'un voile de noix de coco.",
    product_roseAmande_name: "Rose d'Amande",
    product_roseAmande_desc: "Pâte d'amande délicate, parsemée de pétales de rose.",
  },
  ar: {
    // Navigation
    nav_collection: "المجموعة",
    nav_bespoke: "حسب الطلب",
    nav_ourWorld: "عالمنا",
    nav_order: "اطلب",
    nav_orderNow: "اطلب الآن",

    // Hero
    hero_brandName: "Palma d'Or",
    hero_subtitle: "جوهرة مراكش",
    hero_tagline1: "تمور فاخرة تُصاغ بحرفية في مراكش",
    hero_tagline2: "لأرقى لحظاتكم",
    hero_cta: "اكتشف المجموعة",

    // Marquee
    marquee: "PALMA D'OR   مراكش   صُنعت بكميات محدودة   كمال ناضج تحت الشمس   مخصصة للاستثنائي",

    // Brand Soul
    brandSoul_tag: "روح الدار",
    brandSoul_heading1: "ولدت من النخيل.",
    brandSoul_heading2: "صُنعت للمقدّس.",
    brandSoul_body: "كل تمرة رسالة حب مكتوبة بالذهب — مخملية، ناضجة تحت الشمس، منتهية يدويًا. محفوظة لللحظات التي تتجاوز العادي.",
    brandSoul_pillar1: "مخملية. ناضجة تحت الشمس. منتهية يدويًا.",
    brandSoul_pillar2: "صُنعت بكميات محدودة للاستثنائي.",
    brandSoul_pillar3: "محفوظة لأقدس لحظاتكم.",

    // Collection
    collection_tag: "المجموعة",
    collection_heading: "صُنعت كالمجوهرات الراقية",
    collection_desc: "كل تمرة تحفة فنية — مختارة يدويًا، ومحشوة بعناية، ومقدمة بدقة أتيليه الأزياء الراقية.",
    collection_crafted: "صُنعت",
    collection_discover: "اكتشف",

    // Featured Product
    featured_tag: "قطعة مميزة",
    featured_heading: "Oramande",
    featured_desc: "تمرة مغربية مكرملة تضم قلب لوز محمص حريري، متوازنة بنكهة زهرية رقيقة. مخملية، ناضجة تحت الشمس، منتهية يدويًا — صُنعت بكميات محدودة للذواقين.",
    featured_quote: "عناق مخملي لأناقة اللوز المحمص.",
    featured_cta: "اطلب هذه القطعة",

    // Video Break
    video_heading: "حيث تلتقي الملمس بالأناقة",

    // Customization
    custom_tag: "خدمة حسب الطلب",
    custom_heading: "مصمم لمناسبتكم",
    custom_desc: "كل احتفال يستحق بصمته الخاصة. نصنع تجارب تمور فاخرة فريدة كقصتكم.",
    custom_option1_title: "صناديق زفاف فاخرة",
    custom_option1_desc: "صناديق حسب الطلب مصممة لأقدس احتفالاتكم. أحرف مسكوبة بالذهب، لوحات ألوان مخصصة، وترتيبات يدوية.",
    custom_option2_title: "إصدارات رمضان المميزة",
    custom_option2_desc: "مجموعات رمضان الحصرية بزخارف هلالية أنيقة، وتغليف زمردي وذهبي فاخر، واختيارات تمور منتقاة.",
    custom_option3_title: "ألوان وتغليف حسب الطلب",
    custom_option3_desc: "من العاجي إلى الأونكس العميق — رؤيتكم، حرفتنا. تصاميم مخصصة لهدايا الشركات والاحتفالات والمناسبات.",
    custom_cta: "ابدأ رحلتك حسب الطلب",

    // Instagram
    insta_tag: "عالمنا",
    insta_heading: "من عالمنا",
    insta_desc: "ادخلوا عالم Palma d'Or — حيث كل تفصيل احتفال بالحرفية والتقاليد.",
    insta_cta: "تابعوا @palma.dor._",

    // Footer
    footer_brandName: "Palma d'Or",
    footer_subtitle: "جوهرة مراكش",
    footer_desc: "تمور حرفية مصنوعة يدويًا لرمضان والأعراس والاحتفالات الفاخرة.",
    footer_quickLinks: "روابط سريعة",
    footer_stayInWorld: "ابقوا في عالمنا",
    footer_welcome: "مرحبًا بكم في عالم Palma d'Or.",
    footer_emailPlaceholder: "بريدكم الإلكتروني",
    footer_subscribe: "اشتركوا",
    footer_instagram: "إنستغرام",
    footer_whatsapp: "واتساب",
    footer_copyright: (year: number) => `© ${year} Palma d'Or. جميع الحقوق محفوظة.`,

    // Modal
    modal_reserve: "احجز هذه القطعة",

    // Cursor
    cursor_view: "عرض",

    // Product translations
    product_oramande_name: "Oramande",
    product_oramande_desc: "تمرة مغلفة بالشوكولاتة الداكنة، قشر البرتقال المُدبّج.",
    product_kunafa_name: "كنافة فستق",
    product_kunafa_desc: "شعر الملاك الذهبي المقرمش، قلب الفستق.",
    product_pistachio_name: "فستق",
    product_pistachio_desc: "تمرة مزينة بالفستق المطحون الطازج والعطري.",
    product_perleAmande_name: "لوزة اللؤلؤ",
    product_perleAmande_desc: "لوز كامل مُذهّب بورق الذهب الصالح للأكل.",
    product_noisetta_name: "بندقية مقرمشة",
    product_noisetta_desc: "برالين البندق المغلف بالشوكولاتة مع قطع مقرمشة.",
    product_framboisia_name: "Framboisia",
    product_framboisia_desc: "قشرة شوكولاتة داكنة، بتلات التوت.",
    product_perleCoco_name: "لؤلؤة جوز الهند",
    product_perleCoco_desc: "تمرة ناعمة متوجة بحجاب جوز الهند.",
    product_roseAmande_name: "وردة اللوز",
    product_roseAmande_desc: "عجينة لوز رقيقة، مرشوشة ببتلات الورد.",
  },
} as const;

/* ═══════════════════════════════════════════════════════════════
   LANGUAGE CONTEXT
   ═══════════════════════════════════════════════════════════════ */

type TranslationsType = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationsType;
  isRTL: boolean;
  fadeState: "in" | "out";
  switchLang: (newLang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
  isRTL: false,
  fadeState: "in",
  switchLang: () => {},
});

function useLanguage() {
  return useContext(LanguageContext);
}

/* Product key mapping — maps product index to translation key prefix */
const productKeyMap = [
  "product_oramande",
  "product_kunafa",
  "product_pistachio",
  "product_perleAmande",
  "product_noisetta",
  "product_framboisia",
  "product_perleCoco",
  "product_roseAmande",
] as const;

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */

function useInViewAnimate(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC INTRO — Merged into HeroSection (one logo, one move)
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   MINI COMPONENTS — Shared Design Elements
   ═══════════════════════════════════════════════════════════════ */

function GoldDivider({ className = "" }: { className?: string }) {
  return <div className={`gold-divider ${className}`} />;
}

function SectionTag({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  return (
    <span
      className={`inline-block tracking-[0.3em] uppercase text-[9px] font-montserrat font-medium mb-6 ${
        variant === "light" ? "text-gold-dark" : "text-gold"
      }`}
    >
      — {children} —
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR — Refined Gold Ring
   ═══════════════════════════════════════════════════════════════ */

const CURSOR_VIEW_MAP: Record<Lang, string> = { en: "View", fr: "Voir", ar: "عرض" };

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const viewTextRef = useRef<string>("View");

  // Sync view text from DOM data attribute — avoids re-render on language change
  useEffect(() => {
    const syncText = () => {
      const attr = document.documentElement.getAttribute("data-lang") as Lang | null;
      if (attr && CURSOR_VIEW_MAP[attr]) viewTextRef.current = CURSOR_VIEW_MAP[attr];
    };
    syncText();
    const observer = new MutationObserver(syncText);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!cursor || !dot || !ring) return;

    let onLightBg = false;
    let isHovering = false;
    let hoverText = "";
    let lastBgCheck = 0;
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number | null = null;

    const DARK_COLORS = {
      dot: "#D4AF37",
      ring: "#D4AF37",
      ringHover: "rgba(212, 175, 55, 0.06)",
      label: "#D4AF37",
    };
    const LIGHT_COLORS = {
      dot: "#0F0F0F",
      ring: "#0F0F0F",
      ringHover: "rgba(15, 15, 15, 0.08)",
      label: "#0F0F0F",
    };

    const applyColors = () => {
      const c = onLightBg ? LIGHT_COLORS : DARK_COLORS;
      dot.style.backgroundColor = c.dot;
      ring.style.borderColor = c.ring;
      if (label) label.style.color = c.label;
    };

    const applyHover = () => {
      if (isHovering) {
        ring.style.transform = "scale(2.6) translateZ(0)";
        ring.style.backgroundColor = onLightBg ? LIGHT_COLORS.ringHover : DARK_COLORS.ringHover;
        if (label && hoverText) {
          label.textContent = hoverText;
          label.style.display = "block";
        }
      } else {
        ring.style.transform = "scale(1) translateZ(0)";
        ring.style.backgroundColor = "transparent";
        if (label) {
          label.textContent = "";
          label.style.display = "none";
        }
      }
    };

    // rAF loop — reads latest mouse position, writes once per frame via translate3d
    const renderFrame = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      rafId = null;
    };

    const scheduleFrame = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(renderFrame);
      }
    };

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      scheduleFrame();

      // Background luminance check — throttled to ~5x/sec
      const now = Date.now();
      if (now - lastBgCheck < 200) return;
      lastBgCheck = now;
      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el) {
        let current: HTMLElement | null = el;
        for (let i = 0; i < 3 && current; i++) {
          const bg = current.style.backgroundColor || window.getComputedStyle(current).backgroundColor;
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const luminance = (0.299 * parseInt(match[1]) + 0.587 * parseInt(match[2]) + 0.114 * parseInt(match[3])) / 255;
            const newOnLightBg = luminance > 0.45;
            if (onLightBg !== newOnLightBg) {
              onLightBg = newOnLightBg;
              applyColors();
            }
            return;
          }
          current = current.parentElement;
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='view']")) {
        isHovering = true; hoverText = viewTextRef.current; applyHover(); applyColors();
      } else if (target.closest("button, a, [data-cursor='pointer']")) {
        isHovering = true; hoverText = ""; applyHover(); applyColors();
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='view']") || target.closest("button, a, [data-cursor='pointer']")) {
        isHovering = false; hoverText = ""; applyHover();
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{ willChange: "transform" }}
    >
      <div
        ref={dotRef}
        className="absolute rounded-full"
        style={{
          width: 4, height: 4, marginLeft: -2, marginTop: -2,
          backgroundColor: "#D4AF37",
        }}
      />
      <div
        ref={ringRef}
        className="rounded-full flex items-center justify-center"
        style={{
          width: 18, height: 18, marginLeft: -9, marginTop: -9,
          border: "1px solid #D4AF37",
          willChange: "transform",
          transition: "transform 0.1s ease-out, background-color 0.1s ease-out",
          transform: "scale(1) translateZ(0)",
        }}
      >
        <span
          ref={labelRef}
          className="text-[5px] tracking-[0.08em] uppercase font-montserrat font-medium select-none"
          style={{ color: "#D4AF37", display: "none" }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GOLD DUST PARTICLES — Atmospheric Ambient
   ═══════════════════════════════════════════════════════════════ */

function GoldDustParticles({ count = 15 }: { count?: number }) {
  // Hydration-safe: deterministic on first render, random after mount
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Deterministic spread for SSR — no Math.random() during initial render
  const stableParticles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 7 + 3) % 100,
        top: (i * 11 + 5) % 100,
        size: 1.2,
        duration: 15,
        delay: 0,
        dx: 0,
        dy: 0,
      })),
    [count]
  );

  const randomParticles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 12,
        dx: (Math.random() - 0.5) * 60,
        dy: -(Math.random() * 50 + 20),
      })),
    [count]
  );

  const particles = mounted ? randomParticles : stableParticles;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              backgroundColor: "rgba(212, 175, 55, 0.2)",
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              animation: `dustFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MARQUEE STRIP — Between Sections
   ═══════════════════════════════════════════════════════════════ */

function MarqueeStrip() {
  const { t, isRTL } = useLanguage();
  const text = t.marquee + "   ";
  return (
    <div className="relative py-6 bg-noir border-y border-gold/8 overflow-hidden">
      <div className={`flex whitespace-nowrap ${isRTL ? "marquee-track-rtl" : "marquee-track"}`}>
        <span className="font-montserrat text-[9px] tracking-[0.4em] uppercase text-gold/15 mx-4">
          {text}{text}{text}{text}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION — Floating, Minimal, Cinematic
   ═══════════════════════════════════════════════════════════════ */

function Navigation() {
  const { t, lang, switchLang, isRTL } = useLanguage();
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const LERP = 0.1;
    let currentBg = 0;
    let currentPy = 0;
    let targetBg = 0;
    let targetPy = 0;
    let rafId: number | null = null;
    let lastAppliedBg = -1;
    let lastAppliedPy = -1;

    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

    const update = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (scrollY - vh * 0.05) / (vh * 0.15)));

      targetBg = progress;
      targetPy = progress;

      currentBg = lerp(currentBg, targetBg, LERP);
      currentPy = lerp(currentPy, targetPy, LERP);

      const bgRounded = Math.round(currentBg * 1000) / 1000;
      const pyRounded = Math.round(currentPy * 100) / 100;

      if (bgRounded !== lastAppliedBg) {
        nav.style.backgroundColor = `rgba(15, 15, 15, ${currentBg.toFixed(3)})`;
        lastAppliedBg = bgRounded;
      }
      if (pyRounded !== lastAppliedPy) {
        const inner = nav.querySelector('.nav-inner') as HTMLElement | null;
        if (inner) {
          inner.style.transform = `translateY(${-currentPy * 6}px) translateZ(0)`;
        }
        lastAppliedPy = pyRounded;
      }

      const needsUpdate =
        Math.abs(currentBg - targetBg) > 0.002 ||
        Math.abs(currentPy - targetPy) > 0.005;

      if (needsUpdate) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const navItems = [
    { label: t.nav_collection, href: "#collection" },
    { label: t.nav_bespoke, href: "#customization" },
    { label: t.nav_ourWorld, href: "#our-world" },
  ];

  const langs: Lang[] = ["en", "fr", "ar"];

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 py-6"
      style={{ willChange: "background-color" }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 3.2, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <div className="nav-inner max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ willChange: "transform" }}>
        {/* Logo — Palm emblem */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          data-cursor="pointer"
        >
          <img
            src="/images/brand/emblem.png"
            alt=""
            className="h-8 w-auto transition-all duration-700 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]"
          />
          <span className="font-cormorant text-lg text-ivory tracking-wide hidden sm:inline group-hover:text-gold/80 transition-colors duration-700">
            {t.hero_brandName}
          </span>
        </a>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center ${isRTL ? "gap-16 flex-row-reverse" : "gap-14"}`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`nav-link-underline font-medium hover:text-gold/80 transition-all duration-700 ${
                lang === "ar"
                  ? "font-amiri font-normal text-white text-[16px] tracking-[0.05em]"
                  : "font-montserrat text-ivory text-[10px] tracking-[0.25em] uppercase"
              }`}
              data-cursor="pointer"
            >
              {item.label}
            </a>
          ))}
          {/* Language Switcher */}
          <div className={`flex items-center text-[9px] tracking-[0.2em] uppercase ${lang === "ar" ? "font-amiri font-normal text-white text-[11px] tracking-[0.04em]" : "font-montserrat"}`}>
            {langs.map((l, i) => (
              <span key={l} className="flex items-center">
                <button
                  onClick={() => switchLang(l)}
                  className={`transition-colors duration-300 font-montserrat text-[9px] tracking-[0.2em] ${
                    lang === l
                      ? "text-[#C9A84C] underline underline-offset-4 decoration-[#C9A84C]/70 decoration-[0.5px]"
                      : "text-ivory/50 hover:text-ivory/70"
                  }`}
                  data-cursor="pointer"
                >
                  {l.toUpperCase()}
                </button>
                {i < langs.length - 1 && (
                  <span className="text-ivory/25 mx-2 font-montserrat">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Order Button */}
        <div className="hidden md:block">
          <a
            href="/api/whatsapp"
            className={`border border-gold/90 text-gold hover:bg-gold/10 hover:border-gold hover:text-gold-light transition-all duration-700 ${
              lang === "ar"
                ? "font-amiri font-normal text-[18px] tracking-[0.05em] px-20 py-3"
                : "font-montserrat font-semibold text-[13px] tracking-[0.35em] uppercase px-14 py-4"
            }`}
            data-cursor="pointer"
          >
            {t.nav_order}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ivory"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X size={20} />
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="w-5 h-px bg-ivory/60" />
              <div className="w-3 h-px bg-gold/60" />
              <div className="w-5 h-px bg-ivory/60" />
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-noir/98 backdrop-blur-2xl absolute top-full left-0 right-0 border-t border-gold/5"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="px-8 py-12 flex flex-col gap-8">
              <div className="flex justify-center mb-2">
                <img
                  src="/images/brand/emblem.png"
                  alt=""
                  className="h-14 w-auto"
                />
              </div>
              {/* Mobile language switcher */}
              <div className="flex justify-center items-center gap-3 font-montserrat text-[10px] tracking-[0.2em] uppercase">
                {langs.map((l, i) => (
                  <span key={l} className="flex items-center">
                    <button
                      onClick={() => { switchLang(l); setMobileOpen(false); }}
                      className={`transition-colors duration-300 font-montserrat text-[10px] tracking-[0.2em] ${
                        lang === l
                          ? "text-[#C9A84C] underline underline-offset-4 decoration-[#C9A84C]/70"
                          : "text-ivory/50"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                    {i < langs.length - 1 && (
                      <span className="text-ivory/25 mx-1.5">·</span>
                    )}
                  </span>
                ))}
              </div>
              {navItems.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className={`text-3xl hover:text-gold transition-colors text-center ${
                  lang === "ar" ? "font-amiri font-normal text-white/85" : "font-cormorant text-ivory/70"
                }`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 + 0.2 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="/api/whatsapp"
                className={`luxury-btn border border-gold/80 text-gold text-center hover:bg-gold/10 hover:border-gold hover:text-gold-light transition-all duration-700 mt-4 ${
                  lang === "ar"
                    ? "font-amiri font-normal text-[15px] tracking-[0.05em] px-12 py-3"
                    : "font-montserrat font-semibold text-[11px] tracking-[0.3em] uppercase px-10 py-4"
                }`}
              >
                {t.nav_orderNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION — One Cinematic Move: Black → Logo → World → Text
   ═══════════════════════════════════════════════════════════════ */

function HeroSection() {
  const { t, isRTL } = useLanguage();
  const bgRef = useRef<HTMLDivElement>(null);
  const emblemWrapperRef = useRef<HTMLDivElement>(null);
  const emblemGlowRef = useRef<HTMLDivElement>(null);
  const emblemImgRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const [introComplete, setIntroComplete] = useState(false);

  /* ── Intro Animation ── One continuous cinematic flow ── */
  useEffect(() => {
    const emblem = emblemWrapperRef.current;
    const overlay = overlayRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;
    const emblemImg = emblemImgRef.current;
    if (!emblem || !overlay) return;

    const t1 = setTimeout(() => {
      emblem.style.transition = "opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)";
      emblem.style.opacity = "1";
      emblem.style.transform = "scale(1) translateZ(0)";
    }, 100);

    const t2 = setTimeout(() => {
      overlay.style.transition = "opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1)";
      overlay.style.opacity = "0";
    }, 900);

    const t3 = setTimeout(() => {
      // Glow ring becomes visible via CSS animation — no filter needed
      const glowRing = emblem.querySelector('.emblem-glow-ring') as HTMLElement | null;
      if (glowRing) {
        glowRing.style.transition = "opacity 1.5s ease";
        glowRing.style.opacity = "0.5";
      }
    }, 1100);

    const t4 = setTimeout(() => {
      if (headline) {
        headline.style.transition = "opacity 1400ms cubic-bezier(0.22, 1, 0.36, 1), transform 1400ms cubic-bezier(0.22, 1, 0.36, 1)";
        headline.style.opacity = "1";
        headline.style.transform = "translateY(0)";
      }
    }, 1800);

    const t5 = setTimeout(() => {
      if (subtitle) {
        subtitle.style.transition = "opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1), transform 1200ms cubic-bezier(0.22, 1, 0.36, 1)";
        subtitle.style.opacity = "1";
        subtitle.style.transform = "translateY(0)";
      }
    }, 2200);

    const t6 = setTimeout(() => {
      if (tagline) {
        tagline.style.transition = "opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)";
        tagline.style.opacity = "1";
        tagline.style.transform = "translateY(0)";
      }
    }, 2600);

    const t7 = setTimeout(() => {
      if (cta) {
        cta.style.transition = "opacity 1000ms cubic-bezier(0.22, 1, 0.36, 1), transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)";
        cta.style.opacity = "1";
        cta.style.transform = "translateY(0)";
      }
    }, 2900);

    const t8 = setTimeout(() => {
      setIntroComplete(true);
      if (overlay) overlay.style.display = "none";
      emblem.style.transition = "none";
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, []);

  /* ── Scroll-driven lerp — only activates after intro completes ── */
  useEffect(() => {
    if (!introComplete) return;

    const bg = bgRef.current;
    const emblem = emblemWrapperRef.current;
    const emblemGlow = emblemGlowRef.current;
    if (!bg || !emblem) return;

    const LERP = 0.12;
    const current = {
      emblemScale: 1,
      emblemOpacity: 1,
      glowOpacity: 1,
    };

    let rafId: number | null = null;
    let lastScrollY = -1;
    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

    const updateOnScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === lastScrollY) {
        rafId = null;
        return;
      }
      lastScrollY = scrollY;

      const heroHeight = window.innerHeight;
      const progress = Math.min(scrollY / heroHeight, 1);
      const adjustedProgress = Math.max(0, (progress - 0.2) / 0.8);
      const easedProgress = 1 - Math.pow(1 - adjustedProgress, 3);

      const targetEmblemScale = 1 - 0.03 * easedProgress;
      const targetEmblemOpacity = 1 - 0.12 * easedProgress;
      const targetGlowOpacity = 1 - 0.75 * easedProgress;

      current.emblemScale = lerp(current.emblemScale, targetEmblemScale, LERP);
      current.emblemOpacity = lerp(current.emblemOpacity, targetEmblemOpacity, LERP);
      current.glowOpacity = lerp(current.glowOpacity, targetGlowOpacity, LERP);

      if (emblem) {
        emblem.style.transform = `scale(${current.emblemScale.toFixed(4)}) translateZ(0)`;
        emblem.style.opacity = current.emblemOpacity.toFixed(3);
        // Set --glow-scale on wrapper so the CSS glow ring animation responds
        emblem.style.setProperty("--glow-scale", current.glowOpacity.toFixed(3));
      }
      if (emblemGlow) {
        emblemGlow.style.opacity = current.glowOpacity.toFixed(3);
      }

      const needsUpdate =
        Math.abs(current.emblemScale - targetEmblemScale) > 0.0001 ||
        Math.abs(current.emblemOpacity - targetEmblemOpacity) > 0.001 ||
        Math.abs(current.glowOpacity - targetGlowOpacity) > 0.001;

      if (needsUpdate) {
        rafId = requestAnimationFrame(updateOnScroll);
      } else {
        rafId = null;
      }
    };

    updateOnScroll();

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateOnScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [introComplete]);

  return (
    <section className="relative h-screen min-h-[800px] overflow-hidden">
      {/* Background layer — scroll-controlled frost reveal */}
      <div
        ref={bgRef}
        className="absolute inset-[-20%] bg-cover bg-center bg-noir ken-burns-zoom"
        style={{
          backgroundImage: "url('/images/brand/gold-box-overview.jpeg')",
          filter: "blur(80px) saturate(1.04)",
          WebkitFilter: "blur(80px) saturate(1.04)",
        }}
      />

      {/* Warm undertone — golden warmth through frost */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(180, 140, 50, 0.06) 0%, transparent 40%, rgba(160, 120, 40, 0.04) 100%)",
        }}
      />

      {/* Light gradient overlay — minimal, for text readability */}
      <div
        className="absolute inset-0 hero-overlay-breathe"
        style={{
          background:
            "linear-gradient(rgba(15, 15, 15, 0.15) 0%, rgba(15, 15, 15, 0.03) 35%, rgba(15, 15, 15, 0.03) 60%, rgba(15, 15, 15, 0.18) 100%)",
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(transparent 55%, rgba(15, 15, 15, 0.15) 100%)",
        }}
      />

      {/* ══ INTRO BLACK OVERLAY — fades to reveal the world ══ */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 bg-noir pointer-events-none"
        style={{ willChange: "opacity" }}
      />

      <GoldDustParticles count={12} />

      {/* ══ Content — z-30, above overlay. ONE logo, never duplicated ══ */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Palm Emblem — the single logo element, scroll-reactive after intro */}
        <div
          ref={emblemWrapperRef}
          className={`relative mb-6 ${introComplete ? "emblem-breathe" : ""}`}
          style={{ willChange: "transform, opacity", opacity: 0, transform: "scale(0.92)" }}
        >
          {/* Ambient glow ring — opacity-animated, no filter */}
          <div
            ref={emblemGlowRef}
            className="emblem-glow-ring"
            style={{ willChange: "opacity" }}
          />
          <img
            ref={emblemImgRef}
            src="/images/brand/emblem.png"
            alt=""
            className={`${isRTL ? "h-[8rem] sm:h-[11.5rem] md:h-[14.5rem]" : "h-[9rem] sm:h-48 md:h-60"} w-auto mx-auto`}
          />
        </div>

        {/* Text — fades in after overlay clears and logo settles */}
        <div ref={textWrapperRef} className="w-full flex flex-col items-center">
          {/* Brand name — cinematic reveal */}
          <h1
            ref={headlineRef}
            className={`font-cormorant ${isRTL ? "text-[2rem] sm:text-[3.4rem] md:text-[4rem] lg:text-[6.75rem]" : "text-[2.7rem] sm:text-[4rem] md:text-[5.4rem] lg:text-[7.65rem]"} font-light text-ivory ${introComplete ? "gold-glow-breathe gold-sweep" : ""} mb-4`}
            style={{ textShadow: "0 0 40px rgba(252, 250, 247, 0.2), 0 2px 8px rgba(0, 0, 0, 0.6)", letterSpacing: "0.08em", opacity: 0, transform: "translateY(16px)" }}
          >
            {t.hero_brandName}
          </h1>

          {/* Subtitle — cinematic reveal */}
          <p
            ref={subtitleRef}
            className={`italic text-center w-full mb-6 ${isRTL ? "font-amiri text-[2rem] sm:text-[2.55rem] md:text-[3.3rem] text-[#C9A84C]" : "text-[#C9A84C] text-[1.7rem] sm:text-[2.15rem] md:text-[2.6rem]"}`}
            style={{
              fontFamily: isRTL ? "var(--font-amiri), serif" : "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontWeight: isRTL ? 600 : 600,
              letterSpacing: isRTL ? "0.05em" : "0.25em",
              paddingRight: isRTL ? "0" : "0.25em",
              lineHeight: "1.6",
              opacity: 0,
              transform: "translateY(16px)",
            }}
          >
            {t.hero_subtitle}
          </p>

          {/* Single thin editorial line */}
          <div className="w-10 h-px bg-[#C9A84C]/22 mx-auto mb-8 mt-1" />

          {/* Tagline — cinematic reveal */}
          <p
            ref={taglineRef}
            className={`max-w-[340px] sm:max-w-[380px] ${isRTL ? "font-amiri text-ivory/90 text-[12px] sm:text-[13px]" : "text-ivory/90 font-cormorant text-[12px] sm:text-[13px]"} mb-10 text-center`}
            style={{
              fontFamily: isRTL ? "var(--font-amiri), serif" : "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontWeight: isRTL ? 400 : 600,
              letterSpacing: isRTL ? "0.01em" : "0.04em",
              lineHeight: isRTL ? "2.8" : "3",
              textShadow: "0 1px 6px rgba(0, 0, 0, 0.15)",
              opacity: 0,
              transform: "translateY(16px)",
            }}
          >
            {isRTL ? (
              <>
                {t.hero_tagline1}
                <br />
                {t.hero_tagline2}
              </>
            ) : (
              <>
                {t.hero_tagline1}<br />
                {t.hero_tagline2}
              </>
            )}
          </p>

          {/* CTA — cinematic reveal, arrives last */}
          <a
            ref={ctaRef}
            href="#collection"
            className="hero-cta group relative font-montserrat text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-semibold border border-gold text-gold-light px-16 py-5 hover:border-gold-light hover:bg-gold/15 hover:text-ivory transition-all duration-1000 inline-flex items-center gap-5 shadow-[0_2px_20px_rgba(212,175,55,0.12)] hover:shadow-[0_4px_28px_rgba(212,175,55,0.18)] hover:-translate-y-px"
            data-cursor="pointer"
            style={{ textShadow: "0 0 16px rgba(212, 175, 55, 0.4), 0 1px 3px rgba(0, 0, 0, 0.5)", opacity: 0, transform: "translateY(16px)" }}
          >
            {t.hero_cta}
            <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-700" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC VIDEO BREAK — Sensory Immersion
   ═══════════════════════════════════════════════════════════════ */

function CinematicVideoBreak() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInViewAnimate(0.1);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — silent fail, poster image shown
      });
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ minHeight: "60vh" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, ease: [0.25, 0.8, 0.25, 1] }}
        className="relative w-full"
        style={{ minHeight: "60vh" }}
      >
        {/* Video — autoplay muted loop */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/brand/gold-box-detail.jpeg"
        >
          <source src="/videos/cinematic-01.mp4" type="video/mp4" />
        </video>

        {/* Warm golden overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,15,15,0.4) 0%, rgba(212,175,55,0.06) 30%, rgba(212,175,55,0.06) 70%, rgba(15,15,15,0.5) 100%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(15,15,15,0.5) 100%)",
          }}
        />

        {/* Centered minimal text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8 mx-auto" />
            <p className={`text-2xl sm:text-4xl md:text-5xl text-ivory/80 tracking-[0.08em] font-light leading-tight ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.05em" } : undefined}>
              {t.video_heading}
            </p>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-8 mx-auto" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BRAND SOUL — Emotional Core
   ═══════════════════════════════════════════════════════════════ */

function BrandSoul() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInViewAnimate(0.2);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-52 bg-noir overflow-hidden"
    >
      {/* Ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(212,175,55,0.035) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.6, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <SectionTag>{t.brandSoul_tag}</SectionTag>

          <h2 className={`text-3xl sm:text-5xl md:text-7xl text-ivory font-light leading-[1.1] mb-12 ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.05em" } : undefined}>
            {t.brandSoul_heading1}
            <br />
            <span className={`text-gold italic ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600 } : undefined}>{t.brandSoul_heading2}</span>
          </h2>
        </motion.div>

        <motion.p
          className={`leading-[2.2] tracking-[0.1em] mx-auto mb-16 ${isRTL ? "font-amiri text-[13px] sm:text-[14px] text-ivory max-w-sm" : "font-montserrat text-[11px] sm:text-xs text-ivory/90 max-w-lg"}`}
          style={isRTL ? { fontWeight: 500, letterSpacing: "0.02em" } : undefined}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
        >
          {t.brandSoul_body}
        </motion.p>

        {/* Three pillars */}
        <div className="grid grid-cols-3 gap-8 md:gap-16">
          {[
            { number: "01", phrase: t.brandSoul_pillar1 },
            { number: "02", phrase: t.brandSoul_pillar2 },
            { number: "03", phrase: t.brandSoul_pillar3 },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.8 + i * 0.25,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              <span className="font-montserrat text-[8px] text-gold/60 tracking-[0.3em] mb-4 block">
                {item.number}
              </span>
              <p className="font-cormorant text-sm md:text-lg text-ivory/90 italic font-light leading-relaxed">
                &ldquo;{item.phrase}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <GoldDivider className="absolute bottom-0 left-0 right-0" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT DETAIL MODAL — Cinematic Reveal
   ═══════════════════════════════════════════════════════════════ */

type TranslatedProduct = {
  name: string;
  image: string;
  description: string;
};

function ProductModal({
  product,
  onClose,
}: {
  product: TranslatedProduct | null;
  onClose: () => void;
}) {
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="absolute inset-0 bg-noir/92 backdrop-blur-lg"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative bg-noir-light border border-gold/8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.96 }}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-ivory/20 hover:text-gold transition-colors duration-700"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto md:min-h-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-noir-light/20 hidden md:block" />
                <div className="absolute inset-0 border border-gold/4" />
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span
                  className="inline-block font-montserrat text-[8px] tracking-[0.3em] uppercase px-3 py-1 border mb-6 self-start"
                  style={{
                    color: "#C8A96E",
                    borderColor: "#C8A96E25",
                  }}
                >
                  {t.collection_crafted}
                </span>
                <h3 className={`text-4xl md:text-5xl text-ivory font-light mb-3 gold-glow ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.03em" } : undefined}>
                  {product.name}
                </h3>
                <p className={`text-base text-gold italic font-light mb-8 ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 500, letterSpacing: "0.02em" } : undefined}>
                  &ldquo;{product.description}&rdquo;
                </p>
                <a
                  href="/api/whatsapp"
                  className="luxury-btn inline-flex items-center justify-center gap-4 font-montserrat text-[10px] tracking-[0.25em] uppercase border border-gold/55 text-gold px-10 py-4 hover:bg-gold/10 hover:border-gold/75 hover:text-gold-light transition-all duration-700 group"
                  data-cursor="pointer"
                >
                  <ShoppingBag size={13} />
                  {t.modal_reserve}
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform duration-500"
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COLLECTION SECTION — Editorial Grid
   ═══════════════════════════════════════════════════════════════ */

function ProductCard({
  product,
  index,
  onSelect,
}: {
  product: TranslatedProduct;
  index: number;
  onSelect: (p: TranslatedProduct) => void;
}) {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInViewAnimate(0.05);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      data-cursor="view"
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(product)}
    >
      <div className="relative overflow-hidden bg-noir aspect-[3/4] product-glow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span
            className="font-montserrat text-[7px] tracking-[0.25em] uppercase px-2.5 py-1 bg-noir/50 backdrop-blur-lg border"
            style={{
              color: "#C8A96E",
              borderColor: "#C8A96E20",
            }}
          >
            {t.collection_crafted}
          </span>
        </div>

        {/* Cinematic hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6"
          style={{
            background: isHovered
              ? "linear-gradient(to top, rgba(15,15,15,0.95) 0%, rgba(15,15,15,0.5) 50%, rgba(15,15,15,0.05) 100%)"
              : "linear-gradient(to top, rgba(15,15,15,0.5) 0%, transparent 40%)",
            transition: "background 0.8s ease",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <p className={`leading-[2] tracking-[0.08em] font-medium line-clamp-3 mb-5 ${isRTL ? "font-amiri text-[14px] text-ivory" : "font-montserrat text-[10px] text-ivory/75"}`} style={isRTL ? { fontWeight: 500, letterSpacing: "0.02em" } : undefined}>
              {product.description}
            </p>
            <span className={`inline-flex items-center gap-2 tracking-[0.25em] uppercase ${isRTL ? "font-amiri text-[11px] text-gold" : "font-montserrat text-[8px] text-gold/70"}`}>
              <Star size={8} />
              {t.collection_discover}
            </span>
          </motion.div>
        </motion.div>

        {/* Subtle gold border glow on hover */}
        <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/15 transition-all duration-1000 pointer-events-none" />
      </div>

      {/* Card Info — refined spacing */}
      <div className="mt-5">
        <h3 className={`text-lg md:text-xl font-medium tracking-wide group-hover:text-gold-dark transition-colors duration-700 ${isRTL ? "font-amiri text-noir" : "font-cormorant text-noir"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.03em" } : undefined}>
          {product.name}
        </h3>
        <p className={`mt-1.5 leading-relaxed tracking-[0.1em] font-medium ${isRTL ? "font-amiri text-[13px] text-noir" : "font-montserrat text-[9px] text-noir/55"}`} style={isRTL ? { fontWeight: 500 } : undefined}>
          {product.description}
        </p>
      </div>
    </motion.div>
  );
}

function CollectionSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInViewAnimate(0.05);
  const [selectedProduct, setSelectedProduct] = useState<TranslatedProduct | null>(null);

  // Create translated products without modifying the locked products array
  const translatedProducts = useMemo(() => {
    return products.map((product, i) => {
      const key = productKeyMap[i];
      return {
        ...product,
        name: t[`${key}_name` as keyof typeof t] as string,
        description: t[`${key}_desc` as keyof typeof t] as string,
      };
    });
  }, [t]);

  return (
    <>
      <section
        id="collection"
        className="relative py-32 md:py-52 tadelakt-bg overflow-hidden"
      >
        <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            className="text-center mb-24 md:mb-36"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <SectionTag>{t.collection_tag}</SectionTag>
            <h2 className={`text-4xl sm:text-5xl md:text-7xl text-noir font-light luxury-underline in-view ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.05em" } : undefined}>
              {t.collection_heading}
            </h2>
            <p className="font-montserrat text-[10px] text-noir/55 mt-10 max-w-md mx-auto leading-[2.2] tracking-[0.1em] font-medium">
              {t.collection_desc}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7">
            {translatedProducts.map((product, i) => (
              <ProductCard
                key={product.name}
                product={product}
                index={i}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FEATURED PRODUCT — Cinematic Split (Oramande — Signature)
   ═══════════════════════════════════════════════════════════════ */

function FeaturedProduct() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInViewAnimate(0.15);

  return (
    <section className="relative py-32 md:py-52 bg-noir overflow-hidden film-grain">
      {/* Asymmetric ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 50%, rgba(212,175,55,0.05) 0%, transparent 55%)",
        }}
      />

      <div ref={ref} className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-28 items-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.4, ease: [0.25, 0.8, 0.25, 1] }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/images/products/oramande.jpeg"
                alt="Oramande"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 55%, rgba(15,15,15,0.25) 100%)",
                }}
              />
              <div className="absolute inset-0 border border-gold/6" />
            </div>
            {/* Gold accent corners */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t border-l border-gold/20" />
            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b border-r border-gold/20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 1.4,
              delay: 0.3,
              ease: [0.25, 0.8, 0.25, 1],
            }}
          >
            <SectionTag>{t.featured_tag}</SectionTag>
            <h2 className={`text-4xl sm:text-6xl md:text-7xl text-ivory/85 font-light mb-8 gold-glow ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.05em" } : undefined}>
              {t.featured_heading}
            </h2>
            <p className="font-montserrat text-[10px] text-ivory/65 leading-[2.2] tracking-[0.1em] mb-8 max-w-md">
              {t.featured_desc}
            </p>
            <p className={`text-xl text-gold/80 italic font-light mb-12 ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.05em" } : undefined}>
              &ldquo;{t.featured_quote}&rdquo;
            </p>
            <a
              href="/api/whatsapp"
              className="luxury-btn inline-flex items-center gap-5 font-montserrat text-[10px] tracking-[0.25em] uppercase font-semibold border border-gold/70 text-gold px-12 py-4 hover:bg-gold/10 hover:border-gold hover:text-gold-light transition-all duration-700 group shadow-[0_2px_16px_rgba(212,175,55,0.1)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.16)] hover:-translate-y-px"
              data-cursor="pointer"
            >
              <ShoppingBag size={13} />
              {t.featured_cta}
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform duration-500"
              />
            </a>
          </motion.div>
        </div>
      </div>

      <GoldDivider className="absolute bottom-0 left-0 right-0" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CUSTOMIZATION SECTION — Bespoke Service
   ═══════════════════════════════════════════════════════════════ */

function CustomizationSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInViewAnimate(0.15);

  const options = [
    {
      title: t.custom_option1_title,
      description: t.custom_option1_desc,
      image: "/images/brand/gold-box-overview.jpeg",
      accent: "#D4AF37",
    },
    {
      title: t.custom_option2_title,
      description: t.custom_option2_desc,
      image: "/images/brand/gold-box-detail.jpeg",
      accent: "#8BAF6E",
    },
    {
      title: t.custom_option3_title,
      description: t.custom_option3_desc,
      image: "/images/products/kunafa-pistache.jpeg",
      accent: "#C4764E",
    },
  ];

  return (
    <section
      id="customization"
      className="relative py-32 md:py-52 linen-bg overflow-hidden"
    >
      {/* Double gold frame */}
      <div className="absolute top-10 left-10 right-10 bottom-10 border border-gold/6 pointer-events-none" />
      <div className="absolute top-12 left-12 right-12 bottom-12 border border-gold/3 pointer-events-none" />

      <div
        ref={ref}
        className="max-w-7xl mx-auto px-6 md:px-16 relative z-10"
      >
        <motion.div
          className="text-center mb-24 md:mb-36"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <SectionTag>{t.custom_tag}</SectionTag>
          <h2 className={`text-4xl sm:text-5xl md:text-7xl text-noir font-light luxury-underline in-view ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.05em" } : undefined}>
            {t.custom_heading}
          </h2>
          <p className="font-montserrat text-[10px] text-noir/55 mt-10 max-w-md mx-auto leading-[2.2] tracking-[0.1em] font-medium">
            {t.custom_desc}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7 md:gap-9">
          {options.map((option, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden bg-ivory/70 product-glow"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.3 + i * 0.2,
                ease: [0.25, 0.8, 0.25, 1],
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-10">
                <div
                  className="w-8 h-px mb-6"
                  style={{ backgroundColor: option.accent }}
                />
                <h3 className={`text-2xl font-medium mb-4 tracking-wide group-hover:text-gold-dark transition-colors duration-700 ${isRTL ? "font-amiri text-noir" : "font-cormorant text-noir"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.03em" } : undefined}>
                  {option.title}
                </h3>
                <p className={`leading-[2] tracking-[0.08em] font-medium ${isRTL ? "font-amiri text-[14px] text-noir" : "font-montserrat text-[10px] text-noir/60"}`} style={isRTL ? { fontWeight: 500 } : undefined}>
                  {option.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 1, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <a
            href="/api/whatsapp"
            className="luxury-btn inline-flex items-center gap-5 font-montserrat text-[10px] tracking-[0.25em] uppercase font-semibold border border-gold/70 text-gold px-14 py-5 hover:bg-gold/10 hover:border-gold hover:text-gold-light transition-all duration-700 group shadow-[0_2px_16px_rgba(212,175,55,0.1)] hover:shadow-[0_4px_24px_rgba(212,175,55,0.16)] hover:-translate-y-px"
            data-cursor="pointer"
          >
            {t.custom_cta}
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-500"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INSTAGRAM SECTION — "From Our World"
   ═══════════════════════════════════════════════════════════════ */

function InstagramSection() {
  const { t, isRTL } = useLanguage();
  const { ref, isInView } = useInViewAnimate(0.1);

  const instagramPosts = [
    { image: "/images/products/oramande.jpeg", alt: "Oramande" },
    { image: "/images/brand/gold-box-overview.jpeg", alt: "Luxury Box" },
    { image: "/images/products/pistachio.jpeg", alt: "Pistachio" },
    { image: "/images/products/framboisia.jpeg", alt: "Framboisia" },
    { image: "/images/brand/gold-box-detail.jpeg", alt: "Gold Detail" },
    { image: "/images/products/perle-coco.jpeg", alt: "Perle de Coco" },
  ];

  return (
    <section
      id="our-world"
      className="relative py-32 md:py-52 bg-noir overflow-hidden film-grain"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.04) 0%, transparent 50%)",
        }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20 md:mb-28"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <SectionTag>{t.insta_tag}</SectionTag>
          <h2 className={`text-4xl sm:text-5xl md:text-7xl text-ivory/85 font-light luxury-underline in-view ${isRTL ? "font-amiri" : "font-cormorant"}`} style={isRTL ? { fontWeight: 600, letterSpacing: "0.05em" } : undefined}>
            {t.insta_heading}
          </h2>
          <p className="font-montserrat text-[10px] text-ivory/60 mt-10 max-w-md mx-auto leading-[2.2] tracking-[0.1em] font-medium">
            {t.insta_desc}
          </p>
        </motion.div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/palma.dor._"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 1,
                delay: 0.3 + i * 0.1,
                ease: [0.25, 0.8, 0.25, 1],
              }}
              data-cursor="pointer"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/40 transition-all duration-700 flex items-center justify-center">
                <Instagram
                  size={18}
                  className="text-ivory/0 group-hover:text-ivory/60 transition-all duration-700"
                />
              </div>
              {/* Thin gold border on hover */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/15 transition-all duration-1000 pointer-events-none" />
            </motion.a>
          ))}
        </div>

        {/* Instagram link */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.2 }}
        >
          <a
            href="https://www.instagram.com/palma.dor._"
            target="_blank"
            rel="noopener noreferrer"
            className="luxury-btn inline-flex items-center gap-3 font-montserrat text-[10px] tracking-[0.25em] uppercase border border-gold/45 text-gold/70 px-9 py-3.5 hover:bg-gold/10 hover:border-gold/70 hover:text-gold-light transition-all duration-700"
            data-cursor="pointer"
          >
            <Instagram size={14} />
            {t.insta_cta}
          </a>
        </motion.div>
      </div>

      <GoldDivider className="absolute bottom-0 left-0 right-0" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER — Refined Minimalism
   ═══════════════════════════════════════════════════════════════ */

function Footer() {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch {
      // Silently handle
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = [
    { label: t.nav_collection, href: "#collection" },
    { label: t.nav_bespoke, href: "#customization" },
    { label: t.nav_ourWorld, href: "#our-world" },
  ];

  return (
    <footer className="relative bg-noir pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Palm emblem centered */}
        <div className="flex justify-center mb-10">
          <img
            src="/images/brand/emblem.png"
            alt=""
            className="h-16 w-auto opacity-40"
          />
        </div>

        {/* Gold divider */}
        <GoldDivider className="mb-12" />

        <div className={`grid md:grid-cols-3 gap-12 md:gap-16 mb-16 ${isRTL ? "direction-rtl" : ""}`}>
          {/* Brand */}
          <div className={`text-center ${isRTL ? "md:text-right" : "md:text-left"}`}>
            <h3 className="font-cormorant text-2xl text-ivory/80 font-light mb-3">
              {t.footer_brandName}
            </h3>
            <p className={`font-cormorant text-sm text-gold/65 italic font-light mb-4 ${isRTL ? "font-amiri" : ""}`}>
              {t.footer_subtitle}
            </p>
            <p className="font-montserrat text-[9px] text-ivory/55 leading-[2] tracking-[0.1em] font-medium">
              {t.footer_desc}
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <p className="font-montserrat text-[8px] tracking-[0.3em] uppercase text-gold/55 mb-6">
              {t.footer_quickLinks}
            </p>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-montserrat text-[9px] text-ivory/50 tracking-[0.15em] uppercase hover:text-gold/80 transition-colors duration-700"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className={`text-center ${isRTL ? "md:text-left" : "md:text-right"}`}>
            <p className="font-montserrat text-[8px] tracking-[0.3em] uppercase text-gold/55 mb-6">
              {t.footer_stayInWorld}
            </p>
            {subscribed ? (
              <p className={`font-cormorant text-sm text-gold/75 italic font-light ${isRTL ? "font-amiri" : ""}`}>
                {t.footer_welcome}
              </p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer_emailPlaceholder}
                  className="bg-transparent border-b border-ivory/10 text-ivory/40 font-montserrat text-[10px] tracking-[0.1em] py-2 px-1 placeholder:text-ivory/15 focus:outline-none focus:border-gold/30 transition-colors duration-700"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`self-start md:self-end inline-flex items-center gap-2 font-montserrat text-[8px] tracking-[0.25em] uppercase font-medium text-gold/60 hover:text-gold/90 transition-colors duration-700 disabled:opacity-30 ${isRTL ? "md:self-start" : ""}`}
                >
                  <Send size={10} />
                  {t.footer_subscribe}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <GoldDivider className="mb-8" />
        <div className="flex flex-col items-center gap-8">
          {/* Social buttons — luxury style */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/palma.dor._"
              target="_blank"
              rel="noopener noreferrer"
              className="luxury-btn inline-flex items-center gap-3 font-montserrat text-[9px] tracking-[0.25em] uppercase border border-gold/40 text-gold/70 px-7 py-3 hover:bg-gold/10 hover:border-gold/65 hover:text-gold-light transition-all duration-700"
              data-cursor="pointer"
              aria-label="Instagram"
            >
              <Instagram size={14} />
              {t.footer_instagram}
            </a>
            <a
              href="/api/whatsapp"
              className="luxury-btn inline-flex items-center gap-3 font-montserrat text-[9px] tracking-[0.25em] uppercase border border-gold/40 text-gold/70 px-7 py-3 hover:bg-gold/10 hover:border-gold/65 hover:text-gold-light transition-all duration-700"
              data-cursor="pointer"
              aria-label="WhatsApp"
            >
              <MessageCircle size={14} />
              {t.footer_whatsapp}
            </a>
          </div>
          <p className="font-montserrat text-[8px] text-ivory/15 tracking-[0.15em]">
            {t.footer_copyright(new Date().getFullYear())}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   WHATSAPP FLOATING BUTTON
   ═══════════════════════════════════════════════════════════════ */

function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {/* Instagram floating button */}
      <motion.a
        href="https://www.instagram.com/palma.dor._"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full border border-gold/50 bg-noir/60 backdrop-blur-xl flex items-center justify-center instagram-float"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.8, duration: 0.8, type: "spring", stiffness: 200 }}
        data-cursor="pointer"
        aria-label="Follow on Instagram"
        style={{
          boxShadow: "0 0 25px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.12), inset 0 0 15px rgba(212, 175, 55, 0.08), 0 4px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Instagram size={20} className="text-gold" style={{ filter: "drop-shadow(0 0 6px rgba(212, 175, 55, 0.5))" }} />
      </motion.a>

      {/* WhatsApp floating button */}
      <motion.a
        href="/api/whatsapp"
        className="w-14 h-14 rounded-full border border-gold/50 bg-noir/60 backdrop-blur-xl flex items-center justify-center whatsapp-float"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.5, duration: 0.8, type: "spring", stiffness: 200 }}
        data-cursor="pointer"
        aria-label="Order via WhatsApp"
        style={{
          boxShadow: "0 0 25px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.12), inset 0 0 15px rgba(212, 175, 55, 0.08), 0 4px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <MessageCircle size={20} className="text-gold" style={{ filter: "drop-shadow(0 0 6px rgba(212, 175, 55, 0.5))" }} />
      </motion.a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPOSITION
   ═══════════════════════════════════════════════════════════════ */

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  const switchLang = useCallback((newLang: Lang) => {
    if (newLang === lang) return;
    setFadeState("out");
    setTimeout(() => {
      setLang(newLang);
      // Set data-lang attribute on <html> for cursor to read without re-rendering
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-lang", newLang);
      }
      setFadeState("in");
    }, 250);
  }, [lang]);

  const isRTL = lang === "ar";
  const t = translations[lang];

  // Set initial data-lang on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-lang", lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL, fadeState, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default function Home() {
  const { isRTL, fadeState } = useLanguage();

  return (
    <LanguageProvider>
      <InnerHome />
    </LanguageProvider>
  );
}

function InnerHome() {
  const { isRTL, fadeState } = useLanguage();

  return (
    <main
      className="min-h-screen flex flex-col bg-noir"
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        opacity: fadeState === "out" ? 0 : 1,
        transition: "opacity 250ms ease",
      }}
    >
      <CustomCursor />
      <Navigation />
      <HeroSection />
          <MarqueeStrip />
          <BrandSoul />
          <CollectionSection />
          <FeaturedProduct />
          <CinematicVideoBreak />
          <MarqueeStrip />
          <CustomizationSection />
          <InstagramSection />
          <Footer />
          <WhatsAppFloat />
    </main>
  );
}
