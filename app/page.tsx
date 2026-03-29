"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShoppingBag, Calendar, Gift } from "lucide-react"
import { motion } from "framer-motion"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"
import MarketDayCountdown from "@/components/market-day-countdown"

export default function Home() {
  // Filter featured products
  const featuredProducts = products.slice(0, 4)

  // Refs for scroll animations
  const featuresRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight

      const elements = [
        { ref: featuresRef, offset: 0.2 },
        { ref: productsRef, offset: 0.2 },
        { ref: categoriesRef, offset: 0.2 },
        { ref: ctaRef, offset: 0.1 },
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

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-20 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="bg-amber-500 text-black hover:bg-amber-600 animate-bounce-subtle mb-4 md:mb-6 text-sm md:text-base">
              New Experience
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6">
              Shop Like You&apos;re at the Market
            </h1>
            <p className="text-base md:text-xl opacity-90 max-w-md mx-auto mb-6 md:mb-8 px-4">
              Experience the vibrant culture of African markets with bargaining, dynamic pricing, and exclusive Market
              Day events.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button asChild size="lg" className="bg-amber-500 text-black hover:bg-amber-600 animate-pulse-glow text-sm md:text-base">
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Start Shopping
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20 text-sm md:text-base">
                <Link href="/chat">
                  <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Join Chat
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Day Countdown */}
      <section className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <MarketDayCountdown />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-12 md:py-16 bg-black fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">A New Way to Shop Online</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Wazora brings the vibrant African market experience to e-commerce with unique features designed for our
              culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-900 p-4 md:p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="bg-gray-800 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 md:h-8 md:w-8 text-amber-500 animate-bounce-subtle" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Bargaining Feature</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Negotiate prices directly with sellers, just like in traditional markets. Make offers and reach a fair
                price.
              </p>
            </div>

            <div
              className="bg-gray-900 p-4 md:p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="bg-gray-800 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-amber-500 animate-bounce-subtle" style={{ animationDelay: "0.2s" }} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Market Day Events</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Join our time-bound shopping events with dynamic pricing, exclusive deals, and special discounts.
              </p>
            </div>

            <div
              className="bg-gray-900 p-4 md:p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-gray-800 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 md:h-8 md:w-8 text-amber-500 animate-bounce-subtle" style={{ animationDelay: "0.4s" }} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Spin-to-Win Rewards</h3>
              <p className="text-gray-400 text-sm md:text-base">
                Earn spins through purchases and actions, then win discounts and rewards during Market Day events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="py-12 md:py-16 bg-gray-900 fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="ghost" className="text-amber-500">
              <Link href="/products">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onChatSeller={(productId) => {
                  console.log("Chat with seller for product:", productId)
                }}
                onMakeOffer={(productId) => {
                  console.log("Make offer for product:", productId)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section ref={categoriesRef} className="py-12 md:py-16 bg-black fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Trending Categories</h2>
            <Button asChild variant="ghost" className="text-amber-500">
              <Link href="/categories">
                All categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link href="/categories/fashion" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10"></div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Fashion"
                className="w-full h-32 md:h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-3 md:p-4 z-20">
                <h3 className="text-white font-bold text-sm md:text-lg">Fashion</h3>
                <p className="text-white/80 text-sm">Traditional & Modern</p>
              </div>
            </Link>

            <Link href="/categories/crafts" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10"></div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Crafts"
                className="w-full h-32 md:h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-3 md:p-4 z-20">
                <h3 className="text-white font-bold text-sm md:text-lg">Crafts</h3>
                <p className="text-white/80 text-sm">Artisanal Products</p>
              </div>
            </Link>

            <Link href="/categories/home" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10"></div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Home & Living"
                className="w-full h-32 md:h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-3 md:p-4 z-20">
                <h3 className="text-white font-bold text-sm md:text-lg">Home & Living</h3>
                <p className="text-white/80 text-sm">Decor & Essentials</p>
              </div>
            </Link>

            <Link href="/categories/electronics" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10"></div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Electronics"
                className="w-full h-32 md:h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-3 md:p-4 z-20">
                <h3 className="text-white font-bold text-sm md:text-lg">Electronics</h3>
                <p className="text-white/80 text-sm">Gadgets & Devices</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 md:py-20 bg-gradient-to-r from-gray-900 to-black fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto">
            Join thousands of buyers and sellers experiencing the future of African e-commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button asChild size="lg" className="bg-amber-500 text-black hover:bg-amber-600 animate-pulse-glow">
              <Link href="/products">
                Start Shopping
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link href="/demo">
                View Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
