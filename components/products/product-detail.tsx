"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  MessageCircle, 
  ShoppingCart, 
  Star, 
  Shield, 
  Truck, 
  Users, 
  Eye,
  Clock,
  CheckCircle
} from "lucide-react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/data"

interface ProductDetailProps {
  product: Product
  onChatSeller: () => void
  onMakeOffer: () => void
  onBuyNow: () => void
}

export default function ProductDetail({
  product,
  onChatSeller,
  onMakeOffer,
  onBuyNow,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  // Mock data for demonstration
  const viewCount = Math.floor(Math.random() * 500) + 100
  const recentOffers = Math.floor(Math.random() * 10) + 1
  const isOnline = Math.random() > 0.5

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Trust Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isLimitedEdition && (
              <Badge className="bg-red-500 hover:bg-red-600">
                Limited Edition
              </Badge>
            )}
            {product.isVintage && (
              <Badge className="bg-purple-500 hover:bg-purple-600">
                Vintage
              </Badge>
            )}
            {product.isBargainable && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-black">
                Accepts Offers
              </Badge>
            )}
          </div>

          {/* Engagement Indicators */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 text-white text-sm">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{viewCount} viewing</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? "border-amber-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={product.image}
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Title and Price */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : ""}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="text-3xl font-bold">₦{product.price.toLocaleString()}</div>
            {product.isBargainable && product.minPrice && (
              <div className="text-amber-600">
                <span className="text-sm">Accepts offers from</span>
                <div className="font-semibold">₦{product.minPrice.toLocaleString()}</div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Payment Protected</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="h-4 w-4 text-blue-500" />
              <span>Delivery Assured</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-amber-500" />
              <span>Quality Checked</span>
            </div>
          </div>

          {/* Live Activity */}
          <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium">Live Activity</span>
                </div>
                <div className="text-sm text-amber-600">
                  {recentOffers} recent offers
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Seller Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Seller Information</h3>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>{product.seller.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{product.seller.name}</h4>
                <Badge variant="secondary" className="text-xs">
                  ✓ Verified Seller
                </Badge>
                {isOnline && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span>{product.seller.rating}</span>
                </div>
                <span>•</span>
                <span>Usually responds within minutes</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Product Description */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-gray-600">{product.description}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Category:</span>
              <span className="ml-2 font-medium">{product.category}</span>
            </div>
            <div>
              <span className="text-gray-500">Stock:</span>
              <span className="ml-2 font-medium">{product.stock} available</span>
            </div>
            {product.isLimitedEdition && (
              <div className="col-span-2">
                <span className="text-red-500 font-medium">
                  Only {product.stock} left in stock!
                </span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onBuyNow}
            className="w-full bg-black text-white hover:bg-gray-800"
            size="lg"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Buy Now - ₦{product.price.toLocaleString()}
          </Button>
          
          {product.isBargainable && (
            <Button
              onClick={onMakeOffer}
              variant="outline"
              className="w-full border-amber-500 text-amber-600 hover:bg-amber-50"
              size="lg"
            >
              Make Offer
            </Button>
          )}
          
          <Button
            onClick={onChatSeller}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat Seller
          </Button>
        </div>

        {/* Payment Trust Message */}
        <Card className="bg-green-50 border-green-200 dark:bg-green-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Payment Protected by Wazora
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Your payment is held in escrow until delivery is confirmed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
