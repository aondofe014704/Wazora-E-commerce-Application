"use client"

import { useEffect, useRef } from "react"

export default function LogoWithBubbles() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Enhanced bubble animations
    const bubbles = logoRef.current?.querySelectorAll(".bubble")

    if (bubbles) {
      bubbles.forEach((bubble, index) => {
        // Add random movement to each bubble
        bubble.classList.add("animate-pulse")

        // Set random animation delays
        const delay = Math.random() * 3
        ;(bubble as HTMLElement).style.animationDelay = `${delay}s`
      })
    }

    // Add a subtle pulse to the logo text
    const logoText = logoRef.current?.querySelector(".logo-text")
    if (logoText) {
      logoText.classList.add("animate-pulse-glow")
    }
  }, [])

  return (
    <div ref={logoRef} className="logo-container">
      <span className="logo-text font-bold text-2xl text-amber-500 relative z-10 animate-pulse-glow">WAZORA</span>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>

      {/* Add more bubbles for a richer effect */}
      <div className="bubble" style={{ width: "7px", height: "7px", top: "40%", right: "5%" }}></div>
      <div className="bubble" style={{ width: "9px", height: "9px", bottom: "30%", left: "15%" }}></div>
      <div className="bubble" style={{ width: "6px", height: "6px", top: "10%", right: "30%" }}></div>
    </div>
  )
}
