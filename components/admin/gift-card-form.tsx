"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Copy, Share2, Eye, Save } from "lucide-react";
import { toast } from "sonner";
import { OccasionSelector } from "./occasion-selector";
import { Voucher } from "@/components/gift-card/voucher";
import {
  type GiftCardConfig,
  type GiftCardOccasion,
  type LinkExpiration,
  EXPIRATION_OPTIONS,
  getOccasionById,
  generateShareUrl,
  generateWhatsAppUrl,
} from "@/lib/gift-card-config";

interface GiftCardFormProps {
  config: GiftCardConfig;
  onChange: (config: GiftCardConfig) => void;
  onSave: (config: GiftCardConfig) => void;
}

export function GiftCardForm({ config, onChange, onSave }: GiftCardFormProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(generateShareUrl(config, window.location.origin));
    }
  }, [config]);

  function updateField<K extends keyof GiftCardConfig>(
    key: K,
    value: GiftCardConfig[K],
  ) {
    onChange({ ...config, [key]: value });
  }

  function handleOccasionSelect(occasion: GiftCardOccasion) {
    onChange({
      ...config,
      occasionId: occasion.id,
      primaryColor: occasion.primaryColor,
      secondaryColor: occasion.secondaryColor,
      bgColor: occasion.bgColor,
      greeting: occasion.defaultGreeting,
      message: config.message || occasion.defaultMessage,
    });
  }

  function handleCopyLink() {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Enlace copiado al portapapeles");
  }

  function handleWhatsApp() {
    const url = generateWhatsAppUrl(config, window.location.origin);
    window.open(url, "_blank");
  }

  function handleSave() {
    if (!config.recipientName.trim()) {
      toast.error("El nombre del destinatario es obligatorio");
      return;
    }
    if (!config.amount.trim() || config.amount === "0") {
      toast.error("El monto es obligatorio");
      return;
    }
    onSave(config);
    toast.success("Gift card guardada correctamente");
  }

  const previewConfig = {
    recipientName: config.recipientName,
    currency: config.currency,
    amount: config.amount,
    senders: config.senders,
    message: config.message,
    receiptUrl: config.receiptUrl,
    occasionId: config.occasionId,
    greeting: config.greeting,
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
    bgColor: config.bgColor,
    enableSound: config.enableSound,
    enableConfetti: config.enableConfetti,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form */}
      <div className="flex-1 space-y-8">
        {/* Occasion */}
        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Ocasion
          </h3>
          <OccasionSelector
            selectedId={config.occasionId}
            onSelect={handleOccasionSelect}
          />
        </section>

        {/* General info */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Informacion General
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la gift card</Label>
              <Input
                id="name"
                placeholder="Ej: Regalo de Cumpleaños"
                value={config.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipient">Nombre del destinatario *</Label>
              <Input
                id="recipient"
                placeholder="Ej: Carolina Lorem Ipsum"
                value={config.recipientName}
                onChange={(e) => updateField("recipientName", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Moneda</Label>
              <Input
                id="currency"
                placeholder="RD$"
                value={config.currency}
                onChange={(e) => updateField("currency", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Monto *</Label>
              <Input
                id="amount"
                placeholder="3,000.00"
                value={config.amount}
                onChange={(e) => updateField("amount", e.target.value)}
              />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="senders">Remitente(s)</Label>
              <Input
                id="senders"
                placeholder="Ej: Jose Perez, Maria Gomez"
                value={config.senders}
                onChange={(e) => updateField("senders", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="greeting">Saludo</Label>
            <Input
              id="greeting"
              placeholder={getOccasionById(config.occasionId).defaultGreeting}
              value={config.greeting}
              onChange={(e) => updateField("greeting", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensaje personalizado</Label>
            <Textarea
              id="message"
              placeholder="Escribe un mensaje especial..."
              rows={3}
              value={config.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </div>
        </section>

        {/* Receipt */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Comprobante
          </h3>
          <div className="space-y-2">
            <Label htmlFor="receipt">URL de la imagen del comprobante</Label>
            <Input
              id="receipt"
              placeholder="https://ejemplo.com/comprobante.jpg"
              value={config.receiptUrl}
              onChange={(e) => updateField("receiptUrl", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Sube tu comprobante a Google Drive (publico) o cualquier servicio
              de hosting de imagenes.
            </p>
          </div>
        </section>

        {/* Colors */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Colores
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary">Primario</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="primary"
                  value={config.primaryColor}
                  onChange={(e) => updateField("primaryColor", e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border"
                />
                <Input
                  value={config.primaryColor}
                  onChange={(e) => updateField("primaryColor", e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary">Secundario</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="secondary"
                  value={config.secondaryColor}
                  onChange={(e) =>
                    updateField("secondaryColor", e.target.value)
                  }
                  className="h-9 w-12 rounded cursor-pointer border"
                />
                <Input
                  value={config.secondaryColor}
                  onChange={(e) =>
                    updateField("secondaryColor", e.target.value)
                  }
                  className="font-mono text-xs"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bg">Fondo</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="bg"
                  value={config.bgColor}
                  onChange={(e) => updateField("bgColor", e.target.value)}
                  className="h-9 w-12 rounded cursor-pointer border"
                />
                <Input
                  value={config.bgColor}
                  onChange={(e) => updateField("bgColor", e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Options */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Opciones
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sonido de celebracion</p>
                <p className="text-xs text-muted-foreground">
                  Reproduce una melodia al revelar el regalo
                </p>
              </div>
              <Switch
                checked={config.enableSound}
                onCheckedChange={(v) => updateField("enableSound", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Efecto de confetis</p>
                <p className="text-xs text-muted-foreground">
                  Muestra confetis al revelar el regalo
                </p>
              </div>
              <Switch
                checked={config.enableConfetti}
                onCheckedChange={(v) => updateField("enableConfetti", v)}
              />
            </div>
          </div>
        </section>

        {/* Expiration */}
        <section className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
            Expiracion del enlace
          </h3>
          <p className="text-xs text-muted-foreground">
            El enlace dejara de funcionar despues del tiempo seleccionado.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {EXPIRATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  updateField("expiration", option.value as LinkExpiration)
                }
                className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
                  config.expiration === option.value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col sm:flex-row gap-3 pt-2 pb-8">
          <button
            onClick={handleSave}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Save className="h-4 w-4" />
            Guardar
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors cursor-pointer"
          >
            <Copy className="h-4 w-4" />
            Copiar enlace
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Share2 className="h-4 w-4" />
            Enviar por WhatsApp
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors cursor-pointer lg:hidden"
          >
            <Eye className="h-4 w-4" />
            {showPreview ? "Ocultar preview" : "Ver preview"}
          </button>
        </section>
      </div>

      {/* Live preview - visible on lg or when toggled on mobile */}
      <div
        className={`lg:w-[380px] lg:shrink-0 ${showPreview ? "block" : "hidden lg:block"}`}
      >
        <div className="lg:sticky lg:top-8 space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-center">
            Vista Previa
          </h3>
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: "#f4f4f5" }}
          >
            <Voucher config={previewConfig} voucherNumber="0000000" />
          </div>
        </div>
      </div>
    </div>
  );
}
