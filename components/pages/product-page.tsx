"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import ProductDetail from "@/components/products/product-detail"
import ChatContainer from "@/components/chat/chat-container"
import LiveActivity from "@/components/engagement/live-activity"
import TrustBadges from "@/components/trust/trust-badges"
import BargainingModal from "@/components/bargaining-modal"
import EscrowPayment from "@/components/payments/escrow-payment"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { Product } from "@/lib/data"

interface ProductPageProps {
  product: Product
}

export default function ProductPage({ product }: ProductPageProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [showBargainingModal, setShowBargainingModal] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [agreedPrice, setAgreedPrice] = useState(product.price)

  const handleChatSeller = () => {
    setActiveTab("chat")
  }

  const handleMakeOffer = () => {
    setShowBargainingModal(true)
  }

  const handleBuyNow = () => {
    setAgreedPrice(product.price)
    setShowPayment(true)
  }

  const handleOfferAccepted = (price: number) => {
    setAgreedPrice(price)
    setShowBargainingModal(false)
    setShowPayment(true)
  }

  const handlePaymentComplete = () => {
    setShowPayment(false)
    // In a real app, redirect to order confirmation or dashboard
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-4 md:mb-6">
          <span>Home</span>
          <span>›</span>
          <span className="hidden sm:inline">{product.category}</span>
          <span className="sm:hidden">Cat.</span>
          <span>›</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </div>

        {/* Product Header */}
        <div className="mb-4 md:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className="text-amber-600 border-amber-600 text-xs">
                  {product.category}
                </Badge>
                {product.isBargainable && (
                  <Badge className="bg-amber-500 hover:bg-amber-600 text-black text-xs">
                    Accepts Offers
                  </Badge>
                )}
                {product.isLimitedEdition && (
                  <Badge className="bg-red-500 hover:bg-red-600 text-xs">
                    Limited Edition
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
            </div>
            
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                ₦{product.price.toLocaleString()}
              </div>
              {product.isBargainable && product.minPrice && (
                <div className="text-xs md:text-sm text-amber-600">
                  From ₦{product.minPrice.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="details" className="text-xs sm:text-sm">Details</TabsTrigger>
            <TabsTrigger value="chat" className="text-xs sm:text-sm">Chat</TabsTrigger>
            <TabsTrigger value="activity" className="text-xs sm:text-sm">Activity</TabsTrigger>
            <TabsTrigger value="trust" className="text-xs sm:text-sm">Trust</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 md:space-y-6">
            <ProductDetail
              product={product}
              onChatSeller={handleChatSeller}
              onMakeOffer={handleMakeOffer}
              onBuyNow={handleBuyNow}
            />
          </TabsContent>

          <TabsContent value="chat" className="space-y-4 md:space-y-6">
            <Card>
              <CardContent className="p-3 md:p-6">
                <ChatContainer
                  productId={product.id}
                  productName={product.name}
                  sellerName={product.seller.name}
                  sellerRating={product.seller.rating}
                  isVerified={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 md:space-y-6">
            <Card>
              <CardContent className="p-3 md:p-6">
                <LiveActivity
                  productId={product.id}
                  productName={product.name}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trust" className="space-y-4 md:space-y-6">
            <Card>
              <CardContent className="p-3 md:p-6">
                <TrustBadges
                  isVerified={true}
                  rating={product.seller.rating}
                  responseTime="minutes"
                  totalSales={Math.floor(Math.random() * 500) + 50}
                  memberSince="2023"
                  deliveryGuarantee={true}
                  paymentProtected={true}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
          <Card>
            <CardContent className="p-3 md:p-4">
              <h3 className="font-semibold text-sm md:text-base mb-2">Product Information</h3>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Condition:</span>
                  <span className="font-medium">New</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Available:</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
                {product.isVintage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Era:</span>
                    <span className="font-medium">Vintage</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <h3 className="font-semibold text-sm md:text-base mb-2">Seller Information</h3>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium truncate">{product.seller.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <span className="font-medium">⭐ {product.seller.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response:</span>
                  <span className="font-medium">Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium truncate">Lagos, NG</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <h3 className="font-semibold text-sm md:text-base mb-2">Shipping & Returns</h3>
              <div className="space-y-2 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">₦2,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="font-medium">3-5 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Returns:</span>
                  <span className="font-medium">7 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className="font-medium">Escrow Protected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Modals */}
      {showBargainingModal && (
        <BargainingModal
          product={product}
          onClose={() => setShowBargainingModal(false)}
        />
      )}

      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <EscrowPayment
              productId={product.id}
              productName={product.name}
              agreedPrice={agreedPrice}
              sellerName={product.seller.name}
              sellerId={product.seller.id}
              onPaymentComplete={handlePaymentComplete}
            />
          </div>
        </div>
      )}
    </div>
  )
}
