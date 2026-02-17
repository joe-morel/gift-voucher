"use client"

import { Pencil, Trash2, Copy, Share2 } from "lucide-react"
import { toast } from "sonner"
import {
  type GiftCardConfig,
  getOccasionById,
  generateShareUrl,
  generateWhatsAppUrl,
} from "@/lib/gift-card-config"

interface GiftCardListProps {
  cards: GiftCardConfig[]
  selectedId: string | null
  onSelect: (card: GiftCardConfig) => void
  onDelete: (id: string) => void
}

export function GiftCardList({
  cards,
  selectedId,
  onSelect,
  onDelete,
}: GiftCardListProps) {
  function handleCopy(card: GiftCardConfig) {
    const url = generateShareUrl(card, window.location.origin)
    navigator.clipboard.writeText(url)
    toast.success("Enlace copiado")
  }

  function handleWhatsApp(card: GiftCardConfig) {
    const url = generateWhatsAppUrl(card, window.location.origin)
    window.open(url, "_blank")
  }

  function handleDelete(id: string) {
    onDelete(id)
    toast.success("Gift card eliminada")
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-sm">
          No tienes gift cards creadas aun.
        </p>
        <p className="text-muted-foreground text-xs mt-1">
          Haz clic en &quot;Nueva Gift Card&quot; para crear una.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const occasion = getOccasionById(card.occasionId)
        const isSelected = selectedId === card.id
        return (
          <div
            key={card.id}
            className={`rounded-xl border-2 p-4 transition-all ${
              isSelected
                ? "border-foreground shadow-md"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            {/* Color indicator bar */}
            <div
              className="h-2 rounded-full mb-3"
              style={{
                background: `linear-gradient(90deg, ${card.primaryColor}, ${card.secondaryColor})`,
              }}
            />

            {/* Card info */}
            <p className="font-semibold text-foreground text-sm truncate">
              {card.name || card.recipientName || "Sin nombre"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {occasion.name} &middot; {card.currency} {card.amount}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Para: {card.recipientName || "---"}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
              <button
                onClick={() => onSelect(card)}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer font-medium"
              >
                <Pencil className="h-3 w-3" />
                Editar
              </button>
              <button
                onClick={() => handleCopy(card)}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                title="Copiar enlace"
              >
                <Copy className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleWhatsApp(card)}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                title="Enviar por WhatsApp"
              >
                <Share2 className="h-3 w-3" />
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors cursor-pointer ml-auto"
                title="Eliminar"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
