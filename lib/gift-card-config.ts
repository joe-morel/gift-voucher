// ============================================
// Gift Card Configuration - Types & Constants
// ============================================

export interface GiftCardOccasion {
  id: string
  name: string
  icon: string
  primaryColor: string
  secondaryColor: string
  bgColor: string
  defaultGreeting: string
  defaultMessage: string
}

export type LinkExpiration = "1h" | "24h" | "7d" | "never"

export const EXPIRATION_OPTIONS: { value: LinkExpiration; label: string }[] = [
  { value: "1h", label: "1 hora" },
  { value: "24h", label: "24 horas" },
  { value: "7d", label: "7 dias" },
  { value: "never", label: "Sin expiracion" },
]

function expirationToMs(exp: LinkExpiration): number | null {
  switch (exp) {
    case "1h": return 60 * 60 * 1000
    case "24h": return 24 * 60 * 60 * 1000
    case "7d": return 7 * 24 * 60 * 60 * 1000
    case "never": return null
  }
}

export function computeExpiresAt(exp: LinkExpiration): number | null {
  const ms = expirationToMs(exp)
  return ms ? Date.now() + ms : null
}

export function isExpired(expiresAt: number | null): boolean {
  if (expiresAt === null) return false
  return Date.now() > expiresAt
}

export function formatTimeRemaining(expiresAt: number | null): string | null {
  if (expiresAt === null) return null
  const diff = expiresAt - Date.now()
  if (diff <= 0) return "Expirado"
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return `${days} dia${days > 1 ? "s" : ""} restante${days > 1 ? "s" : ""}`
  }
  if (hours > 0) return `${hours}h ${minutes}m restantes`
  return `${minutes}m restantes`
}

export interface GiftCardConfig {
  id: string
  name: string
  recipientName: string
  currency: string
  amount: string
  senders: string
  message: string
  receiptUrl: string
  occasionId: string
  greeting: string
  primaryColor: string
  secondaryColor: string
  bgColor: string
  enableSound: boolean
  enableConfetti: boolean
  expiration: LinkExpiration
  createdAt: string
}

// ============================================
// Preset Occasions
// ============================================

export const OCCASIONS: GiftCardOccasion[] = [
  {
    id: "mothers-day",
    name: "Dia de las Madres",
    icon: "Heart",
    primaryColor: "#7c3aed",
    secondaryColor: "#e879f9",
    bgColor: "#faf5ff",
    defaultGreeting: "Feliz Dia de las Madres",
    defaultMessage:
      "Para que compres lo que quieras donde desees. Te lo mereces todo y mas.",
  },
  {
    id: "fathers-day",
    name: "Dia del Padre",
    icon: "Shield",
    primaryColor: "#1e40af",
    secondaryColor: "#60a5fa",
    bgColor: "#eff6ff",
    defaultGreeting: "Feliz Dia del Padre",
    defaultMessage:
      "Para que te des un gusto especial. Gracias por todo lo que haces.",
  },
  {
    id: "birthday",
    name: "Cumpleanos",
    icon: "Cake",
    primaryColor: "#ea580c",
    secondaryColor: "#fbbf24",
    bgColor: "#fff7ed",
    defaultGreeting: "Feliz Cumpleanos",
    defaultMessage:
      "Que este dia sea tan especial como tu. Disfruta tu regalo.",
  },
  {
    id: "christmas",
    name: "Navidad",
    icon: "TreePine",
    primaryColor: "#dc2626",
    secondaryColor: "#16a34a",
    bgColor: "#fef2f2",
    defaultGreeting: "Feliz Navidad",
    defaultMessage:
      "Que esta Navidad este llena de alegria y bendiciones para ti.",
  },
  {
    id: "valentines",
    name: "San Valentin",
    icon: "HeartHandshake",
    primaryColor: "#e11d48",
    secondaryColor: "#fb7185",
    bgColor: "#fff1f2",
    defaultGreeting: "Feliz San Valentin",
    defaultMessage: "Para la persona mas especial de mi vida. Te amo.",
  },
  {
    id: "anniversary",
    name: "Aniversario",
    icon: "Gem",
    primaryColor: "#b45309",
    secondaryColor: "#fbbf24",
    bgColor: "#fffbeb",
    defaultGreeting: "Feliz Aniversario",
    defaultMessage:
      "Celebrando un ano mas juntos. Gracias por cada momento.",
  },
  {
    id: "graduation",
    name: "Graduacion",
    icon: "GraduationCap",
    primaryColor: "#1d4ed8",
    secondaryColor: "#eab308",
    bgColor: "#eff6ff",
    defaultGreeting: "Felicidades Graduado/a",
    defaultMessage:
      "Tu esfuerzo ha dado frutos. Este regalo es para celebrar tu logro.",
  },
  {
    id: "general",
    name: "General",
    icon: "Gift",
    primaryColor: "#7c3aed",
    secondaryColor: "#a78bfa",
    bgColor: "#faf5ff",
    defaultGreeting: "Un regalo especial para ti",
    defaultMessage: "Porque te lo mereces. Disfruta este regalo.",
  },
]

