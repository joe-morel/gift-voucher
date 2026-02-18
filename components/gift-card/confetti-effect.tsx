"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false })

interface ConfettiEffectProps {
  active: boolean
  duration?: number
  colors?: string[]
}

export function ConfettiEffect({
  active,
  duration = 6000,
  colors = ["#7c3aed", "#e879f9", "#fbbf24", "#f472b6", "#a78bfa", "#34d399"],
}: ConfettiEffectProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })

    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (active) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), duration)
      return () => clearTimeout(timer)
    }
  }, [active, duration])

  if (!showConfetti || dimensions.width === 0) return null

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={250}
      gravity={0.15}
      colors={colors}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 100, pointerEvents: "none" }}
    />
  )
}
