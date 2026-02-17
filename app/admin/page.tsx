"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, ArrowLeft, LayoutGrid, FileEdit } from "lucide-react"
import { GiftCardForm } from "@/components/admin/gift-card-form"
import { GiftCardList } from "@/components/admin/gift-card-list"
import {
  type GiftCardConfig,
  createEmptyConfig,
} from "@/lib/gift-card-config"

const STORAGE_KEY = "giftcards_v2"

type View = "list" | "editor"

function loadCards(): GiftCardConfig[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCards(cards: GiftCardConfig[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards))
}

export default function AdminPage() {
  const [cards, setCards] = useState<GiftCardConfig[]>([])
  const [current, setCurrent] = useState<GiftCardConfig | null>(null)
  const [view, setView] = useState<View>("list")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCards(loadCards())
    setMounted(true)
  }, [])

  function handleNew() {
    const fresh = createEmptyConfig()
    setCurrent(fresh)
    setView("editor")
  }

  function handleSelect(card: GiftCardConfig) {
    setCurrent({ ...card })
    setView("editor")
  }

  function handleChange(updated: GiftCardConfig) {
    setCurrent(updated)
  }

  function handleSave(card: GiftCardConfig) {
    setCards((prev) => {
      const exists = prev.findIndex((c) => c.id === card.id)
      let next: GiftCardConfig[]
      if (exists >= 0) {
        next = [...prev]
        next[exists] = card
      } else {
        next = [...prev, card]
      }
      saveCards(next)
      return next
    })
  }

  function handleDelete(id: string) {
    setCards((prev) => {
      const next = prev.filter((c) => c.id !== id)
      saveCards(next)
      return next
    })
    if (current?.id === id) {
      setCurrent(null)
      setView("list")
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-svh bg-muted">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Volver al inicio"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="font-semibold text-foreground text-sm sm:text-base">
              Panel de Administracion
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {view === "editor" && (
              <button
                onClick={() => setView("list")}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer text-muted-foreground"
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Mis Gift Cards</span>
              </button>
            )}
            <button
              onClick={handleNew}
              className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nueva Gift Card</span>
              <span className="sm:hidden">Nueva</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {view === "list" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Mis Gift Cards
              </h2>
              <p className="text-sm text-muted-foreground">
                {cards.length}{" "}
                {cards.length === 1 ? "gift card creada" : "gift cards creadas"}
              </p>
            </div>
            <GiftCardList
              cards={cards}
              selectedId={current?.id ?? null}
              onSelect={handleSelect}
              onDelete={handleDelete}
            />
          </div>
        )}

        {view === "editor" && current && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <FileEdit className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">
                {cards.find((c) => c.id === current.id)
                  ? "Editar Gift Card"
                  : "Nueva Gift Card"}
              </h2>
            </div>
            <GiftCardForm
              config={current}
              onChange={handleChange}
              onSave={handleSave}
            />
          </div>
        )}
      </main>
    </div>
  )
}
