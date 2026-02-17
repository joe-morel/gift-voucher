import Link from "next/link"
import {
  Gift,
  Sparkles,
  Share2,
  Palette,
  PartyPopper,
  ArrowRight,
  Heart,
  Cake,
  TreePine,
  GraduationCap,
} from "lucide-react"
import { Voucher } from "@/components/gift-card/voucher"

const DEMO_CONFIG = {
  recipientName: "MARIA GARCIA",
  currency: "RD$",
  amount: "5,000.00",
  senders: "Tu familia",
  message: "Para que compres lo que quieras donde desees.",
  receiptUrl: "",
  occasionId: "mothers-day",
  greeting: "Feliz Dia de las Madres",
  primaryColor: "#7c3aed",
  secondaryColor: "#e879f9",
  bgColor: "#faf5ff",
  enableSound: true,
  enableConfetti: true,
}

const FEATURES = [
  {
    icon: Palette,
    title: "Personalizable",
    description:
      "Elige colores, mensajes y montos. Cada gift card es unica.",
  },
  {
    icon: PartyPopper,
    title: "Confetis y Sonido",
    description:
      "Efecto sorpresa con confetis y melodia al revelar el regalo.",
  },
  {
    icon: Share2,
    title: "Comparte por WhatsApp",
    description:
      "Genera un enlace y envialo directamente por WhatsApp.",
  },
  {
    icon: Sparkles,
    title: "Multiples Ocasiones",
    description:
      "Dia de las Madres, cumpleanos, Navidad, graduacion y mas.",
  },
]

const OCCASIONS_PREVIEW = [
  { icon: Heart, label: "Dia de las Madres", color: "#7c3aed" },
  { icon: Cake, label: "Cumpleanos", color: "#ea580c" },
  { icon: TreePine, label: "Navidad", color: "#dc2626" },
  { icon: GraduationCap, label: "Graduacion", color: "#1d4ed8" },
]

export default function LandingPage() {
  return (
    <div className="min-h-svh bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-foreground" />
            <span className="font-semibold text-foreground text-sm">
              GiftVoucher
            </span>
          </div>
          <Link
            href="/admin"
            className="text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            Crear Gift Card
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight text-balance">
                Crea gift cards virtuales y sorprende a quien mas quieres
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 text-pretty">
                Personaliza tu voucher, adjunta tu comprobante de transferencia
                y comparte el enlace por WhatsApp. Gratis y sin registro.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Crear mi Gift Card
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Demo voucher */}
            <div className="w-full max-w-sm lg:max-w-[380px] shrink-0">
              <div className="rounded-2xl bg-muted p-6">
                <Voucher config={DEMO_CONFIG} voucherNumber="0000000" />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10 text-balance">
              Todo lo que necesitas para regalar de forma especial
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-background rounded-xl p-5 border"
                >
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center mb-3">
                    <feature.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Occasions */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3 text-balance">
              Para cualquier ocasion
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto text-pretty">
              Presets de colores y mensajes para cada celebracion. Personaliza todo a tu gusto.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {OCCASIONS_PREVIEW.map((o) => (
                <div
                  key={o.label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full border"
                >
                  <o.icon className="h-4 w-4" style={{ color: o.color }} />
                  <span className="text-sm font-medium text-foreground">
                    {o.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-muted px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10 text-balance">
              Como funciona
            </h2>
            <div className="flex flex-col gap-6">
              {[
                {
                  step: "1",
                  title: "Configura tu gift card",
                  description:
                    "Elige la ocasion, escribe el nombre del destinatario, monto, moneda y un mensaje personalizado.",
                },
                {
                  step: "2",
                  title: "Adjunta tu comprobante",
                  description:
                    "Sube la imagen de tu transferencia bancaria para que el destinatario pueda verificar el pago.",
                },
                {
                  step: "3",
                  title: "Comparte el enlace",
                  description:
                    "Copia el enlace generado y envialo por WhatsApp. El destinatario vera una experiencia con confetis y sorpresa.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 bg-background rounded-xl p-5 border"
                >
                  <div className="h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-md mx-auto text-center">
            <Gift className="h-10 w-10 text-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3 text-balance">
              Listo para sorprender?
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Crea tu primera gift card en menos de un minuto. Es gratis.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Comenzar ahora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gift className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              GiftVoucher &mdash; Codigo abierto
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Hecho con Next.js, Tailwind CSS y shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  )
}
