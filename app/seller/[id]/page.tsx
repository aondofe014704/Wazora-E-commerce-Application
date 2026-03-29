"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Shield, Truck, MessageCircle, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/data"

export default function SellerPage() {
  const { id } = useParams()
  
  // Mock seller data - in real app, fetch from API
  const seller = {
    id: id as string,
    name: "AfriCraft Designs",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    totalSales: 156,
    memberSince: "2022",
    location: "Lagos, Nigeria",
    isVerified: true,
    responseTime: "minutes",
    description: "Specializing in authentic African crafts and handmade products. All items are ethically sourced and support local artisans.",
  }

  // Get seller's products
  const sellerProducts = products.filter(p => p.seller.id === id)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/products">
            ← Back to Products
          </Link>
        </Button>
      </div>

      {/* Seller Info */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                <AvatarImage src={seller.avatar} />
                <AvatarFallback className="text-2xl">{seller.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold">{seller.name}</h1>
                {seller.isVerified && (
                  <Badge className="bg-blue-100 text-blue-800">
                    ✓ Verified Seller
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span>{seller.rating}</span>
                </div>
                <span>•</span>
                <span>{seller.totalSales} sales</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{seller.location}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Since {seller.memberSince}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{seller.description}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  <span>Responds in {seller.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span>Payment Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-amber-500" />
                  <span>Fast Delivery</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
                <Button variant="outline" className="flex-1">
                  View All Products
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seller's Products */}
      <div>
        <h2 className="text-xl font-bold mb-4">Products by {seller.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sellerProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">{product.name}</h3>
                <div className="text-lg font-bold mb-2">₦{product.price.toLocaleString()}</div>
                {product.isBargainable && (
                  <Badge variant="outline" className="text-xs">
                    Accepts Offers
                  </Badge>
                )}
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/product/${product.id}`}>View</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/chat?product=${product.id}`}>Chat</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
