export type ChannelId = "phone" | "whatsapp" | "website" | "team";

export interface Channel {
  id: ChannelId;
  index: string;
  name: string;
  label: string;
  promise: string;
  detail: string;
}

export interface Industry {
  slug: string;
  index: string;
  name: string;
  eyebrow: string;
  problem: string;
  workflow: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface PackagePreview {
  name: string;
  price: string;
  setup: string;
  summary: string;
  features: string[];
  featured?: boolean;
  qualifier: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  status: "planned" | "live";
}

export const homeContent = {
  navigation: [
    { label: "Lösungen", href: "/loesungen", status: "live" },
    { label: "Branchen", href: "/branchen", status: "live" },
    { label: "Preise", href: "/preise", status: "live" },
  ] satisfies NavigationItem[],
  hero: {
    eyebrow: "KI-Agenten für lokale Betriebe",
    title: "Ein Agent. Jeder Kanal. Keine Anfrage verloren.",
    body: "Telefon, WhatsApp, Website und Team-App greifen auf dasselbe Wissen, dieselben Werkzeuge und dieselben Regeln zu.",
    actions: [
      { label: "Demo starten", href: "#contact", kind: "primary" },
      { label: "System entdecken", href: "#channels", kind: "secondary" },
    ] as const,
  },
  channels: [
    {
      id: "phone",
      index: "01",
      name: "Telefon",
      label: "Voice",
      promise: "Nimmt ab, wenn das Team gerade nicht kann.",
      detail: "Buchen, ändern, Fragen beantworten oder gezielt an einen Menschen übergeben.",
    },
    {
      id: "whatsapp",
      index: "02",
      name: "WhatsApp",
      label: "Business API",
      promise: "Strukturierte Antworten statt offener Chats.",
      detail: "Termine, Erinnerungen, Bilder und Freigaben in einem vertrauten Kanal.",
    },
    {
      id: "website",
      index: "03",
      name: "Website-Chat",
      label: "Web",
      promise: "Vom Seitenbesuch direkt zur nächsten Aktion.",
      detail: "Beratung, Leads und Buchungen, ohne Besucher in ein Kontaktformular zu verlieren.",
    },
    {
      id: "team",
      index: "04",
      name: "Team-App",
      label: "Intern",
      promise: "Der gleiche Agent arbeitet auch nach innen.",
      detail: "Aufgaben, Rückrufe, Freigaben und tägliche Abläufe für das Team.",
    },
  ] satisfies Channel[],
  industries: [
    {
      slug: "gastronomie",
      index: "01",
      name: "Gastronomie",
      eyebrow: "Restaurant · Café · Bar",
      problem: "Das Telefon klingelt genau dann, wenn alle Hände am Pass sind.",
      workflow: "Reservierungen live abgleichen, ändern und bestätigen.",
    },
    {
      slug: "beauty-pflege",
      index: "02",
      name: "Beauty & Pflege",
      eyebrow: "Salon · Barber · Studio",
      problem: "Wer gerade behandelt, kann keinen Anruf annehmen.",
      workflow: "Termine, Warteliste und kurzfristig freie Slots orchestrieren.",
    },
    {
      slug: "gesundheit",
      index: "03",
      name: "Gesundheit",
      eyebrow: "Praxis · Physio · Empfang",
      problem: "Montagmorgen ist die Leitung dicht und das Team am Limit.",
      workflow: "Anliegen erfassen, sortieren und sicher weiterleiten.",
    },
    {
      slug: "handwerk",
      index: "04",
      name: "Handwerk",
      eyebrow: "SHK · Elektro · Dach",
      problem: "Auf der Baustelle landet jede Anfrage in der Mailbox.",
      workflow: "Einsatzgebiet, Dringlichkeit und Auftragsgröße vorqualifizieren.",
    },
    {
      slug: "automotive",
      index: "05",
      name: "Automotive",
      eyebrow: "Werkstatt · Reifenservice",
      problem: "Saisonspitzen legen das Telefon vollständig lahm.",
      workflow: "Termine buchen, Status melden und Freigaben einholen.",
    },
    {
      slug: "immobilien",
      index: "06",
      name: "Immobilien",
      eyebrow: "Makler · Hausverwaltung",
      problem: "Hunderte Anfragen treffen auf wenige passende Termine.",
      workflow: "Interessenten qualifizieren und Besichtigungen koordinieren.",
    },
    {
      slug: "sport-freizeit",
      index: "07",
      name: "Sport & Freizeit",
      eyebrow: "Fitness · Yoga · Kampfsport",
      problem: "Probetrainings kommen, wenn der Vertrieb nicht arbeitet.",
      workflow: "Sofort antworten, Probetraining buchen und erinnern.",
    },
    {
      slug: "beherbergung",
      index: "08",
      name: "Beherbergung",
      eyebrow: "Hotel · Pension · Ferienwohnung",
      problem: "Gäste fragen rund um die Uhr und in mehreren Sprachen.",
      workflow: "Verfügbarkeit, Check-in und Gästefragen jederzeit abdecken.",
    },
  ] satisfies Industry[],
  capabilities: [
    {
      index: "01",
      title: "Werkzeuge statt Antworten",
      body: "Der Agent bucht, ändert, sammelt Daten und legt Aufgaben an - innerhalb klarer Grenzen.",
    },
    {
      index: "02",
      title: "Ein System als Wahrheit",
      body: "Kalender, Kasse oder CRM bleiben führend. Der Agent arbeitet direkt mit dem bestehenden Betriebssystem.",
    },
    {
      index: "03",
      title: "Mensch bleibt im Loop",
      body: "Was unklar, kritisch oder nicht erlaubt ist, geht mit Kontext an das Team.",
    },
  ],
  roi: [
    {
      value: "24/7",
      label: "erreichbar",
      qualifier: "Technische Verfügbarkeit; Übergaben und Systemgrenzen bleiben bestehen.",
    },
    {
      value: "4",
      label: "Kanäle, ein Agent",
      qualifier: "Telefon, WhatsApp, Website-Chat und interne Team-App.",
    },
    {
      value: "30",
      label: "Tage Pilot",
      qualifier: "Beispiel aus dem vorgeschlagenen Verkaufsprozess.",
    },
  ],
  process: [
    { index: "01", title: "Bedarf", description: "Kanäle, Volumen, Systeme und rote Linien klären." },
    { index: "02", title: "Live-Demo", description: "Echte Fälle am Telefon und im Chat erlebbar machen." },
    { index: "03", title: "Pilot", description: "30 Tage mit klaren Messgrößen und echten Übergaben." },
    { index: "04", title: "Integration", description: "Kalender, Kasse oder CRM kontrolliert anbinden." },
    { index: "05", title: "Go-live", description: "Testfälle, Datenschutz, Team und Notfallplan prüfen." },
  ] satisfies ProcessStep[],
  packages: [
    {
      name: "Starter",
      price: "149 €",
      setup: "Einrichtung 490 €",
      summary: "Ein Kanal für den stärksten Engpass.",
      features: ["1 Kanal", "FAQ & Wissen", "Anfragen ans Team", "bis 300 Min./Monat"],
      qualifier: "Preisvorschlag aus der Vorlage; Konditionen werden individuell geprüft.",
    },
    {
      name: "Pro",
      price: "299 €",
      setup: "Einrichtung 1.290 €",
      summary: "Das vollständige System für Kundenkommunikation.",
      features: ["Telefon + WhatsApp + Web", "Direkte Buchung", "Erinnerungen & Warteliste", "bis 800 Min./Monat"],
      featured: true,
      qualifier: "Empfohlenes Beispielpaket; Konditionen werden individuell geprüft.",
    },
    {
      name: "Premium",
      price: "ab 499 €",
      setup: "Einrichtung ab 2.490 €",
      summary: "Mehrere Standorte und maßgeschneiderte Abläufe.",
      features: ["Alles aus Pro", "Team-App", "Sonderintegrationen", "Priorisierter Support"],
      qualifier: "Preisvorschlag aus der Vorlage; Umfang und Kosten werden individuell geprüft.",
    },
  ] satisfies PackagePreview[],
} as const;
