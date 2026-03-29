"use client"

import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductListings from "@/components/products/product-listings"
import { products } from "@/lib/data"
import Link from "next/link"

export default function CategoryPage() {
  const { category } = useParams()
  
  // Get products in this category
  const categoryProducts = products.filter(p => 
    p.category.toLowerCase() === (category as string).toLowerCase()
  )

  const handleProductSelect = (productId: string) => {
    window.location.href = `/product/${productId}`
  }

  const handleChatSeller = (productId: string) => {
    window.location.href = `/chat?product=${productId}`
  }

  const handleMakeOffer = (productId: string) => {
    window.location.href = `/product/${productId}?offer=true`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/products" className="hover:text-gray-900">
          Products
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-medium capitalize">{category}</span>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">
          {category}
        </h1>
        <p className="text-gray-600">
          Discover authentic {category} from verified African sellers
        </p>
        
        <div className="flex items-center gap-4 mt-4">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            {categoryProducts.length} Products
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            All Sellers Verified
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Escrow Protected
          </Badge>
        </div>
      </div>

      {/* Products */}
      <ProductListings
        products={categoryProducts}
        onProductSelect={handleProductSelect}
        onChatSeller={handleChatSeller}
        onMakeOffer={handleMakeOffer}
      />

      {/* Empty State */}
      {categoryProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-sm mb-4">No products are currently available in this category.</p>
              <Button asChild>
                <Link href="/products">Browse All Products</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
