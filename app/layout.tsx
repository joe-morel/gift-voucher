import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "GiftVoucher - Crea gift cards virtuales personalizadas",
    template: "%s | GiftVoucher",
  },
  description:
    "Crea gift cards virtuales personalizadas con comprobante de transferencia. Comparte por WhatsApp con confetis y sorpresa. Gratis y open source.",
  openGraph: {
    title: "GiftVoucher - Crea gift cards virtuales personalizadas",
    description:
      "Personaliza tu voucher, adjunta tu comprobante de transferencia y comparte el enlace por WhatsApp. Gratis y sin registro.",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    title: "GiftVoucher - Crea gift cards virtuales personalizadas",
    description:
      "Personaliza tu voucher, adjunta tu comprobante y comparte por WhatsApp.",
  },
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
        >
          Saltar al contenido principal
        </a>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
