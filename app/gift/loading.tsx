import { Gift } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-svh flex items-center justify-center bg-muted">
      <div className="text-center">
        <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-3 animate-pulse" />
        <p className="text-sm text-muted-foreground">Cargando tu regalo...</p>
      </div>
    </div>
  )
}
