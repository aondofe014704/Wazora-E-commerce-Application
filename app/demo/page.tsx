"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MessageCircle, 
  ShoppingCart, 
  Users, 
  Shield, 
  Eye, 
  TrendingUp,
  ArrowRight
} from "lucide-react"

export default function DemoPage() {
  const features = [
    {
      title: "Product Listings",
      description: "Browse products with seller info, trust badges, and live activity",
      icon: ShoppingCart,
      href: "/products",
      status: "✅ Live",
    },
    {
      title: "Chat System",
      description: "WhatsApp-style messaging with sellers",
      icon: MessageCircle,
      href: "/chat",
      status: "✅ Live",
    },
    {
      title: "Product Details",
      description: "Complete product page with chat, offers, and trust indicators",
      icon: Eye,
      href: "/product/1",
      status: "✅ Live",
    },
    {
      title: "Bargaining System",
      description: "Make offers and negotiate prices directly",
      icon: TrendingUp,
      href: "/product/1?offer=true",
      status: "✅ Live",
    },
    {
      title: "Trust & Safety",
      description: "Verified sellers and escrow payments",
      icon: Shield,
      href: "/product/1",
      status: "✅ Live",
    },
    {
      title: "Live Activity",
      description: "Real-time viewing counts and engagement",
      icon: Users,
      href: "/product/1",
      status: "✅ Live",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Wazora Demo</h1>
        <p className="text-xl text-gray-600 mb-8">
          Experience the future of African e-commerce with live negotiation-powered commerce
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          <Button asChild size="lg">
            <Link href="/products">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Start Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/chat">
              <MessageCircle className="mr-2 h-5 w-5" />
              Open Chat
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {feature.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Button asChild className="w-full">
                <Link href={feature.href}>
                  Try it now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Quick Navigation</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">🏠 Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">🛍️ Products</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/chat">💬 Chat</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/product/1">📦 Product Demo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/product/2">🎨 Vintage Item</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/product/3">👗 Fashion</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
