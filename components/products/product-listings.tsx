"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  MessageCircle, 
  Eye,
  Users,
  Shield,
  Truck
} from "lucide-react"
import { motion } from "framer-motion"
import type { Product } from "@/lib/data"

interface ProductListingsProps {
  products: Product[]
  onProductSelect: (productId: string) => void
  onChatSeller: (productId: string) => void
  onMakeOffer: (productId: string) => void
}

export default function ProductListings({
  products,
  onProductSelect,
  onChatSeller,
  onMakeOffer,
}: ProductListingsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))]

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.seller.rating - a.seller.rating
        case "recent":
        default:
          return 0 // In real app, would sort by date
      }
    })

  const renderProductCard = (product: Product, index: number) => {
    // Mock engagement data - use deterministic values based on product ID to prevent hydration mismatch
    const viewCount = ((product.id.charCodeAt(0) * 7 + product.id.charCodeAt(1) || 0) % 400) + 100
    const isOnline = (product.id.charCodeAt(2) || 0) % 2 === 0
    const recentOffers = (product.id.charCodeAt(3) || 0) % 6

    return (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex flex-col gap-2 p-4">
                  <Button
                    size="sm"
                    onClick={() => onProductSelect(product.id)}
                    className="bg-white text-black hover:bg-gray-100 w-full sm:w-auto"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onChatSeller(product.id)}
                    className="border-white text-white hover:bg-white/20 w-full sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.isLimitedEdition && (
                  <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                    Limited
                  </Badge>
                )}
                {product.isVintage && (
                  <Badge className="bg-purple-500 hover:bg-purple-600 text-xs">
                    Vintage
                  </Badge>
                )}
                {product.isBargainable && (
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-black text-xs">
                    Offers
                  </Badge>
                )}
              </div>

              {/* Live Indicator */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                {isOnline && (
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="hidden sm:inline">Online</span>
                  </div>
                )}
                <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{viewCount}</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-3 md:p-4">
              {/* Seller Info */}
              <div className="flex items-center gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="text-xs">{product.seller.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-600 truncate">{product.seller.name}</span>
                    <Badge variant="secondary" className="text-xs h-4">
                      ✓
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span>{product.seller.rating}</span>
                </div>
                {isOnline && <div className="w-2 h-2 bg-green-500 rounded-full" />}
              </div>

              <div className="mb-2 text-xs text-gray-400">{product.category}</div>
              
              <h3 className="font-medium text-sm md:text-base mb-2 line-clamp-2 text-white cursor-pointer hover:text-amber-600 transition-colors" onClick={() => onProductSelect(product.id)}>
                {product.name}
              </h3>
              
              <div className="flex items-center mb-2">
                <span className="font-bold text-base md:text-lg text-white">₦{product.price.toLocaleString()}</span>
                {product.isBargainable && product.minPrice && (
                  <span className="text-xs md:text-sm text-amber-400 ml-2">
                    from ₦{product.minPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <div className="flex items-center gap-1">
                  <Shield className="h-3 w-3 text-green-500" />
                  <span className="hidden sm:inline">Protected</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1">
                  <Truck className="h-3 w-3 text-blue-500" />
                  <span className="hidden sm:inline">Delivery</span>
                </div>
                {recentOffers > 0 && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-amber-500" />
                      <span className="hidden sm:inline">{recentOffers} offers</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onMakeOffer(product.id)}
                  className="flex-1 border-amber-500 text-amber-600 hover:bg-amber-50 text-xs md:text-sm"
                >
                  Make Offer
                </Button>
                <Button
                  size="sm"
                  onClick={() => onChatSeller(product.id)}
                  className="flex-1 text-xs md:text-sm"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Chat</span>
                </Button>
              </div>

              {/* Stock Warning */}
              {product.stock <= 5 && (
                <div className="mt-2 text-xs text-red-500 font-medium">
                  Only {product.stock} left!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm md:text-base"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
                className="h-9 w-9 md:h-10 md:w-10"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="h-9 w-9 md:h-10 md:w-10"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" : "space-y-4"}>
        {filteredProducts.map((product, index) => renderProductCard(product, index))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-6 md:p-8 text-center">
            <div className="text-gray-500">
              <Search className="h-8 w-8 md:h-12 md:w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg md:text-xl font-medium mb-2">No products found</h3>
              <p className="text-sm md:text-base">Try adjusting your search or filters</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
