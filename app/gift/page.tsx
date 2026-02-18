"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Gift, AlertCircle, Clock } from "lucide-react"
import { decodeGiftCardConfig, isExpired, formatTimeRemaining, type DecodedGiftCard } from "@/lib/gift-card-config"
import { playCelebrationSound } from "@/lib/celebration-sounds"
import { Voucher } from "@/components/gift-card/voucher"
import { WelcomeScreen } from "@/components/gift-card/welcome-screen"
import { ReceiptModal } from "@/components/gift-card/receipt-modal"
import { ConfettiEffect } from "@/components/gift-card/confetti-effect"

function GiftCardViewer() {
  const searchParams = useSearchParams()
  const [config, setConfig] = useState<DecodedGiftCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [expired, setExpired] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [confettiActive, setConfettiActive] = useState(false)
  const voucherRef = useRef<HTMLDivElement>(null)
  const voucherNumberRef = useRef(
    Math.floor(Math.random() * 9000000 + 1000000).toString()
  )

  useEffect(() => {
    const param = searchParams.get("config")
    if (!param) {
      setError(true)
      setLoading(false)
      return
    }
    const decoded = decodeGiftCardConfig(param)
    if (!decoded) {
      setError(true)
      setLoading(false)
      return
    }
    if (isExpired(decoded.expiresAt)) {
      setExpired(true)
      setLoading(false)
      return
    }
    setConfig(decoded)
    setTimeLeft(formatTimeRemaining(decoded.expiresAt))
    setLoading(false)
  }, [searchParams])

  // Live countdown for expirable links
  useEffect(() => {
    if (!config?.expiresAt) return
    const interval = setInterval(() => {
      if (isExpired(config.expiresAt)) {
        setExpired(true)
        clearInterval(interval)
        return
      }
      setTimeLeft(formatTimeRemaining(config.expiresAt))
    }, 30000) // update every 30 seconds
    return () => clearInterval(interval)
  }, [config])

  function handleReveal() {
    setRevealed(true)
    if (config?.enableConfetti) {
      setConfettiActive(true)
    }
    if (config?.enableSound) {
      playCelebrationSound()
    }
    setTimeout(() => voucherRef.current?.focus(), 100)
  }

  // Loading state (prevents flash of error screen)
  if (loading) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-muted">
        <div className="text-center">
          <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-3 animate-pulse" />
          <p className="text-sm text-muted-foreground">
            Cargando tu regalo...
          </p>
        </div>
      </div>
    )
  }

  // Expired state
  if (expired) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-muted px-4">
        <div className="bg-background rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <h1 className="text-lg font-bold text-foreground mb-2">
            Este enlace ha expirado
          </h1>
          <p className="text-sm text-muted-foreground">
            La gift card ya no esta disponible. Pide al remitente que te envie un nuevo enlace.
          </p>
        </div>
      </div>
    )
  }

  // Error / not found state
  if (error || !config) {
    return (
      <div className="min-h-svh flex items-center justify-center bg-muted px-4">
        <div className="bg-background rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <h1 className="text-lg font-bold text-foreground mb-2">
            Gift card no encontrada
          </h1>
          <p className="text-sm text-muted-foreground">
            El enlace parece estar incorrecto o la gift card ya no esta disponible.
          </p>
        </div>
      </div>
    )
  }

  // Welcome screen (pre-reveal)
  if (!revealed) {
    return (
      <div
        style={{
          background: `linear-gradient(160deg, ${config.primaryColor}12, ${config.bgColor}, ${config.secondaryColor}12)`,
        }}
      >
        <WelcomeScreen config={config} onReveal={handleReveal} />
      </div>
    )
  }

  return (
    <div
      className="min-h-svh flex flex-col items-center justify-center px-4 py-10 relative"
      style={{ backgroundColor: "#f4f4f5" }}
    >
      <ConfettiEffect
        active={confettiActive}
        colors={[
          config.primaryColor,
          config.secondaryColor,
          "#fbbf24",
          "#34d399",
          "#f472b6",
          "#a78bfa",
        ]}
      />

      {/* Voucher card */}
      <div ref={voucherRef} tabIndex={-1} aria-live="polite" className="w-full max-w-md animate-in slide-in-from-bottom-6 fade-in duration-700 outline-none">
        <Voucher
          config={config}
          voucherNumber={voucherNumberRef.current}
          onViewReceipt={
            config.receiptUrl ? () => setShowReceipt(true) : undefined
          }
          animate
        />
      </div>

      {/* Footer message */}
      <div className="mt-6 animate-in fade-in duration-1000 delay-500 space-y-2">
        <p className="text-sm text-muted-foreground text-center">
          Hecho con todo nuestro amor, {config.senders}
        </p>
        {timeLeft && (
          <p className="text-xs text-muted-foreground/60 text-center flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" />
            {timeLeft}
          </p>
        )}
      </div>

      {/* Receipt modal */}
      <ReceiptModal
        receiptUrl={config.receiptUrl}
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
      />
    </div>
  )
}

export default function GiftPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-svh flex items-center justify-center bg-muted">
          <div className="text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-3 animate-pulse" />
            <p className="text-sm text-muted-foreground">
              Cargando tu regalo...
            </p>
          </div>
        </div>
      }
    >
      <GiftCardViewer />
    </Suspense>
  )
}
