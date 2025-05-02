"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Percent, Tag } from "lucide-react"
import type { Product } from "@/lib/data"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  isMarketDay?: boolean
}

export default function ProductCard({ product, isMarketDay = false }: ProductCardProps) {
  const discountedPrice = product.discount ? (product.price * (1 - product.discount / 100)).toFixed(2) : null
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-md bg-gray-900 border-gray-800 hover:border-amber-500/50 transform hover:-translate-y-1 duration-300"
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
          {product.isLimitedEdition && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 animate-pulse-glow">
              Limited Edition
            </Badge>
          )}
          {product.isVintage && (
            <Badge className="absolute top-2 left-2 bg-purple-500 hover:bg-purple-600 animate-pulse-glow">
              Vintage
            </Badge>
          )}
          {product.isBargainable && !isMarketDay && (
            <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600 text-black animate-pulse-glow">
              <Tag className="h-3 w-3 mr-1" /> Bargain
            </Badge>
          )}
          {isMarketDay && product.discount && (
            <div className="absolute top-2 right-2 bg-amber-500 text-black font-bold rounded-full h-12 w-12 flex items-center justify-center animate-spin-slow">
              <span className="text-sm">-{product.discount}%</span>
            </div>
          )}
          {isHovered && product.isBargainable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-center px-4">
                <span className="font-bold text-amber-500">Make an offer!</span>
                <br />
                Negotiate from ${product.minPrice?.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2 text-sm text-gray-400">{product.category}</div>
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-white">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-300">Seller: {product.seller.name}</span>
          <div className="flex items-center ml-2">
            <span className="text-amber-500">★</span>
            <span className="text-sm ml-1 text-gray-300">{product.seller.rating}</span>
          </div>
        </div>
        <div className="flex items-center">
          {discountedPrice ? (
            <>
              <span className="font-bold text-lg text-white">${discountedPrice}</span>
              <span className="text-gray-500 line-through ml-2">${product.price.toFixed(2)}</span>
              <Badge variant="outline" className="ml-2 text-amber-500 border-amber-500 animate-pulse-glow">
                <Percent className="h-3 w-3 mr-1" /> {product.discount}% OFF
              </Badge>
            </>
          ) : (
            <>
              <span className="font-bold text-lg text-white">${product.price.toFixed(2)}</span>
              {product.isBargainable && !isMarketDay && product.minPrice && (
                <span className="text-sm text-amber-400 ml-2 animate-pulse-glow">
                  or make an offer from ${product.minPrice.toFixed(2)}
                </span>
              )}
            </>
          )}
        </div>
        {product.stock <= 5 && (
          <p className="text-red-500 text-sm mt-2 animate-pulse">Only {product.stock} left in stock!</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          asChild
          className="w-full bg-amber-500 hover:bg-amber-600 text-black transition-transform hover:scale-105"
        >
          <Link href={`/product/${product.id}`}>{isMarketDay ? "View Deal" : "View Product"}</Link>
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="border-gray-700 hover:border-amber-500 hover:bg-amber-500/20 transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
