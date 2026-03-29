"use client"

import { useState } from "react"
import ProductListings from "@/components/products/product-listings"
import { products } from "@/lib/data"
import { useRouter } from "next/navigation"

export default function ProductsPage() {
  const router = useRouter()

  const handleProductSelect = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  const handleChatSeller = (productId: string) => {
    // Navigate to chat with pre-selected product
    router.push(`/chat?product=${productId}`)
  }

  const handleMakeOffer = (productId: string) => {
    // Navigate to product page with offer modal open
    router.push(`/product/${productId}?offer=true`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">
          Discover unique African products and negotiate directly with sellers
        </p>
      </div>

      <ProductListings
        products={products}
        onProductSelect={handleProductSelect}
        onChatSeller={handleChatSeller}
        onMakeOffer={handleMakeOffer}
      />
    </div>
  )
}
