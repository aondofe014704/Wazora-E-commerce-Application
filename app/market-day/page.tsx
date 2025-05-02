"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Gift, Clock, Share2, Users, TrendingUp } from "lucide-react"
import ProductCard from "@/components/product-card"
import SpinWheel from "@/components/spin-wheel"
import { marketDayProducts, spinRewards } from "@/lib/data"

export default function MarketDayPage() {
  const [showSpinWheel, setShowSpinWheel] = useState(false)
  const [availableSpins, setAvailableSpins] = useState(2)
  const [rewards, setRewards] = useState<string[]>([])

  const handleSpinComplete = (reward: string) => {
    setRewards([...rewards, reward])
    setAvailableSpins(availableSpins - 1)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <Badge className="bg-white text-amber-600 hover:bg-gray-100 mb-4">LIVE NOW</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Market Day</h1>
              <p className="text-xl opacity-90 mb-6">
                Experience the excitement of an African market with exclusive deals, dynamic pricing, and special
                rewards!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-amber-600 hover:bg-gray-100"
                  onClick={() => setShowSpinWheel(true)}
                >
                  <Gift className="mr-2 h-5 w-5" /> Spin to Win
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20" asChild>
                  <Link href="#deals">View Exclusive Deals</Link>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Clock className="h-5 w-5 mx-auto mb-1" />
                  <p className="text-sm font-medium">Ends in</p>
                  <p className="font-bold">12:45:30</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Gift className="h-5 w-5 mx-auto mb-1" />
                  <p className="text-sm font-medium">Your Spins</p>
                  <p className="font-bold">{availableSpins}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <TrendingUp className="h-5 w-5 mx-auto mb-1" />
                  <p className="text-sm font-medium">Active Deals</p>
                  <p className="font-bold">{marketDayProducts.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                  <Users className="h-5 w-5 mx-auto mb-1" />
                  <p className="text-sm font-medium">Shoppers</p>
                  <p className="font-bold">2,458</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Market Day celebration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-12 bg-amber-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Your Market Day Rewards</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Spin the wheel to win exclusive discounts and rewards that you can use on any Market Day product!
            </p>
          </div>

          <div className="flex flex-col items-center">
            {rewards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl mb-6">
                {rewards.map((reward, index) => (
                  <Card key={index} className="bg-white dark:bg-gray-800">
                    <CardContent className="p-4 flex items-center">
                      <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-4">
                        <Gift className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{reward}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Valid today only</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't won any rewards yet. Spin the wheel to get started!
              </p>
            )}

            <div className="flex gap-4">
              <Button onClick={() => setShowSpinWheel(true)} disabled={availableSpins <= 0}>
                {availableSpins > 0 ? (
                  <>
                    <Gift className="mr-2 h-4 w-4" /> Spin the Wheel ({availableSpins})
                  </>
                ) : (
                  "No Spins Available"
                )}
              </Button>

              <Button variant="outline" asChild>
                <Link href="#referral">
                  <Share2 className="mr-2 h-4 w-4" /> Refer & Earn Spins
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Day Deals */}
      <section id="deals" className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Market Day Exclusive Deals</h2>
            <div className="flex items-center text-amber-600 dark:text-amber-500">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">Ends in: 12:45:30</span>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Deals</TabsTrigger>
              <TabsTrigger value="limited">Limited Edition</TabsTrigger>
              <TabsTrigger value="vintage">Vintage Items</TabsTrigger>
              <TabsTrigger value="bulk">Bulk Deals</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketDayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} isMarketDay={true} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="limited">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketDayProducts
                  .filter((p) => p.isLimitedEdition)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} isMarketDay={true} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="vintage">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketDayProducts
                  .filter((p) => p.isVintage)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} isMarketDay={true} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="bulk">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {marketDayProducts
                  .filter((p) => p.description.toLowerCase().includes("bulk"))
                  .map((product) => (
                    <ProductCard key={product.id} product={product} isMarketDay={true} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Referral Section */}
      <section id="referral" className="py-12 bg-amber-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Refer Friends & Earn Rewards</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Invite your friends to join Wazora's Market Day and earn extra spins and exclusive discounts!
            </p>

            <Card className="bg-white dark:bg-gray-800 p-6">
              <div className="mb-6">
                <p className="font-medium mb-2">Your Referral Link</p>
                <div className="flex">
                  <Input value="https://wazora.com/market-day?ref=YOUR_ID" readOnly className="rounded-r-none" />
                  <Button className="rounded-l-none">Copy</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="bg-amber-50 dark:bg-amber-900/20 p-4 text-center">
                  <p className="font-bold text-2xl text-amber-600">1</p>
                  <p className="font-medium">Friend Joins</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Friend signs up using your link</p>
                </Card>

                <Card className="bg-amber-50 dark:bg-amber-900/20 p-4 text-center">
                  <p className="font-bold text-2xl text-amber-600">2</p>
                  <p className="font-medium">Friend Shops</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">They make their first purchase</p>
                </Card>

                <Card className="bg-amber-50 dark:bg-amber-900/20 p-4 text-center">
                  <p className="font-bold text-2xl text-amber-600">3</p>
                  <p className="font-medium">You Earn</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get 2 spins + 15% discount</p>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="#">
                    <Share2 className="mr-2 h-4 w-4" /> Share on WhatsApp
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="#">Share on Instagram</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">How Market Day Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Market Day brings the excitement and energy of traditional African markets to your online shopping
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dynamic Pricing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sellers set dynamic prices that change based on demand, stock levels, and time remaining. Catch the
                  best deals before they're gone!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Spin-to-Win Rewards</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Earn spins through purchases and actions, then win exclusive discounts and rewards to use on Market
                  Day products.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Referral Rewards</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Invite friends to join Market Day and earn additional spins and discounts when they make their first
                  purchase.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link href="#deals">
                Explore Market Day Deals <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Spin Wheel Modal */}
      {showSpinWheel && (
        <SpinWheel rewards={spinRewards} onClose={() => setShowSpinWheel(false)} onSpinComplete={handleSpinComplete} />
      )}
    </div>
  )
}

// Input component for the referral section
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}
