"use client"

import { Gift } from "lucide-react"
import type { DecodedGiftCard } from "@/lib/gift-card-config"

interface VoucherProps {
  config: DecodedGiftCard
  voucherNumber?: string
  onViewReceipt?: () => void
  animate?: boolean
}

export function Voucher({
  config,
  voucherNumber,
  onViewReceipt,
  animate = false,
}: VoucherProps) {
  return (
    <div
      className={`w-full max-w-md mx-auto transition-all duration-700 ${animate ? "opacity-100 translate-y-0 scale-100" : ""}`}
    >
      <div
        className="rounded-2xl shadow-lg overflow-hidden"
        style={{ backgroundColor: config.bgColor }}
      >
        {/* Dashed inner border wrapper */}
        <div className="m-3 rounded-xl border-2 border-dashed border-gray-300 bg-white overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-2">
            <h2
              className="text-2xl font-bold italic"
              style={{ color: config.primaryColor }}
            >
              Gift Voucher
            </h2>
            <Gift
              className="h-6 w-6"
              style={{ color: config.primaryColor }}
            />
          </div>

          {/* Recipient */}
          <div className="text-center px-6 py-3">
            <p className="text-xl font-bold tracking-wide text-foreground">
              {config.recipientName || "DESTINATARIO"}
            </p>
            <p
              className="text-sm italic mt-1"
              style={{ color: config.secondaryColor }}
            >
              {config.greeting || "Un regalo especial para ti"}
            </p>
          </div>

          {/* Divider */}
          <div className="mx-6">
            <div className="border-t border-gray-200" />
          </div>

          {/* Amount */}
          <div className="text-center py-4">
            <p
              className="text-xl font-semibold"
              style={{ color: config.primaryColor }}
            >
              Monto: {config.currency}{" "}
              {config.amount || "0.00"}
            </p>
          </div>

          {/* Message */}
          {config.message && (
            <div className="mx-6 mb-3">
              <div
                className="rounded-lg px-4 py-3 text-center"
                style={{
                  backgroundColor: `${config.primaryColor}10`,
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: config.primaryColor }}
                >
                  {config.message}
                </p>
              </div>
            </div>
          )}

          {/* Sender */}
          <div className="px-6 pb-2">
            <p className="text-sm text-muted-foreground">
              De:{" "}
              <span className="font-medium text-foreground">
                {config.senders || "Remitente"}
              </span>
            </p>
          </div>

          {/* View receipt button */}
          {onViewReceipt && (
            <div className="px-6 pb-4 pt-2">
              <button
                onClick={onViewReceipt}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`,
                }}
              >
                Ver comprobante
              </button>
            </div>
          )}

          {/* Voucher number */}
          {voucherNumber && (
            <div className="px-6 pb-4">
              <p className="text-xs text-muted-foreground text-center font-mono">
                No. {voucherNumber}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
