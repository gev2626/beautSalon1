"use client";

import React, { useState, useEffect, useRef, FC, ReactNode } from "react";
import styles from "./SalonPage.module.scss";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type SupportedLocale = "en" | "ru" | "tr" | "de" | "fr";

interface NavT {
  home: string;
  tech: string;
  procedures: string;
  booking: string;
  about: string;
  contact: string;
}
interface HeroT {
  badge: string;
  headline: string;
  headline2: string;
  sub: string;
  cta: string;
  scroll: string;
}
interface DeviceT {
  name: string;
  desc: string;
  benefits: string;
  indications: string;
}
interface TechT {
  title: string;
  sub: string;
  devices: DeviceT[];
}
interface ProcedureT {
  name: string;
  desc: string;
  benefits: string;
  indications: string;
  price: string;
  duration: string;
  tag: string | null;
}
interface ProceduresT {
  title: string;
  sub: string;
  bookBtn: string;
  list: ProcedureT[];
}
interface StatT {
  num: string;
  label: string;
}
interface AboutT {
  title: string;
  sub: string;
  body1: string;
  body2: string;
  body3: string;
  stats: StatT[];
}
interface StepT {
  num: string;
  label: string;
}
interface BookingT {
  title: string;
  sub: string;
  steps: StepT[];
  directBtn: string;
  note: string;
}
interface ContactT {
  title: string;
  sub: string;
  address: string;
  hours: string;
  whatsapp: string;
  scan: string;
  scanNote: string;
}
interface FooterT {
  copy: string;
  privacy: string;
}

interface Translation {
  nav: NavT;
  hero: HeroT;
  tech: TechT;
  procedures: ProceduresT;
  about: AboutT;
  booking: BookingT;
  contact: ContactT;
  footer: FooterT;
}

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────

