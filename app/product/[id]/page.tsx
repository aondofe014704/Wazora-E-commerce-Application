"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import ProductPage from "@/components/pages/product-page"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"

export default function ProductDetailPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const openOffer = searchParams.get("offer") === "true"
  
  const product = products.find((p) => p.id === id) || products[0]

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return <ProductPage product={product} />
}
