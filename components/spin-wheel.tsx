"use client"

import { useState, useRef, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import type { SpinReward } from "@/lib/data"

interface SpinWheelProps {
  rewards: SpinReward[]
  onClose: () => void
  onSpinComplete: (reward: string) => void
}

export default function SpinWheel({ rewards, onClose, onSpinComplete }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedReward, setSelectedReward] = useState<SpinReward | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wheelRadius = 150
  const centerX = wheelRadius + 20 // Add padding
  const centerY = wheelRadius + 20

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw wheel segments
    const totalSegments = rewards.length
    const arcSize = (2 * Math.PI) / totalSegments

    rewards.forEach((reward, index) => {
      const startAngle = index * arcSize
      const endAngle = (index + 1) * arcSize

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = reward.color
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + arcSize / 2)
      ctx.textAlign = "right"
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px sans-serif"
      ctx.fillText(reward.label, wheelRadius - 20, 5)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(centerX + wheelRadius + 10, centerY)
    ctx.lineTo(centerX + wheelRadius - 10, centerY - 15)
    ctx.lineTo(centerX + wheelRadius - 10, centerY + 15)
    ctx.closePath()
    ctx.fillStyle = "#e11d48"
    ctx.fill()
  }, [rewards])

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedReward(null)

    // Calculate a random spin (between 5-10 full rotations)
    const spinDuration = 5000 // 5 seconds
    const fullRotations = 5 + Math.random() * 5

    // Determine the winning segment based on probabilities
    const probabilitySum = rewards.reduce((sum, reward) => sum + reward.probability, 0)
    let random = Math.random() * probabilitySum
    let selectedIndex = 0

    for (let i = 0; i < rewards.length; i++) {
      random -= rewards[i].probability
      if (random <= 0) {
        selectedIndex = i
        break
      }
    }

    // Calculate final rotation angle
    const segmentAngle = (2 * Math.PI) / rewards.length
    const finalAngle = fullRotations * 2 * Math.PI + selectedIndex * segmentAngle

    // Animate the spin
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let startTime: number | null = null
    let currentRotation = 0

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / spinDuration, 1)

      // Easing function for natural slowdown
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

      // Calculate current rotation
      currentRotation = easeOut(progress) * finalAngle

      // Clear and redraw
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Save context state
      ctx.save()

      // Move to center and rotate
      ctx.translate(centerX, centerY)
      ctx.rotate(currentRotation)
      ctx.translate(-centerX, -centerY)

      // Redraw wheel segments
      const totalSegments = rewards.length
      const arcSize = (2 * Math.PI) / totalSegments

      rewards.forEach((reward, index) => {
        const startAngle = index * arcSize
        const endAngle = (index + 1) * arcSize

        // Draw segment
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle)
        ctx.closePath()
        ctx.fillStyle = reward.color
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw text
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(startAngle + arcSize / 2)
        ctx.textAlign = "right"
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 14px sans-serif"
        ctx.fillText(reward.label, wheelRadius - 20, 5)
        ctx.restore()
      })

      // Draw center circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 2
      ctx.stroke()

      // Restore context state
      ctx.restore()

      // Draw pointer (doesn't rotate)
      ctx.beginPath()
      ctx.moveTo(centerX + wheelRadius + 10, centerY)
      ctx.lineTo(centerX + wheelRadius - 10, centerY - 15)
      ctx.lineTo(centerX + wheelRadius - 10, centerY + 15)
      ctx.closePath()
      ctx.fillStyle = "#e11d48"
      ctx.fill()

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Spin complete
        setIsSpinning(false)
        setSelectedReward(rewards[selectedIndex])
        onSpinComplete(rewards[selectedIndex].label)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Spin to Win!</DialogTitle>
          <DialogDescription className="text-center">
            Spin the wheel to win exclusive Market Day rewards and discounts.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col items-center">
          <div className="relative mb-6">
            <canvas
              ref={canvasRef}
              width={(wheelRadius + 30) * 2}
              height={(wheelRadius + 30) * 2}
              className="mx-auto"
            />
          </div>

          {selectedReward ? (
            <div className="text-center mb-6">
              <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
              <p className="text-lg text-amber-600 font-bold mb-2">You won: {selectedReward.label}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This reward has been added to your account and can be used on any Market Day product.
              </p>
            </div>
          ) : (
            <Button size="lg" onClick={spinWheel} disabled={isSpinning} className="mb-4">
              {isSpinning ? "Spinning..." : "Spin the Wheel"}
            </Button>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {selectedReward ? (
            <>
              <Button onClick={onClose} className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              {isSpinning ? "Please Wait..." : "Cancel"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