const TRANSLATIONS: Record<SupportedLocale, Translation> = {
  en: {
    nav: {
      home: "Home",
      tech: "Technologies",
      procedures: "Treatments",
      booking: "Book Now",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Luxury Hotel Spa · Ölüdeniz, Turkey",
      headline: "Where the Sea Meets",
      headline2: "Your Inner Glow",
      sub: "Premium beauty treatments crafted for the discerning traveller. Unwind, restore, and emerge radiant.",
      cta: "Book Your Treatment",
      scroll: "Discover",
    },
    tech: {
      title: "Our Technology",
      sub: "State-of-the-art cosmetic devices curated for visible, lasting results",
      devices: [
        {
          name: "HIFU Ultraformer",
          desc: "High-Intensity Focused Ultrasound lifts and tightens skin non-invasively.",
          benefits: "Skin lifting · Jawline definition · Non-surgical facelift",
          indications: "Sagging skin, loss of elasticity, jowls",
        },
        {
          name: "Laser Epilation (Diode 808nm)",
          desc: "Medical-grade diode laser for permanent hair reduction on all skin tones.",
          benefits: "Permanent reduction · Painless · All skin types",
          indications: "Unwanted hair on face & body",
        },
        {
          name: "RF Microneedling",
          desc: "Radiofrequency energy delivered via micro-needles for deep skin renewal.",
          benefits: "Collagen induction · Pore minimising · Scar reduction",
          indications: "Acne scars, enlarged pores, skin laxity",
        },
        {
          name: "Cryolipolysis",
          desc: "Targeted fat-freezing technology that eliminates stubborn fat cells without surgery.",
          benefits: "Body contouring · Fat reduction · No downtime",
          indications: "Belly, flanks, thighs, chin fat",
        },
      ],
    },
    procedures: {
      title: "Our Treatments",
      sub: "Nine signature experiences, each designed to elevate your wellbeing",
      bookBtn: "Book via WhatsApp",
      list: [
        {
          name: "Hydra Facial",
          desc: "A multi-step treatment that cleanses, exfoliates, and infuses the skin with intensive serums. The patented Vortex-Fusion® technology removes impurities while delivering hydration deep into the dermis.",
          benefits:
            "Instant glow · Deep hydration · Minimised pores · Even skin tone",
          indications:
            "Dehydrated skin, dull complexion, enlarged pores, fine lines",
          price: "€120",
          duration: "60 min",
          tag: "Most Popular",
        },
        {
          name: "HIFU Face Lift",
          desc: "Non-surgical lifting using ultrasound energy to stimulate collagen production deep within skin layers. Results improve progressively over 2–3 months with a single session.",
          benefits:
            "Visible lift · Jawline sculpting · Collagen boost · No recovery time",
          indications:
            "Mild to moderate skin laxity, sagging cheeks, neck looseness",
          price: "€280",
          duration: "90 min",
          tag: "Premium",
        },
        {
          name: "Laser Hair Removal",
          desc: "Permanent hair reduction using 808nm diode laser technology. Safe for all skin phototypes. Our technicians customise energy settings to your skin and hair type for maximum comfort and efficacy.",
          benefits:
            "Permanent reduction · Smooth skin · Fast sessions · All skin types",
          indications: "Face, underarms, legs, bikini, arms, back",
          price: "From €40",
          duration: "15–60 min",
          tag: null,
        },
        {
          name: "Cryolipolysis Body Sculpting",
          desc: "Non-invasive body contouring that freezes and permanently eliminates fat cells. Each treated area shows 20–25% fat reduction after one session. Ideal for areas resistant to diet and exercise.",
          benefits:
            "Fat cell elimination · Inch loss · No surgery · Natural-looking results",
          indications:
            "Belly, love handles, inner thighs, double chin, bra fat",
          price: "€180 / zone",
          duration: "60 min",
          tag: null,
        },
        {
          name: "RF Microneedling",
          desc: "Combines micro-needling with radiofrequency energy to remodel collagen and elastin in deeper skin layers. Addresses scars, pores, and skin texture while simultaneously tightening.",
          benefits:
            "Scar fading · Pore minimising · Skin tightening · Lasting results",
          indications:
            "Acne scars, surgical scars, enlarged pores, stretch marks",
          price: "€220",
          duration: "75 min",
          tag: null,
        },
        {
          name: "Mesotherapy",
          desc: "Microinjections of customised cocktails of vitamins, hyaluronic acid, and peptides delivered directly into the mesoderm for intensive nourishment and revitalisation.",
          benefits:
            "Deep nourishment · Radiance boost · Hair regrowth · Anti-ageing",
          indications: "Dull skin, hair thinning, dehydration, dark circles",
          price: "€150",
          duration: "45 min",
          tag: null,
        },
        {
          name: "Plasma Pen (Fibroblast)",
          desc: "Non-surgical skin tightening using plasma energy to stimulate fibroblast activity. Creates controlled micro-trauma that triggers intensive skin renewal and contraction.",
          benefits:
            "Eyelid tightening · Wrinkle reduction · Scar improvement · Long-lasting",
          indications:
            "Hooded eyelids, perioral lines, neck wrinkles, skin tags",
          price: "€200",
          duration: "60 min",
          tag: "Advanced",
        },
        {
          name: "Chemical Peel",
          desc: "Professional-grade peeling treatments using glycolic, salicylic, or TCA acids tailored to your skin concern. Removes dead cells to reveal fresh, luminous skin underneath.",
          benefits:
            "Skin renewal · Pigmentation fading · Anti-acne · Brightening",
          indications: "Hyperpigmentation, melasma, uneven texture, acne",
          price: "€80",
          duration: "45 min",
          tag: null,
        },
        {
          name: "Gold Thread Lift",
          desc: "Micro-fine gold threads are delicately inserted beneath the skin to physically lift tissues while continuously stimulating collagen. A discreet, long-lasting alternative to surgery.",
          benefits:
            "Physical lift · Collagen matrix · Up to 3-year results · Subtle",
          indications:
            "Nasolabial folds, cheek descent, neck bands, brow ptosis",
          price: "€350",
          duration: "90 min",
          tag: "Signature",
        },
      ],
    },
    about: {
      title: "Our Sanctuary",
      sub: "A haven of beauty nestled within paradise",
      body1:
        "Situated inside one of Turkey's most celebrated beachfront resorts on the turquoise shores of Ölüdeniz, our salon brings medical-grade aesthetics into a setting of pure tranquillity.",
      body2:
        "Our team of certified specialists combines European technique with warm Turkish hospitality — every treatment is a personalised ritual, never a routine.",
      body3:
        "From the first moment you step through our doors, the scent of jasmine, the sound of the sea, and the gentleness of our care will tell you: you are exactly where you need to be.",
      stats: [
        { num: "2,400+", label: "Happy Guests" },
        { num: "9", label: "Signature Treatments" },
        { num: "4", label: "Expert Specialists" },
        { num: "5★", label: "Guest Rating" },
      ],
    },
    booking: {
      title: "Reserve Your Moment",
      sub: "Booking takes under a minute via WhatsApp",
      steps: [
        { num: "01", label: "Choose your treatment above" },
        { num: "02", label: 'Tap "Book via WhatsApp"' },
        { num: "03", label: "Confirm date & time with our team" },
        { num: "04", label: "Arrive, relax, and glow" },
      ],
      directBtn: "Open WhatsApp Now",
      note: "We typically respond within 15 minutes · 9:00 – 21:00 daily",
    },
    contact: {
      title: "Find Us",
      sub: "We are located inside the hotel's wellness wing — no need to leave paradise",
      address:
        "Blue Lagoon Luxury Resort, Wellness & Beauty Centre, Ölüdeniz, Fethiye, Turkey",
      hours: "Daily 09:00 – 21:00",
      whatsapp: "Chat on WhatsApp",
      scan: "Scan to Book",
      scanNote: "Share with friends staying at the hotel",
    },
    footer: {
      copy: "© 2025 Azure Beauty Salon · Blue Lagoon Luxury Resort · All rights reserved",
      privacy: "Privacy Policy",
    },
  },

  ru: {
    nav: {
      home: "Главная",
      tech: "Технологии",
      procedures: "Процедуры",
      booking: "Запись",
      about: "О нас",
      contact: "Контакты",
    },
    hero: {
      badge: "Люкс-спа отеля · Олюдениз, Турция",
      headline: "Там, где море встречает",
      headline2: "Ваше сияние",
      sub: "Премиальные бьюти-процедуры для взыскательных гостей. Расслабьтесь, восстановитесь, сияйте.",
      cta: "Записаться",
      scroll: "Открыть",
    },
    tech: {
      title: "Наши технологии",
      sub: "Передовое оборудование для видимых и долгосрочных результатов",
      devices: [],
    },
    procedures: {
      title: "Наши процедуры",
      sub: "Девять фирменных ритуалов для вашего здоровья и красоты",
      bookBtn: "Записаться в WhatsApp",
      list: [],
    },
    about: {
      title: "Наш салон",
      sub: "Оазис красоты в сердце рая",
      body1:
        "Расположен на берегу бирюзового Олюдениза, в одном из самых известных курортов Турции.",
      body2:
        "Наша команда сертифицированных специалистов соединяет европейские техники с тёплым турецким гостеприимством.",
      body3: "С первой минуты — аромат жасмина, звук моря, забота о вас.",
      stats: [
        { num: "2400+", label: "Гостей" },
        { num: "9", label: "Процедур" },
        { num: "4", label: "Специалиста" },
        { num: "5★", label: "Рейтинг" },
      ],
    },
    booking: {
      title: "Забронируйте",
      sub: "Запись через WhatsApp занимает меньше минуты",
      steps: [
        { num: "01", label: "Выберите процедуру" },
        { num: "02", label: "Нажмите «Записаться в WhatsApp»" },
        { num: "03", label: "Подтвердите дату с нашей командой" },
        { num: "04", label: "Приходите и сияйте" },
      ],
      directBtn: "Открыть WhatsApp",
      note: "Отвечаем в течение 15 минут · 9:00 – 21:00",
    },
    contact: {
      title: "Как нас найти",
      sub: "Мы в велнес-крыле отеля — не нужно покидать рай",
      address:
        "Blue Lagoon Luxury Resort, Велнес и красота, Олюдениз, Фетие, Турция",
      hours: "Ежедневно 09:00 – 21:00",
      whatsapp: "Написать в WhatsApp",
      scan: "Сканируйте для записи",
      scanNote: "Поделитесь с друзьями в отеле",
    },
    footer: {
      copy: "© 2025 Azure Beauty Salon · Blue Lagoon Luxury Resort",
      privacy: "Политика конфиденциальности",
    },
  },

  tr: {
    nav: {
      home: "Ana Sayfa",
      tech: "Teknolojiler",
      procedures: "Tedaviler",
      booking: "Rezervasyon",
      about: "Hakkımızda",
      contact: "İletişim",
    },
    hero: {
      badge: "Lüks Otel Spa · Ölüdeniz, Türkiye",
      headline: "Deniz ile",
      headline2: "Güzelliğinizin Buluşması",
      sub: "Seçkin misafirler için özel premium güzellik ritüelleri. Rahatlayın, tazelenin, parılayın.",
      cta: "Rezervasyon Yap",
      scroll: "Keşfet",
    },
    tech: {
      title: "Teknolojilerimiz",
      sub: "Görünür ve kalıcı sonuçlar için son teknoloji ekipmanlar",
      devices: [],
    },
    procedures: {
      title: "Tedavilerimiz",
      sub: "Sağlığınız ve güzelliğiniz için dokuz imza deneyimi",
      bookBtn: "WhatsApp ile Rezervasyon",
      list: [],
    },
    about: {
      title: "Salonumuz",
      sub: "Cennetin kalbinde bir güzellik sığınağı",
      body1:
        "Türkiye'nin en prestijli kıyı tatil köylerinden birinde, turkuaz Ölüdeniz kıyılarında yer alıyoruz.",
      body2:
        "Sertifikalı uzman ekibimiz, Avrupa tekniğini sıcak Türk misafirperverliğiyle buluşturuyor.",
      body3:
        "İlk adımdan itibaren yasemin kokusu, denizin sesi ve özenli bakımımız sizi saracak.",
      stats: [
        { num: "2400+", label: "Mutlu Misafir" },
        { num: "9", label: "Tedavi" },
        { num: "4", label: "Uzman" },
        { num: "5★", label: "Puan" },
      ],
    },
    booking: {
      title: "Anınızı Ayırtın",
      sub: "WhatsApp üzerinden rezervasyon bir dakikadan az sürer",
      steps: [
        { num: "01", label: "Tedavinizi seçin" },
        { num: "02", label: "'WhatsApp ile Rezervasyon' düğmesine tıklayın" },
        { num: "03", label: "Ekibimizle tarih ve saati onaylayın" },
        { num: "04", label: "Gelin, rahatlayın ve parılayın" },
      ],
      directBtn: "WhatsApp'ı Aç",
      note: "Genellikle 15 dakika içinde yanıt veriyoruz · 9:00 – 21:00",
    },
    contact: {
      title: "Bizi Bulun",
      sub: "Otel wellness kanadında bulunuyoruz — cennetten ayrılmanıza gerek yok",
      address:
        "Blue Lagoon Luxury Resort, Wellness & Güzellik Merkezi, Ölüdeniz, Fethiye, Türkiye",
      hours: "Her gün 09:00 – 21:00",
      whatsapp: "WhatsApp'ta Yaz",
      scan: "Rezervasyon için Tara",
      scanNote: "Oteldeki arkadaşlarınızla paylaşın",
    },
    footer: {
      copy: "© 2025 Azure Beauty Salon · Blue Lagoon Luxury Resort",
      privacy: "Gizlilik Politikası",
    },
  },

  de: {
    nav: {
      home: "Startseite",
      tech: "Technologien",
      procedures: "Behandlungen",
      booking: "Buchen",
      about: "Über uns",
      contact: "Kontakt",
    },
    hero: {
      badge: "Luxus Hotel Spa · Ölüdeniz, Türkei",
      headline: "Wo das Meer Ihren",
      headline2: "Glanz erweckt",
      sub: "Premium-Beauty-Treatments für anspruchsvolle Reisende. Entspannen, erholen, strahlen.",
      cta: "Jetzt buchen",
      scroll: "Entdecken",
    },
    tech: {
      title: "Unsere Technologien",
      sub: "Modernste kosmetische Geräte für sichtbare, langanhaltende Ergebnisse",
      devices: [],
    },
    procedures: {
      title: "Unsere Behandlungen",
      sub: "Neun Signature-Erlebnisse für Ihr Wohlbefinden",
      bookBtn: "Via WhatsApp buchen",
      list: [],
    },
    about: {
      title: "Unser Salon",
      sub: "Ein Refugium der Schönheit inmitten des Paradieses",
      body1:
        "Direkt im prestigeträchtigsten Strandresort der Türkei, an den türkisblauen Ufern von Ölüdeniz.",
      body2:
        "Unser zertifiziertes Team verbindet europäische Technik mit herzlicher türkischer Gastfreundschaft.",
      body3:
        "Jasminduft, Meeresrauschen und unsere fürsorgliche Behandlung begleiten Sie von Anfang an.",
      stats: [
        { num: "2400+", label: "Gäste" },
        { num: "9", label: "Behandlungen" },
        { num: "4", label: "Experten" },
        { num: "5★", label: "Bewertung" },
      ],
    },
    booking: {
      title: "Ihren Moment reservieren",
      sub: "Buchung via WhatsApp in unter einer Minute",
      steps: [
        { num: "01", label: "Behandlung auswählen" },
        { num: "02", label: "'Via WhatsApp buchen' tippen" },
        { num: "03", label: "Datum mit unserem Team bestätigen" },
        { num: "04", label: "Kommen, entspannen, strahlen" },
      ],
      directBtn: "WhatsApp öffnen",
      note: "Antwort meist binnen 15 Minuten · 9:00 – 21:00",
    },
    contact: {
      title: "Uns finden",
      sub: "Wir befinden uns im Wellness-Flügel des Hotels",
      address:
        "Blue Lagoon Luxury Resort, Wellness & Beauty, Ölüdeniz, Fethiye, Türkei",
      hours: "Täglich 09:00 – 21:00",
      whatsapp: "WhatsApp schreiben",
      scan: "Zum Buchen scannen",
      scanNote: "Mit Freunden im Hotel teilen",
    },
    footer: {
      copy: "© 2025 Azure Beauty Salon · Blue Lagoon Luxury Resort",
      privacy: "Datenschutz",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      tech: "Technologies",
      procedures: "Soins",
      booking: "Réserver",
      about: "À propos",
      contact: "Contact",
    },
    hero: {
      badge: "Spa Hôtel de Luxe · Ölüdeniz, Turquie",
      headline: "Là où la mer révèle",
      headline2: "Votre éclat",
      sub: "Des soins beauté premium conçus pour les voyageurs exigeants. Détendez-vous, ressourcez-vous, rayonnez.",
      cta: "Réserver maintenant",
      scroll: "Découvrir",
    },
    tech: {
      title: "Nos technologies",
      sub: "Appareils cosmétiques de pointe pour des résultats visibles et durables",
      devices: [],
    },
    procedures: {
      title: "Nos soins",
      sub: "Neuf expériences signature pour sublimer votre bien-être",
      bookBtn: "Réserver via WhatsApp",
      list: [],
    },
    about: {
      title: "Notre salon",
      sub: "Un havre de beauté niché au cœur du paradis",
      body1:
        "Niché dans l'un des complexes balnéaires les plus prestigieux de Turquie, sur les rives turquoise d'Ölüdeniz.",
      body2:
        "Notre équipe de spécialistes certifiés allie technique européenne et chaleureuse hospitalité turque.",
      body3:
        "Dès votre arrivée, le parfum du jasmin, le bruit de la mer et nos soins attentionnés vous enveloppent.",
      stats: [
        { num: "2400+", label: "Clients satisfaits" },
        { num: "9", label: "Soins" },
        { num: "4", label: "Experts" },
        { num: "5★", label: "Note" },
      ],
    },
    booking: {
      title: "Réservez votre moment",
      sub: "La réservation via WhatsApp prend moins d'une minute",
      steps: [
        { num: "01", label: "Choisissez votre soin" },
        { num: "02", label: "Appuyez sur 'Réserver via WhatsApp'" },
        { num: "03", label: "Confirmez date et heure avec notre équipe" },
        { num: "04", label: "Venez, détendez-vous et rayonnez" },
      ],
      directBtn: "Ouvrir WhatsApp",
      note: "Réponse sous 15 minutes · 9h00 – 21h00",
    },
    contact: {
      title: "Nous trouver",
      sub: "Nous sommes dans l'aile bien-être de l'hôtel",
      address:
        "Blue Lagoon Luxury Resort, Centre Beauté & Bien-être, Ölüdeniz, Fethiye, Turquie",
      hours: "Tous les jours 09h00 – 21h00",
      whatsapp: "Écrire sur WhatsApp",
      scan: "Scanner pour réserver",
      scanNote: "Partagez avec vos amis à l'hôtel",
    },
    footer: {
      copy: "© 2025 Azure Beauty Salon · Blue Lagoon Luxury Resort",
      privacy: "Politique de confidentialité",
    },
  },
};