export function getOccasionById(id: string): GiftCardOccasion {
  return (
    OCCASIONS.find((o) => o.id === id) ?? OCCASIONS[OCCASIONS.length - 1]
  )
}

// ============================================
// Encoding / Decoding for URL sharing
// ============================================

export function encodeGiftCardConfig(config: GiftCardConfig): string {
  const expiresAt = computeExpiresAt(config.expiration)
  const payload = {
    r: config.recipientName,
    c: config.currency,
    a: config.amount,
    s: config.senders,
    m: config.message,
    u: config.receiptUrl,
    o: config.occasionId,
    g: config.greeting,
    p: config.primaryColor,
    sc: config.secondaryColor,
    bg: config.bgColor,
    snd: config.enableSound ? 1 : 0,
    cf: config.enableConfetti ? 1 : 0,
    exp: expiresAt,
  }
  return encodeURIComponent(JSON.stringify(payload))
}

export interface DecodedGiftCard {
  recipientName: string
  currency: string
  amount: string
  senders: string
  message: string
  receiptUrl: string
  occasionId: string
  greeting: string
  primaryColor: string
  secondaryColor: string
  bgColor: string
  enableSound: boolean
  enableConfetti: boolean
  expiresAt: number | null
}

export function decodeGiftCardConfig(
  encoded: string
): DecodedGiftCard | null {
  try {
    const payload = JSON.parse(decodeURIComponent(encoded))
    return {
      recipientName: payload.r ?? "",
      currency: payload.c ?? "$",
      amount: payload.a ?? "0",
      senders: payload.s ?? "",
      message: payload.m ?? "",
      receiptUrl: payload.u ?? "",
      occasionId: payload.o ?? "general",
      greeting: payload.g ?? "",
      primaryColor: payload.p ?? "#7c3aed",
      secondaryColor: payload.sc ?? "#e879f9",
      bgColor: payload.bg ?? "#faf5ff",
      enableSound: payload.snd === 1,
      enableConfetti: payload.cf === 1,
      expiresAt: payload.exp ?? null,
    }
  } catch {
    return null
  }
}

// ============================================
// Default empty config for creating new cards
// ============================================

export function createEmptyConfig(): GiftCardConfig {
  return {
    id: crypto.randomUUID(),
    name: "",
    recipientName: "",
    currency: "$",
    amount: "",
    senders: "",
    message: "",
    receiptUrl: "",
    occasionId: "general",
    greeting: "",
    primaryColor: "#7c3aed",
    secondaryColor: "#a78bfa",
    bgColor: "#faf5ff",
    enableSound: true,
    enableConfetti: true,
    expiration: "1h",
    createdAt: new Date().toISOString(),
  }
}

// ============================================
// Generate shareable URL
// ============================================

export function generateShareUrl(
  config: GiftCardConfig,
  baseUrl: string
): string {
  const encoded = encodeGiftCardConfig(config)
  return `${baseUrl}/gift?config=${encoded}`
}

// ============================================
// Generate WhatsApp share URL
// ============================================

export function generateWhatsAppUrl(
  config: GiftCardConfig,
  baseUrl: string
): string {
  const giftUrl = generateShareUrl(config, baseUrl)
  const text = `Hola ${config.recipientName}! Tienes un regalo especial esperandote. Abre este enlace para verlo: ${giftUrl}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
