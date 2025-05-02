"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Calendar,
  Clock,
  Gift,
  Share2,
  Users,
  TrendingUp,
  Tag,
  Percent,
  ShoppingBag,
  Bell,
  MessageCircle,
  ShoppingCart,
  Star,
  Volume2,
  Sun,
  Moon,
  Truck,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function MarketDayInfoPage() {
  const [nextMarketDay, setNextMarketDay] = useState<Date | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [currentTime, setCurrentTime] = useState("Morning")
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Refs for scroll animations
  const marketExperienceRef = useRef<HTMLDivElement>(null)
  const scheduleRef = useRef<HTMLDivElement>(null)
  const vendorsRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)
  const specialOffersRef = useRef<HTMLDivElement>(null)

  // Set up the next Market Day date (3 days from now for demo purposes)
  useEffect(() => {
    const marketDay = new Date()
    marketDay.setDate(marketDay.getDate() + 3)
    setNextMarketDay(marketDay)

    const timer = setInterval(() => {
      const now = new Date()
      const difference = marketDay.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    // Set current time of day for market atmosphere
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setCurrentTime("Morning")
    } else if (hour >= 12 && hour < 17) {
      setCurrentTime("Afternoon")
    } else {
      setCurrentTime("Evening")
    }

    return () => clearInterval(timer)
  }, [])

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      const elements = [
        { ref: marketExperienceRef, offset: 0.2 },
        { ref: scheduleRef, offset: 0.2 },
        { ref: vendorsRef, offset: 0.2 },
        { ref: communityRef, offset: 0.2 },
        { ref: specialOffersRef, offset: 0.2 },
      ]

      elements.forEach(({ ref, offset }) => {
        if (!ref.current) return

        const elementTop = ref.current.getBoundingClientRect().top
        const elementVisible = viewportHeight * offset

        if (elementTop < viewportHeight - elementVisible) {
          ref.current.classList.add("visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Format date for display
  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  // Toggle market ambience sound
  const toggleAudio = () => {
    if (!audioRef.current) return

    if (audioPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setAudioPlaying(!audioPlaying)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Audio element for market ambience */}
      <audio ref={audioRef} loop>
        <source src="#" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-amber-500 text-black hover:bg-amber-600 animate-bounce-subtle mb-4">
              {currentTime === "Morning"
                ? "Morning Market"
                : currentTime === "Afternoon"
                  ? "Main Market"
                  : "Evening Market"}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
              Wazora Market Day
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Experience the vibrant energy, dynamic bargaining, and community spirit of traditional African markets in
              our digital marketplace.
            </p>

            <div className="flex items-center justify-center mb-8">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-amber-500 text-amber-500"
                onClick={toggleAudio}
              >
                <Volume2 className="h-4 w-4" />
                {audioPlaying ? "Mute Market Sounds" : "Play Market Sounds"}
              </Button>
            </div>

            {nextMarketDay && (
              <div
                className="bg-black/50 backdrop-blur-sm rounded-lg p-6 mb-8 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <h2 className="text-xl font-bold mb-4">Next Market Day: {formatDate(nextMarketDay)}</h2>
                <div className="flex justify-center gap-4">
                  <div className="bg-gray-800 rounded-lg p-3 min-w-[70px] animate-pulse-glow">
                    <span className="text-3xl font-bold text-amber-500">{timeLeft.days}</span>
                    <span className="block text-sm mt-1">Days</span>
                  </div>
                  <div
                    className="bg-gray-800 rounded-lg p-3 min-w-[70px] animate-pulse-glow"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <span className="text-3xl font-bold text-amber-500">{timeLeft.hours}</span>
                    <span className="block text-sm mt-1">Hours</span>
                  </div>
                  <div
                    className="bg-gray-800 rounded-lg p-3 min-w-[70px] animate-pulse-glow"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <span className="text-3xl font-bold text-amber-500">{timeLeft.minutes}</span>
                    <span className="block text-sm mt-1">Minutes</span>
                  </div>
                  <div
                    className="bg-gray-800 rounded-lg p-3 min-w-[70px] animate-pulse-glow"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <span className="text-3xl font-bold text-amber-500">{timeLeft.seconds}</span>
                    <span className="block text-sm mt-1">Seconds</span>
                  </div>
                </div>
              </div>
            )}

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <Button size="lg" className="bg-amber-500 text-black hover:bg-amber-600 animate-pulse-glow">
                <Bell className="mr-2 h-5 w-5" /> Get Market Day Alerts
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                <Calendar className="mr-2 h-5 w-5" /> Add to Calendar
              </Button>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div
          className="absolute top-1/4 left-10 w-20 h-20 bg-amber-500/10 rounded-full animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-amber-500/10 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-16 h-16 bg-amber-500/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </section>

      {/* Market Experience Section */}
      <section ref={marketExperienceRef} className="py-16 bg-gray-900 fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Market Experience</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our digital Market Day recreates the authentic atmosphere and trading practices of traditional African
              markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">A Day at the Market</h3>
              <p className="text-gray-400 mb-6">
                Just like traditional market days that bring communities together, our digital Market Day is a vibrant
                gathering place where buyers and sellers connect, negotiate, and build relationships.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center mt-1 mr-4">
                    <Sun className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Morning Market (6AM - 12PM)</h4>
                    <p className="text-gray-400 text-sm">
                      Early birds get the freshest deals. The morning market features new arrivals and special
                      early-shopper discounts. Vendors are eager to make their first sales of the day.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center mt-1 mr-4">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Main Market (12PM - 6PM)</h4>
                    <p className="text-gray-400 text-sm">
                      The busiest period with the most active bargaining. Prices fluctuate based on demand, and special
                      announcements from vendors create excitement throughout the marketplace.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center mt-1 mr-4">
                    <Moon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Evening Market (6PM - 10PM)</h4>
                    <p className="text-gray-400 text-sm">
                      Final hours bring the best bargains as vendors look to clear inventory. Flash sales and deep
                      discounts create a rush of last-minute shopping activity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/30">
                <h4 className="font-bold mb-2 flex items-center">
                  <Volume2 className="h-4 w-4 mr-2" /> Market Atmosphere
                </h4>
                <p className="text-sm text-gray-400">
                  "The market comes alive with the sounds of vendors calling out their wares, the excitement of
                  bargaining, and the satisfaction of finding the perfect item at the right price. Our digital Market
                  Day captures this energy through real-time interactions, dynamic pricing, and community engagement."
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Morning market scene"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-amber-500/80 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Morning
                  </div>
                </div>
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Busy market scene"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-amber-500/80 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Afternoon
                  </div>
                </div>
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Bargaining scene"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-amber-500/80 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Bargaining
                  </div>
                </div>
                <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Evening market scene"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-amber-500/80 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Evening
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-black p-4 rounded-lg shadow-lg animate-bounce-subtle">
                <Users className="h-5 w-5" />
                <span className="text-sm font-bold">Live Community</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Day Schedule */}
      <section ref={scheduleRef} className="py-16 bg-black fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Market Day Schedule</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Each Market Day follows a traditional schedule with special events and opportunities throughout the day.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-amber-500/30"></div>

              {/* Morning */}
              <div className="relative mb-12">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Early Morning Market</h3>
                    <p className="text-gray-400 mb-2">6:00 AM - 9:00 AM</p>
                    <div className="bg-gray-800 p-4 rounded-lg inline-block">
                      <ul className="text-sm text-left space-y-2">
                        <li className="flex items-center">
                          <Tag className="h-4 w-4 text-amber-500 mr-2" /> Fresh inventory unveiled
                        </li>
                        <li className="flex items-center">
                          <Percent className="h-4 w-4 text-amber-500 mr-2" /> Early bird discounts (10-15% off)
                        </li>
                        <li className="flex items-center">
                          <Gift className="h-4 w-4 text-amber-500 mr-2" /> First 100 shoppers get bonus spin
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center order-1 md:order-2">
                    <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center z-10">
                      <Sun className="h-6 w-6 text-black" />
                    </div>
                  </div>
                  <div className="flex-1 md:pl-8 order-3">
                    <div className="hidden md:block h-full"></div>
                  </div>
                </div>
              </div>

              {/* Mid-Morning */}
              <div className="relative mb-12">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
                    <div className="hidden md:block h-full"></div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center order-1 md:order-2">
                    <div className="h-12 w-12 rounded-full bg-amber-500/80 flex items-center justify-center z-10">
                      <Clock className="h-6 w-6 text-black" />
                    </div>
                  </div>
                  <div className="flex-1 md:pl-8 order-3">
                    <h3 className="text-xl font-bold mb-2">Mid-Morning Rush</h3>
                    <p className="text-gray-400 mb-2">9:00 AM - 12:00 PM</p>
                    <div className="bg-gray-800 p-4 rounded-lg inline-block">
                      <ul className="text-sm text-left space-y-2">
                        <li className="flex items-center">
                          <Users className="h-4 w-4 text-amber-500 mr-2" /> Peak bargaining activity begins
                        </li>
                        <li className="flex items-center">
                          <TrendingUp className="h-4 w-4 text-amber-500 mr-2" /> Dynamic pricing adjustments
                        </li>
                        <li className="flex items-center">
                          <MessageCircle className="h-4 w-4 text-amber-500 mr-2" /> Live vendor demonstrations
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Afternoon */}
              <div className="relative mb-12">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Afternoon Market</h3>
                    <p className="text-gray-400 mb-2">12:00 PM - 4:00 PM</p>
                    <div className="bg-gray-800 p-4 rounded-lg inline-block">
                      <ul className="text-sm text-left space-y-2">
                        <li className="flex items-center">
                          <ShoppingBag className="h-4 w-4 text-amber-500 mr-2" /> Bulk deal announcements
                        </li>
                        <li className="flex items-center">
                          <Star className="h-4 w-4 text-amber-500 mr-2" /> Featured vintage & rare items
                        </li>
                        <li className="flex items-center">
                          <Share2 className="h-4 w-4 text-amber-500 mr-2" /> Community trading events
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center order-1 md:order-2">
                    <div className="h-12 w-12 rounded-full bg-amber-500/60 flex items-center justify-center z-10">
                      <TrendingUp className="h-6 w-6 text-black" />
                    </div>
                  </div>
                  <div className="flex-1 md:pl-8 order-3">
                    <div className="hidden md:block h-full"></div>
                  </div>
                </div>
              </div>

              {/* Evening */}
              <div className="relative mb-12">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
                    <div className="hidden md:block h-full"></div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center order-1 md:order-2">
                    <div className="h-12 w-12 rounded-full bg-amber-500/40 flex items-center justify-center z-10">
                      <Moon className="h-6 w-6 text-black" />
                    </div>
                  </div>
                  <div className="flex-1 md:pl-8 order-3">
                    <h3 className="text-xl font-bold mb-2">Evening Market</h3>
                    <p className="text-gray-400 mb-2">4:00 PM - 8:00 PM</p>
                    <div className="bg-gray-800 p-4 rounded-lg inline-block">
                      <ul className="text-sm text-left space-y-2">
                        <li className="flex items-center">
                          <Percent className="h-4 w-4 text-amber-500 mr-2" /> Deepest discounts of the day
                        </li>
                        <li className="flex items-center">
                          <Clock className="h-4 w-4 text-amber-500 mr-2" /> Flash sales every 30 minutes
                        </li>
                        <li className="flex items-center">
                          <Gift className="h-4 w-4 text-amber-500 mr-2" /> Final spin-to-win opportunities
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Closing */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start">
                  <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0 order-2 md:order-1">
                    <h3 className="text-xl font-bold mb-2">Market Closing</h3>
                    <p className="text-gray-400 mb-2">8:00 PM - 10:00 PM</p>
                    <div className="bg-gray-800 p-4 rounded-lg inline-block">
                      <ul className="text-sm text-left space-y-2">
                        <li className="flex items-center">
                          <ShoppingCart className="h-4 w-4 text-amber-500 mr-2" /> Last-chance clearance
                        </li>
                        <li className="flex items-center">
                          <Calendar className="h-4 w-4 text-amber-500 mr-2" /> Next Market Day announcement
                        </li>
                        <li className="flex items-center">
                          <Bell className="h-4 w-4 text-amber-500 mr-2" /> Special subscriber-only preview
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center order-1 md:order-2">
                    <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center z-10">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                  </div>
                  <div className="flex-1 md:pl-8 order-3">
                    <div className="hidden md:block h-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-amber-500 text-black hover:bg-amber-600">
              <Bell className="mr-2 h-4 w-4" /> Get Schedule Alerts
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section ref={vendorsRef} className="py-16 bg-gray-900 fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Market Vendors</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet the skilled artisans and traders who bring their unique products to our Market Day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="aspect-square">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Vendor portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                    <span className="text-amber-500 font-bold">AF</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AfriCraft Designs</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 fill-none" />
                      <span className="ml-2 text-sm text-gray-400">4.8</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  "I've been crafting traditional Ankara products for over 15 years. Market Day allows me to reach
                  customers across Africa who appreciate authentic handmade goods."
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Tag className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Specializes in: Ankara fabrics, bags, accessories</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Market Day vendor since 2020</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Percent className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Known for: Generous bargaining & bulk discounts</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-amber-500 text-black hover:bg-amber-600">Visit Vendor Stall</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="aspect-square">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Vendor portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                    <span className="text-amber-500 font-bold">HA</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Heritage Artifacts</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="ml-2 text-sm text-gray-400">4.9</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  "I travel across West Africa to source authentic vintage pieces with cultural significance. Market Day
                  helps me connect these treasures with collectors who value their history."
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Tag className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Specializes in: Vintage artifacts, tribal art, collectibles</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Market Day vendor since 2019</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Percent className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Known for: Rare finds & historical knowledge</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-amber-500 text-black hover:bg-amber-600">Visit Vendor Stall</Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <div className="aspect-square">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Vendor portrait"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                    <span className="text-amber-500 font-bold">NE</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Natural Essence</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 fill-none" />
                      <span className="ml-2 text-sm text-gray-400">4.6</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  "Our cooperative of women artisans creates organic beauty products using traditional methods. Market
                  Day's bulk discounts help us connect with retailers across the continent."
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Tag className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Specializes in: Organic beauty, shea products, soaps</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Market Day vendor since 2021</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Percent className="h-4 w-4 text-amber-500 mr-2" />
                    <span>Known for: Bulk deals & product demonstrations</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-amber-500 text-black hover:bg-amber-600">Visit Vendor Stall</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-amber-500 text-amber-500">
              <Link href="/vendors">
                View All Market Vendors <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Trading Section */}
      <section ref={communityRef} className="py-16 bg-black fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Trading</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Market Day is more than just shopping—it's a social experience where communities come together to trade,
              share, and celebrate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold mb-4">The Heart of Market Day</h3>
              <p className="text-gray-400 mb-6">
                Traditional African markets are community gathering places where people exchange not just goods, but
                stories, news, and cultural knowledge. Our digital Market Day recreates this vital social aspect.
              </p>

              <Tabs defaultValue="bargaining" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="bargaining">Bargaining</TabsTrigger>
                  <TabsTrigger value="group-buying">Group Buying</TabsTrigger>
                  <TabsTrigger value="cultural">Cultural Exchange</TabsTrigger>
                </TabsList>
                <TabsContent value="bargaining" className="mt-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">The Art of Negotiation</h4>
                    <p className="text-sm text-gray-400 mb-4">
                      Bargaining is a cultural tradition and social ritual. Our platform supports real-time negotiation
                      between buyers and sellers, with AI assistance that respects traditional bargaining etiquette.
                    </p>
                    <div className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Handcrafted Leather Sandals</p>
                        <p className="text-xs text-gray-500">Listed: $59.99</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-amber-500">Offer: $42.99</p>
                        <p className="text-xs text-green-500">Counter: $45.99</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="group-buying" className="mt-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Community Bulk Purchases</h4>
                    <p className="text-sm text-gray-400 mb-4">
                      In traditional markets, communities often pool resources to secure better prices. Our group buying
                      feature lets friends, family, or community groups combine orders for deeper discounts.
                    </p>
                    <div className="flex items-center justify-between bg-gray-900 p-3 rounded-md">
                      <div>
                        <p className="text-sm font-medium">Bulk Spice Collection (10 sets)</p>
                        <p className="text-xs text-gray-500">Individual price: $29.99 each</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-amber-500">Group price: $20.99 each</p>
                        <p className="text-xs text-green-500">Total savings: $90.00</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="cultural" className="mt-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Stories Behind Products</h4>
                    <p className="text-sm text-gray-400 mb-4">
                      Traditional markets are places of cultural exchange. Our platform encourages vendors to share the
                      stories, traditions, and craftsmanship behind their products.
                    </p>
                    <div className="bg-gray-900 p-3 rounded-md">
                      <p className="text-sm italic text-gray-300">
                        "This Kente cloth pattern tells the story of perseverance and wisdom. It's traditionally worn
                        during important ceremonies and has been crafted by our family for five generations using
                        techniques passed down from our ancestors."
                      </p>
                      <p className="text-xs text-right text-amber-500 mt-2">— Heritage Artifacts</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Button className="bg-amber-500 text-black hover:bg-amber-600">
                  <Users className="mr-2 h-4 w-4" /> Join Community Trading
                </Button>
              </div>
            </div>

            <div className="relative order-1 md:order-2">
              <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Market community scene"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-black p-4 rounded-lg shadow-lg animate-bounce-subtle">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-bold">Live Chat</span>
              </div>

              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg max-w-xs">
                <p className="text-sm text-white">
                  "Markets are where our communities have gathered for centuries. They're places of commerce, but also
                  conversation, connection, and culture."
                </p>
                <p className="text-xs text-amber-500 mt-2">— Market Elder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section ref={specialOffersRef} className="py-16 bg-gray-900 fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Market Day Special Offers</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover unique deals and treasures available only during Market Day events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Vintage collection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 left-0 bg-purple-500 text-white px-3 py-1 rounded-br-lg font-bold">
                    VINTAGE
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Vintage Treasures</h3>
                  <p className="text-gray-400 mb-4">
                    Discover rare vintage items with historical significance and cultural value. Each piece tells a
                    story of African heritage and craftsmanship.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Vintage Kente Cloth</span>
                      <span className="text-amber-500 font-bold">From $65.99</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Tribal Masks (1950s)</span>
                      <span className="text-amber-500 font-bold">From $159.99</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Vintage Record Collection</span>
                      <span className="text-amber-500 font-bold">From $89.99</span>
                    </div>
                  </div>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">Explore Vintage Collection</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Bulk deals"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 rounded-br-lg font-bold">
                    BULK DEALS
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Bulk Purchasing</h3>
                  <p className="text-gray-400 mb-4">
                    Perfect for resellers, group buyers, and families. Get significant discounts when purchasing
                    multiple items, just like in traditional markets.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>5+ items</span>
                      <span className="text-green-500 font-bold">15% off</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>10+ items</span>
                      <span className="text-green-500 font-bold">25% off</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>20+ items</span>
                      <span className="text-green-500 font-bold">40% off</span>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">View Bulk Opportunities</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Limited edition"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 rounded-br-lg font-bold">
                    LIMITED EDITION
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Limited Edition Finds</h3>
                  <p className="text-gray-400 mb-4">
                    Exclusive items created specifically for Market Day. These limited-quantity products showcase the
                    finest craftsmanship from top African artisans.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Adire Fabric Bundle (5 yards)</span>
                      <span className="text-red-500 font-bold">Only 10 left</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Handcrafted Jewelry Set</span>
                      <span className="text-red-500 font-bold">Only 15 left</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Limited Art Print</span>
                      <span className="text-red-500 font-bold">Only 5 left</span>
                    </div>
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Shop Limited Editions</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-6">
                  <h3 className="text-xl font-bold mb-2">Market Day Rewards Program</h3>
                  <p className="text-gray-400">
                    Earn spins on our reward wheel with every purchase. Win exclusive discounts, free shipping, and
                    special prizes that can be used immediately during Market Day.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-amber-500 text-black hover:bg-amber-600 animate-pulse-glow">
                    <Gift className="mr-2 h-4 w-4" /> Spin to Win
                  </Button>
                  <Button variant="outline" className="border-amber-500 text-amber-500">
                    <Share2 className="mr-2 h-4 w-4" /> Refer & Earn
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">From Market to Your Door</h2>
              <p className="text-gray-400 mb-6">
                Unlike traditional markets where you carry your purchases home, we bring the market experience to you
                with convenient delivery options across Africa.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center mt-1 mr-4">
                    <Truck className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Same-Day Delivery</h4>
                    <p className="text-gray-400 text-sm">
                      In major cities, get your Market Day purchases delivered the same day, maintaining the immediacy
                      of the traditional market experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center mt-1 mr-4">
                    <Users className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Group Delivery</h4>
                    <p className="text-gray-400 text-sm">
                      Coordinate with friends and neighbors for group deliveries to save on shipping costs, similar to
                      how communities shop together at physical markets.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center mt-1 mr-4">
                    <Calendar className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Market Day Pickup Points</h4>
                    <p className="text-gray-400 text-sm">
                      For those who enjoy the social aspect of markets, collect your purchases at community pickup
                      points where you can meet other shoppers and share your finds.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="bg-amber-500 text-black hover:bg-amber-600">
                <Truck className="mr-2 h-4 w-4" /> View Delivery Options
              </Button>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Delivery service"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-black p-4 rounded-lg shadow-lg animate-bounce-subtle">
                <Truck className="h-5 w-5" />
                <span className="text-sm font-bold">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-black">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Us for Market Day</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Experience the vibrant tradition of African markets in our digital marketplace. Connect with vendors,
            discover unique treasures, and become part of our trading community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-900">
              <Link href="/market-day">
                <Calendar className="mr-2 h-5 w-5" /> Join Next Market Day
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-black text-black hover:bg-black/10">
              <Link href="/become-seller">
                <Tag className="mr-2 h-5 w-5" /> Become a Vendor
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about our digital Market Day experience.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How often does Market Day happen?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-400">
                    Market Day typically occurs once a month, lasting for 24 hours. Just like traditional market days in
                    many African communities, it follows a regular schedule so people can plan their shopping and social
                    activities around it. Special Market Days may be organized around holidays or seasonal events.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does bargaining work in a digital marketplace?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-400">
                    Our platform supports real-time negotiation between buyers and sellers, similar to traditional
                    markets. You can make offers on products, and sellers can counter-offer. The system includes
                    cultural context and bargaining etiquette guidance to help maintain the respectful art of
                    negotiation that is central to African market culture.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What makes Market Day different from regular online shopping?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-400">
                    Market Day recreates the dynamic, time-bound nature of traditional markets. Prices change throughout
                    the day, special announcements create excitement, and the community aspect encourages interaction
                    between shoppers and vendors. It's not just transactional—it's a cultural and social experience that
                    celebrates the tradition of African marketplaces.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I participate as a vendor?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-400">
                    Vendors can apply through our "Become a Vendor" program. We particularly welcome artisans,
                    craftspeople, and traders who offer authentic African products and are willing to engage with the
                    community aspects of Market Day, including bargaining, storytelling about their products, and
                    participating in the dynamic pricing model.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I shop with friends or as a group?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-400">
                    Yes! We encourage community shopping. You can create or join shopping groups for bulk purchases,
                    share product discoveries with friends, and even coordinate group deliveries. This reflects the
                    communal nature of traditional market shopping, where friends and family often shop together and
                    share their experiences.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  )
}
