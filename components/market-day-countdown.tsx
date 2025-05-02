"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

export default function MarketDayCountdown() {
  // For demo purposes, set Market Day to be 3 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [isMarketDay, setIsMarketDay] = useState(false)

  useEffect(() => {
    // For demo purposes, randomly decide if it's Market Day or not
    // In a real app, this would be determined by actual dates
    const randomIsMarketDay = Math.random() > 0.5
    setIsMarketDay(randomIsMarketDay)

    if (!randomIsMarketDay) {
      // Set a future date for the next Market Day (3 days from now)
      const marketDay = new Date()
      marketDay.setDate(marketDay.getDate() + 3)

      const timer = setInterval(() => {
        const now = new Date()
        const difference = marketDay.getTime() - now.getTime()

        if (difference <= 0) {
          clearInterval(timer)
          setIsMarketDay(true)
          return
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [])

  if (isMarketDay) {
    return (
      <Card className="bg-amber-500 text-black p-6 text-center">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Market Day is LIVE!</h3>
            <p className="text-black/80">
              Exclusive deals, dynamic pricing, and spin-to-win rewards are waiting for you!
            </p>
          </div>
          <Button asChild size="lg" className="bg-black text-white hover:bg-gray-900">
            <Link href="/market-day">Shop Market Day Now</Link>
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-gray-900 border-gray-800 p-6 text-center">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center justify-center md:justify-start mb-2">
            <Calendar className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-xl font-bold">Next Market Day</h3>
          </div>
          <p className="text-gray-400">Get ready for exclusive deals and spin-to-win rewards!</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-3 min-w-[60px]">
              <span className="text-2xl font-bold text-amber-500">{timeLeft.days}</span>
            </div>
            <span className="text-xs mt-1 block text-gray-400">Days</span>
          </div>

          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-3 min-w-[60px]">
              <span className="text-2xl font-bold text-amber-500">{timeLeft.hours}</span>
            </div>
            <span className="text-xs mt-1 block text-gray-400">Hours</span>
          </div>

          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-3 min-w-[60px]">
              <span className="text-2xl font-bold text-amber-500">{timeLeft.minutes}</span>
            </div>
            <span className="text-xs mt-1 block text-gray-400">Mins</span>
          </div>

          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-3 min-w-[60px]">
              <span className="text-2xl font-bold text-amber-500">{timeLeft.seconds}</span>
            </div>
            <span className="text-xs mt-1 block text-gray-400">Secs</span>
          </div>
        </div>

        <Button asChild className="hidden md:flex bg-amber-500 hover:bg-amber-600 text-black">
          <Link href="/market-day">
            <Clock className="mr-2 h-4 w-4" /> Get Notified
          </Link>
        </Button>
      </div>

      <Button asChild className="mt-4 w-full md:hidden bg-amber-500 hover:bg-amber-600 text-black">
        <Link href="/market-day">
          <Clock className="mr-2 h-4 w-4" /> Get Notified
        </Link>
      </Button>
    </Card>
  )
}
