"use client"

import { useEffect, useRef } from "react"
import { X, ExternalLink } from "lucide-react"
import Image from "next/image"

interface ReceiptModalProps {
  receiptUrl: string
  open: boolean
  onClose: () => void
}

export function ReceiptModal({ receiptUrl, open, onClose }: ReceiptModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 id="receipt-title" className="font-semibold text-foreground">
            Comprobante de Transferencia
          </h3>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Image */}
        <div className="overflow-y-auto max-h-[65vh] p-4">
          {receiptUrl ? (
            <Image
              src={receiptUrl}
              alt="Comprobante de transferencia bancaria"
              width={400}
              height={700}
              className="w-full h-auto rounded-lg"
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                No hay comprobante disponible
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {receiptUrl && (
          <div className="p-4 border-t">
            <a
              href={receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-muted text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Ver imagen completa
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