const WHATSAPP_NUMBER = "905551234567";
const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "EN",
  ru: "RU",
  tr: "TR",
  de: "DE",
  fr: "FR",
};

const MSG_TEMPLATES: Record<SupportedLocale, (p: string) => string> = {
  en: (p) =>
    `Hello! I would like to book *${p}* at Azure Beauty Salon. Please let me know available times.`,
  ru: (p) =>
    `Здравствуйте! Хочу записаться на *${p}* в Azure Beauty Salon. Подскажите доступные даты.`,
  tr: (p) =>
    `Merhaba! Azure Beauty Salon'da *${p}* için rezervasyon yapmak istiyorum.`,
  de: (p) =>
    `Hallo! Ich möchte *${p}* im Azure Beauty Salon buchen. Bitte teilen Sie mir verfügbare Termine mit.`,
  fr: (p) =>
    `Bonjour! Je souhaite réserver *${p}* à l'Azure Beauty Salon. Quelles dates sont disponibles?`,
};

function buildWaLink(procedure: string, lang: SupportedLocale): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MSG_TEMPLATES[lang](procedure))}`;
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useVisible(
  threshold = 0.1,
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref: any = useRef<HTMLDivElement>(null);
  // Start as true if JS is disabled / SSR — elements always shown
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver not supported, just show everything
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      {
        threshold,
        // Trigger slightly before element enters viewport — prevents
        // elements already in view on load from staying hidden
        rootMargin: "0px 0px -40px 0px",
      },
    );

    obs.observe(el);

    // Immediately check if element is already in viewport on mount
    // (handles page load when elements are already visible)
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight - 40 && rect.bottom > 0;
    if (inView) {
      setVisible(true);
      obs.disconnect();
      return;
    }

    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible];
}

function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

interface AnimSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

const AnimSection: FC<AnimSectionProps> = ({
  children,
  className = "",
  delay = 0,
  threshold,
}) => {
  const [ref, visible] = useVisible(threshold);
  return (
    <div
      ref={ref}
      className={`${styles.animSection} ${visible ? styles.animVisible : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

// SVG Icons
const WaIcon: FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CheckIcon: FC = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon: FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ClockIcon: FC = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const ChevronDown: FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const MenuIcon: FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-label="Open menu">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const XIcon: FC = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-label="Close menu">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── TECH CARD ────────────────────────────────────────────────────────────────

const DEVICE_ICONS = ["◈", "◉", "◎", "⬡"];

interface TechCardProps {
  device: DeviceT;
  idx: number;
}

const TechCard: FC<TechCardProps> = ({ device, idx }) => {
  const [ref, visible] = useVisible();
  return (
    <article
      ref={ref}
      className={`${styles.techCard} ${visible ? styles.animVisible : ""}`}
      style={{ transitionDelay: `${idx * 0.12}s` }}>
      <span className={styles.techCard__icon} aria-hidden="true">
        {DEVICE_ICONS[idx % 4]}
      </span>
      <h3 className={styles.techCard__title}>{device.name}</h3>
      <p className={styles.techCard__desc}>{device.desc}</p>
      <div className={styles.techCard__meta}>
        <span className={styles.techCard__metaLabel}>Benefits</span>
        <p className={styles.techCard__metaText}>{device.benefits}</p>
      </div>
      <div className={styles.techCard__meta}>
        <span className={styles.techCard__metaLabel}>Indications</span>
        <p className={styles.techCard__metaText}>{device.indications}</p>
      </div>
    </article>
  );
};

// ─── PROCEDURE CARD ───────────────────────────────────────────────────────────

const CARD_COLORS = [
  styles.cardColor0,
  styles.cardColor1,
  styles.cardColor2,
  styles.cardColor3,
  styles.cardColor4,
  styles.cardColor5,
  styles.cardColor6,
  styles.cardColor7,
  styles.cardColor8,
];

interface ProcedureCardProps {
  proc: ProcedureT;
  idx: number;
  lang: SupportedLocale;
  bookLabel: string;
}

const ProcedureCard: FC<ProcedureCardProps> = ({
  proc,
  idx,
  lang,
  bookLabel,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [ref, visible] = useVisible(0.1);
  const benefits = proc.benefits.split(" · ");

  return (
    <article
      ref={ref}
      className={`${styles.procCard} ${CARD_COLORS[idx % 9] ?? ""} ${visible ? styles.animVisible : ""}`}
      style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}>
      <div className={styles.procCard__body}>
        {/* Header row */}
        <div className={styles.procCard__header}>
          <h3 className={styles.procCard__title}>{proc.name}</h3>
          {proc.tag && <span className={styles.procCard__tag}>{proc.tag}</span>}
        </div>

        {/* Duration */}
        <div className={styles.procCard__duration}>
          <ClockIcon />
          <span>{proc.duration}</span>
        </div>

        {/* Description */}
        <p
          className={`${styles.procCard__desc} ${expanded ? styles.procCard__descExpanded : ""}`}>
          {proc.desc}
        </p>
        <button
          className={styles.procCard__toggle}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}>
          {expanded ? "▲ Less" : "▼ Read more"}
        </button>

        {/* Benefits */}
        <div className={styles.procCard__benefits}>
          <span className={styles.procCard__metaLabel}>Benefits</span>
          <div className={styles.procCard__benefitList}>
            {benefits.map((b) => (
              <span key={b} className={styles.procCard__benefitTag}>
                <CheckIcon />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Indications */}
        <div className={styles.procCard__indications}>
          <span className={styles.procCard__metaLabel}>Indications</span>
          <p className={styles.procCard__indicationsText}>{proc.indications}</p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className={styles.procCard__footer}>
        <span className={styles.procCard__price}>{proc.price}</span>
        <a
          href={buildWaLink(proc.name, lang)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btnWa}
          aria-label={`Book ${proc.name} via WhatsApp`}>
          <WaIcon />
          {bookLabel}
        </a>
      </div>
    </article>
  );
};

// ─── REVIEW CARD ─────────────────────────────────────────────────────────────

interface Review {
  name: string;
  country: string;
  text: string;
}

const REVIEWS: Review[] = [
  {
    name: "Sofia M.",
    country: "🇩🇪",
    text: "Absolutely incredible experience. The HIFU treatment was painless and the results are stunning. I felt so pampered!",
  },
  {
    name: "Irina K.",
    country: "🇷🇺",
    text: "Записалась на гидрафейшл и лазер. Результат превзошёл все ожидания. Персонал — высший класс!",
  },
  {
    name: "Emma L.",
    country: "🇬🇧",
    text: "The gold thread lift was phenomenal. Booking via WhatsApp took 2 minutes. Highly recommend to every hotel guest.",
  },
];

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────

const SalonPage: FC = () => {
  const [lang, setLang] = useState<SupportedLocale>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();

  const t = TRANSLATIONS[lang];
  // Fall back to English for locales that only have partial translations
  const devices = t.tech.devices.length
    ? t.tech.devices
    : TRANSLATIONS.en.tech.devices;
  const procedures = t.procedures.list.length
    ? t.procedures.list
    : TRANSLATIONS.en.procedures.list;

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navKeys = Object.keys(t.nav) as Array<keyof NavT>;

  return (
    <div className={styles.page}>
      {/* ── FLOATING WHATSAPP ── */}
      <a
        href={buildWaLink("a treatment", lang)}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.waFloat}
        aria-label="Contact us on WhatsApp">
        <WaIcon />
      </a>

      {/* ── NAVBAR ── */}
      <header
        className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
        <div className={styles.navbar__inner}>
          {/* Logo */}
          <button
            className={styles.logo}
            onClick={() => scrollTo("home")}
            aria-label="Go to home">
            <span
              className={`${styles.logo__name} ${scrolled ? styles.logo__nameDark : ""}`}>
              AZURE
            </span>
            <span
              className={`${styles.logo__sub} ${scrolled ? styles.logo__subDark : ""}`}>
              BEAUTY SALON
            </span>
          </button>

          {/* Desktop nav */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            {navKeys.map((k) => (
              <button
                key={k}
                className={`${styles.desktopNav__link} ${scrolled ? styles.desktopNav__linkDark : ""}`}
                onClick={() => scrollTo(k)}>
                {t.nav[k]}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className={styles.navbar__controls}>
            {/* Language switcher */}
            <div
              className={`${styles.langSwitcher} ${scrolled ? styles.langSwitcherDark : ""}`}
              role="group"
              aria-label="Language switcher">
              {(Object.keys(LOCALE_LABELS) as SupportedLocale[]).map((code) => (
                <button
                  key={code}
                  className={`${styles.langBtn} ${lang === code ? (scrolled ? styles.langBtnActiveDark : styles.langBtnActiveLight) : ""}`}
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  aria-label={`Switch to ${code}`}>
                  {LOCALE_LABELS[code]}
                </button>
              ))}
            </div>

            {/* Hamburger */}
            <button
              className={`${styles.menuToggle} ${scrolled ? styles.menuToggleDark : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}>
              {menuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className={styles.mobileMenu} aria-label="Mobile navigation">
            {navKeys.map((k) => (
              <button
                key={k}
                className={styles.mobileMenu__link}
                onClick={() => scrollTo(k)}>
                {t.nav[k]}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" className={styles.hero} aria-label="Hero">
        <div className={styles.hero__bg} aria-hidden="true">
          <span className={`${styles.hero__orb} ${styles.hero__orb1}`} />
          <span className={`${styles.hero__orb} ${styles.hero__orb2}`} />
          <span className={`${styles.hero__orb} ${styles.hero__orb3}`} />
        </div>
        <div className={styles.hero__sandOverlay} aria-hidden="true" />

        <div className={styles.hero__content}>
          <div className={styles.hero__badge}>{t.hero.badge}</div>
          <h1 className={styles.hero__headline}>
            {t.hero.headline}
            <br />
            <em>{t.hero.headline2}</em>
          </h1>
          <p className={styles.hero__sub}>{t.hero.sub}</p>
          <a
            href={buildWaLink("a treatment", lang)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLg} ${styles.hero__cta}`}>
            <WaIcon />
            {t.hero.cta}
          </a>
          <button
            className={styles.hero__scroll}
            onClick={() => scrollTo("tech")}
            aria-label="Scroll to technologies">
            <span className={styles.hero__scrollLabel}>{t.hero.scroll}</span>
            <span className={styles.hero__scrollChevron}>
              <ChevronDown />
            </span>
          </button>
        </div>

        <div className={styles.waveDivider} aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="var(--bg-primary)"
            />
          </svg>
        </div>
      </section>

      {/* ── TECHNOLOGIES ── */}
      <section id="tech" className={styles.section}>
        <div className={styles.container}>
          <AnimSection className={styles.sectionHead}>
            <span className={styles.sectionLine} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>{t.tech.title}</h2>
            <p className={styles.sectionSub}>{t.tech.sub}</p>
          </AnimSection>
          <div className={styles.techGrid}>
            {devices.map((d, i) => (
              <TechCard key={d.name} device={d} idx={i} />
            ))}
          </div>
        </div>
      </section>

      <div className={styles.divider} aria-hidden="true" />

      {/* ── PROCEDURES ── */}
      <section id="procedures" className={styles.section}>
        <div className={styles.container}>
          <AnimSection className={styles.sectionHead}>
            <span className={styles.sectionLine} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>{t.procedures.title}</h2>
            <p className={styles.sectionSub}>{t.procedures.sub}</p>
          </AnimSection>
          <div className={styles.procGrid}>
            {procedures.map((p, i) => (
              <ProcedureCard
                key={p.name}
                proc={p}
                idx={i}
                lang={lang}
                bookLabel={t.procedures.bookBtn}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FLOW ── */}
      <section
        id="booking"
        className={styles.bookingSection}
        aria-label="How to book">
        <div className={styles.bookingSection__dots} aria-hidden="true" />
        <div className={styles.container}>
          <AnimSection
            className={`${styles.sectionHead} ${styles.sectionHeadLight}`}>
            <span
              className={`${styles.sectionLine} ${styles.sectionLineLight}`}
              aria-hidden="true"
            />
            <h2
              className={`${styles.sectionTitle} ${styles.sectionTitleLight}`}>
              {t.booking.title}
            </h2>
            <p className={`${styles.sectionSub} ${styles.sectionSubLight}`}>
              {t.booking.sub}
            </p>
          </AnimSection>

          <div className={styles.stepsGrid}>
            {t.booking.steps.map((s, i) => (
              <AnimSection
                key={s.num}
                delay={i * 0.1}
                className={styles.stepCard}>
                <span className={styles.stepCard__num}>{s.num}</span>
                <p className={styles.stepCard__label}>{s.label}</p>
              </AnimSection>
            ))}
          </div>

          <AnimSection className={styles.bookingCta}>
            <a
              href={buildWaLink("a treatment", lang)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.btn} ${styles.btnWa} ${styles.btnLg}`}>
              <WaIcon />
              {t.booking.directBtn}
            </a>
            <p className={styles.bookingCta__note}>{t.booking.note}</p>
          </AnimSection>
        </div>

        <div className={styles.waveDivider} aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
              fill="var(--bg-primary)"
            />
          </svg>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <AnimSection>
              <span className={styles.sectionLine} aria-hidden="true" />
              <h2 className={styles.sectionTitle}>{t.about.title}</h2>
              <p className={styles.about__sub}>{t.about.sub}</p>
              <p className={styles.about__body}>{t.about.body1}</p>
              <p className={styles.about__body}>{t.about.body2}</p>
              <p
                className={`${styles.about__body} ${styles.about__bodyItalic}`}>
                {t.about.body3}
              </p>
            </AnimSection>

            <div className={styles.statsGrid}>
              {t.about.stats.map((s, i) => (
                <AnimSection key={s.label} delay={i * 0.1}>
                  <div
                    className={`${styles.statCard} ${i % 2 === 0 ? styles.statCardSand : styles.statCardTeal}`}>
                    <span className={styles.statCard__num}>{s.num}</span>
                    <span className={styles.statCard__label}>{s.label}</span>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <AnimSection className={styles.reviewsRow} aria-label="Guest reviews">
            {REVIEWS.map((r) => (
              <article key={r.name} className={styles.reviewCard}>
                <div className={styles.reviewCard__stars} aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <p className={styles.reviewCard__text}>{r.text}</p>
                <span className={styles.reviewCard__author}>
                  {r.country} {r.name}
                </span>
              </article>
            ))}
          </AnimSection>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.container}>
          <AnimSection className={styles.sectionHead}>
            <span className={styles.sectionLine} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>{t.contact.title}</h2>
            <p className={styles.sectionSub}>{t.contact.sub}</p>
          </AnimSection>

          <div className={styles.contactGrid}>
            {/* Address */}
            <AnimSection delay={0}>
              <div className={styles.contactCard}>
                <span className={styles.contactCard__icon} aria-hidden="true">
                  📍
                </span>
                <h3 className={styles.contactCard__title}>Location</h3>
                <p className={styles.contactCard__text}>{t.contact.address}</p>
                <p className={styles.contactCard__hours}>
                  🕐 {t.contact.hours}
                </p>
              </div>
            </AnimSection>

            {/* Map */}
            <AnimSection delay={0.1} className={styles.mapWrapper}>
              <iframe
                title="Salon location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12628.0!2d29.1167!3d36.5467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c21a28a44fc903%3A0x5f4a9aeb7dc1ead7!2sOludeniz%2C%20Fethiye!5e0!3m2!1sen!2str!4v1700000000"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </AnimSection>

            {/* WhatsApp + QR */}
            <AnimSection delay={0.2}>
              <div className={styles.contactCard}>
                <span className={styles.contactCard__icon} aria-hidden="true">
                  💬
                </span>
                <h3 className={styles.contactCard__title}>WhatsApp</h3>
                <a
                  href={buildWaLink("a treatment", lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnWa}`}>
                  <WaIcon />
                  {t.contact.whatsapp}
                </a>

                <div className={styles.qrRow}>
                  {/* Decorative QR placeholder — replace with real <Image> */}
                  <div
                    className={styles.qrBox}
                    aria-label="QR Code placeholder"
                  />
                  <div>
                    <p className={styles.qrRow__label}>{t.contact.scan}</p>
                    <p className={styles.qrRow__note}>{t.contact.scanNote}</p>
                  </div>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <span className={styles.footer__copy}>{t.footer.copy}</span>
        <button className={styles.footer__privacy}>{t.footer.privacy}</button>
      </footer>
    </div>
  );
};

export default SalonPage;
