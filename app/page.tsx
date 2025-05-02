"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShoppingBag, Calendar, Gift } from "lucide-react"
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
      <section className="relative bg-gradient-to-r from-gray-900 to-black py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-6 animate-fade-in">
              <Badge className="bg-amber-500 text-black hover:bg-amber-600 animate-bounce-subtle">New Experience</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Shop Like You're at the Market
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-md">
                Experience the vibrant culture of African markets with bargaining, dynamic pricing, and exclusive Market
                Day events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-amber-500 text-black hover:bg-amber-600 animate-pulse-glow">
                  <Link href="/shop">
                    Start Shopping <ShoppingBag className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                  <Link href="/market-day-info">
                    Join Market Day <Calendar className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative animate-float">
                {/* Enhanced Bargain & Save highlight */}
                <div className="absolute -top-6 -left-6 bargain-highlight bargain-glow rounded-lg p-6 shadow-lg z-20 animate-pulse-glow">
                  <div className="text-white">
                    <div className="flex items-center">
                      <span className="coin mr-3"></span>
                      <p className="font-bold text-xl">Bargain & Save</p>
                    </div>
                    <p className="text-base mt-2">Negotiate prices like in a real market</p>
                    <div className="mt-3">
                      <Button size="sm" className="bg-white text-amber-600 hover:bg-gray-100">
                        Learn How
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -right-6 bg-white/20 backdrop-blur-sm rounded-lg p-4 shadow-lg animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="text-white">
                    <p className="font-bold">Market Day Events</p>
                    <p className="text-sm">Spin to win exclusive discounts</p>
                  </div>
                </div>
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="African marketplace"
                  className="rounded-lg shadow-xl"
                />
              </div>
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

      {/* Market Day Countdown */}
      <section className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <MarketDayCountdown />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-black fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">A New Way to Shop Online</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Wazora brings the vibrant African market experience to e-commerce with unique features designed for our
              culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20">
              <div className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-amber-500 animate-bounce-subtle" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bargaining Feature</h3>
              <p className="text-gray-400">
                Negotiate prices directly with sellers, just like in traditional markets. Make offers and reach a fair
                price.
              </p>
            </div>

            <div
              className="bg-gray-900 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-amber-500 animate-bounce-subtle" style={{ animationDelay: "0.2s" }} />
              </div>
              <h3 className="text-xl font-bold mb-2">Market Day Events</h3>
              <p className="text-gray-400">
                Join our time-bound shopping events with dynamic pricing, exclusive deals, and special discounts.
              </p>
            </div>

            <div
              className="bg-gray-900 p-6 rounded-lg transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/20"
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 text-amber-500 animate-bounce-subtle" style={{ animationDelay: "0.4s" }} />
              </div>
              <h3 className="text-xl font-bold mb-2">Spin-to-Win Rewards</h3>
              <p className="text-gray-400">
                Earn spins through purchases and actions, then win discounts and rewards during Market Day events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={productsRef} className="py-16 bg-gray-900 fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="ghost" className="text-amber-500">
              <Link href="/shop">
                View all <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section ref={categoriesRef} className="py-16 bg-black fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Categories</h2>
            <Button asChild variant="ghost" className="text-amber-500">
              <Link href="/categories">
                All categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/categories/fashion" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10"></div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Fashion"
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-bold text-lg">Fashion</h3>
                <p className="text-white/80 text-sm">Traditional & Modern</p>
              </div>
            </Link>

            <Link href="/categories/crafts" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10"></div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Crafts"
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-bold text-lg">Crafts</h3>
                <p className="text-white/80 text-sm">Artisanal Products</p>
              </div>
            </Link>

            <Link href="/categories/home" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10"></div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Home & Living"
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-bold text-lg">Home & Living</h3>
                <p className="text-white/80 text-sm">Decor & Essentials</p>
              </div>
            </Link>

            <Link href="/categories/electronics" className="group relative overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/0 z-10"></div>
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Electronics"
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-white font-bold text-lg">Electronics</h3>
                <p className="text-white/80 text-sm">Gadgets & Devices</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-16 bg-amber-600 text-black fade-in-scroll">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience African E-commerce?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of buyers and sellers on Wazora and discover a new way to shop online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-black text-white hover:bg-gray-900">
              <Link href="/shop">Start Shopping</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-black text-black hover:bg-black/10">
              <Link href="/become-seller">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
