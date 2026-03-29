"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, MessageCircle, Eye, Star, Shield, Truck } from "lucide-react"
import type { Product } from "@/lib/data"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  isMarketDay?: boolean
  onChatSeller?: (productId: string) => void
  onMakeOffer?: (productId: string) => void
}

export default function ProductCard({ 
  product, 
  isMarketDay = false,
  onChatSeller,
  onMakeOffer
}: ProductCardProps) {
  const discountedPrice = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : null
  const [isHovered, setIsHovered] = useState(false)
  
  // Mock engagement data
  const viewCount = Math.floor(Math.random() * 100) + 20
  const isOnline = Math.random() > 0.5

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg bg-gray-900 border-gray-800 hover:border-amber-500/50 transform hover:-translate-y-1 duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          
          {/* Trust Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isLimitedEdition && (
              <Badge className="bg-red-500 hover:bg-red-600 animate-pulse-glow text-xs">
                Limited
              </Badge>
            )}
            {product.isVintage && (
              <Badge className="bg-purple-500 hover:bg-purple-600 animate-pulse-glow text-xs">
                Vintage
              </Badge>
            )}
            {product.isBargainable && !isMarketDay && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-black animate-pulse-glow text-xs">
                Offers
              </Badge>
            )}
          </div>

          {/* Live Indicators */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {isOnline && (
              <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Online
              </div>
            )}
            <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {viewCount}
            </div>
          </div>

          {isMarketDay && product.discount && (
            <div className="absolute bottom-2 right-2 bg-amber-500 text-black font-bold rounded-full h-12 w-12 flex items-center justify-center animate-spin-slow">
              <span className="text-sm">-{product.discount}%</span>
            </div>
          )}
          
          {isHovered && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <div className="text-center">
                <p className="text-white font-bold text-lg mb-2">
                  {product.isBargainable ? "Make an offer!" : "View Details"}
                </p>
                {product.isBargainable && product.minPrice && (
                  <p className="text-white/80 text-sm">
                    From ₦{product.minPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        {/* Seller Info */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
            <span className="text-xs text-gray-300">{product.seller.rating}</span>
          </div>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-300 truncate">{product.seller.name}</span>
          <Badge variant="secondary" className="text-xs h-4 hidden sm:inline-flex">
            ✓
          </Badge>
          {isOnline && <div className="w-2 h-2 bg-green-500 rounded-full" />}
        </div>

        <div className="mb-2 text-xs sm:text-sm text-gray-400">{product.category}</div>
        
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-semibold text-sm sm:text-lg mb-2 line-clamp-2 text-white">{product.name}</h3>
        </Link>
        
        <div className="flex items-center mb-2">
          {discountedPrice ? (
            <>
              <span className="font-bold text-sm sm:text-lg text-white">₦{discountedPrice}</span>
              <span className="text-gray-500 line-through ml-2 text-xs sm:text-sm">₦{product.price.toFixed(2)}</span>
              <Badge variant="outline" className="ml-2 text-amber-500 border-amber-500 animate-pulse-glow text-xs">
                {product.discount}% OFF
              </Badge>
            </>
          ) : (
            <>
              <span className="font-bold text-lg text-white">₦{product.price.toLocaleString()}</span>
              {product.isBargainable && !isMarketDay && product.minPrice && (
                <span className="text-sm text-amber-400 ml-2 animate-pulse-glow">
                  or offer from ₦{product.minPrice.toLocaleString()}
                </span>
              )}
            </>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-400 mb-2">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
            <span className="hidden sm:inline">Protected</span>
            <span className="sm:hidden">✓</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Truck className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
            <span className="hidden sm:inline">Delivery</span>
            <span className="sm:hidden">🚚</span>
          </div>
        </div>
        
        {product.stock <= 5 && (
          <p className="text-red-500 text-xs sm:text-sm mt-2 animate-pulse">Only {product.stock} left!</p>
        )}
      </CardContent>
      
      <CardFooter className="p-3 sm:p-4 pt-0 flex gap-2">
        <Button
          asChild
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-black transition-transform hover:scale-105 text-sm"
        >
          <Link href={`/product/${product.id}`}>{isMarketDay ? "View Deal" : "View Product"}</Link>
        </Button>
        
        {onChatSeller && (
          <Button
            size="icon"
            variant="outline"
            onClick={() => onChatSeller(product.id)}
            className="border-gray-700 hover:border-amber-500 hover:bg-amber-500/20 transition-colors h-8 w-8 sm:h-10 sm:w-10"
          >
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
        
        {onMakeOffer && product.isBargainable && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onMakeOffer(product.id)}
            className="border-amber-500 text-amber-600 hover:bg-amber-50 text-xs px-2 h-8 sm:h-10"
          >
            <span className="hidden sm:inline">Offer</span>
            <span className="sm:hidden">₦</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
