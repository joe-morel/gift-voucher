"use client"

import {
  Heart,
  Shield,
  Cake,
  TreePine,
  HeartHandshake,
  Gem,
  GraduationCap,
  Gift,
} from "lucide-react"
import { OCCASIONS, type GiftCardOccasion } from "@/lib/gift-card-config"

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Shield,
  Cake,
  TreePine,
  HeartHandshake,
  Gem,
  GraduationCap,
  Gift,
}

interface OccasionSelectorProps {
  selectedId: string
  onSelect: (occasion: GiftCardOccasion) => void
}

export function OccasionSelector({
  selectedId,
  onSelect,
}: OccasionSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {OCCASIONS.map((occasion) => {
        const Icon = ICON_MAP[occasion.icon] ?? Gift
        const isSelected = selectedId === occasion.id
        return (
          <button
            key={occasion.id}
            onClick={() => onSelect(occasion)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer ${
              isSelected
                ? "border-current shadow-md scale-[1.02]"
                : "border-border hover:border-muted-foreground/30 hover:shadow-sm"
            }`}
            style={
              isSelected
                ? {
                    borderColor: occasion.primaryColor,
                    backgroundColor: `${occasion.primaryColor}08`,
                    color: occasion.primaryColor,
                  }
                : undefined
            }
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: isSelected
                  ? `${occasion.primaryColor}15`
                  : "hsl(var(--muted))",
              }}
            >
              <Icon
                className="h-5 w-5"
                style={{
                  color: isSelected
                    ? occasion.primaryColor
                    : "hsl(var(--muted-foreground))",
                }}
              />
            </div>
            <span
              className={`text-xs font-medium text-center leading-tight ${
                isSelected ? "" : "text-muted-foreground"
              }`}
            >
              {occasion.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}
