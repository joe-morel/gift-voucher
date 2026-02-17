"use client"

import { Gift, Heart, Sparkles } from "lucide-react"
import type { DecodedGiftCard } from "@/lib/gift-card-config"

interface WelcomeScreenProps {
  config: DecodedGiftCard
  onReveal: () => void
}

export function WelcomeScreen({ config, onReveal }: WelcomeScreenProps) {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center px-4">
      {/* Icons row */}
      <div className="flex items-center gap-3 mb-8 animate-bounce">
        <Heart
          className="h-6 w-6"
          style={{ color: config.secondaryColor }}
        />
        <div
          className="h-16 w-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${config.primaryColor}15` }}
        >
          <Gift
            className="h-8 w-8"
            style={{ color: config.primaryColor }}
          />
        </div>
        <Sparkles
          className="h-6 w-6"
          style={{ color: config.secondaryColor }}
        />
      </div>

      {/* Greeting text */}
      <h1
        className="text-3xl sm:text-4xl font-bold text-center text-balance"
        style={{ color: config.primaryColor }}
      >
        Hola {config.recipientName}!
      </h1>

      <p className="text-muted-foreground text-center mt-3 text-lg max-w-sm text-pretty">
        {config.senders
          ? `${config.senders} te ha enviado algo muy especial...`
          : "Alguien te ha enviado algo muy especial..."}
      </p>

      {/* Reveal button */}
      <button
        onClick={onReveal}
        className="mt-10 px-10 py-4 rounded-2xl text-white font-semibold text-lg transition-all hover:opacity-90 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`,
          boxShadow: `0 8px 30px ${config.primaryColor}40`,
        }}
      >
        Ver mi regalo
      </button>

      {/* Subtle hint */}
      <p className="text-xs text-muted-foreground mt-6 animate-pulse">
        Toca el boton para descubrir tu sorpresa
      </p>
    </div>
  )
}
