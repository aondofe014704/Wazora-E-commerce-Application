"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Shield, Truck, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import EscrowPayment from "@/components/payments/escrow-payment"

export default function CheckoutPage() {
  const [showPayment, setShowPayment] = useState(false)
  
  // Mock order data
  const orderData = {
    productId: "1",
    productName: "Handcrafted Ankara Tote Bag",
    agreedPrice: 45000,
    sellerName: "AfriCraft Designs",
    sellerId: "s1",
  }

  const handlePaymentComplete = () => {
    // Redirect to order confirmation
    alert("Payment completed! Order confirmed.")
  }

  if (showPayment) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" onClick={() => setShowPayment(false)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Checkout
          </Button>
          <EscrowPayment
            {...orderData}
            onPaymentComplete={handlePaymentComplete}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your purchase with Wazora's secure payment system</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg">
                    <img
                      src="/placeholder.svg?height=80&width=80"
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{orderData.productName}</h3>
                    <p className="text-sm text-gray-600">Seller: {orderData.sellerName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Accepts Offers
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Verified Seller
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">₦{orderData.agreedPrice.toLocaleString()}</div>
                    <p className="text-sm text-gray-600">Agreed price</p>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product Price</span>
                    <span>₦{orderData.agreedPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span>₦2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee (3%)</span>
                    <span>₦{Math.floor(orderData.agreedPrice * 0.03).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₦{(orderData.agreedPrice + 2000 + Math.floor(orderData.agreedPrice * 0.03)).toLocaleString()}</span>
                  </div>
                </div>

                <Separator />

                {/* Payment Method */}
                <div>
                  <h3 className="font-medium mb-3">Payment Method</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-600 font-bold text-sm">₦</span>
                        </div>
                        <div>
                          <p className="font-medium">Paystack</p>
                          <p className="text-sm text-gray-600">Secure payment with card, bank transfer, or USSD</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Recommended
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Payment Protection</h4>
                      <p className="text-sm text-green-600 mt-1">
                        Your payment is held in escrow until you confirm delivery of the product. 
                        If there are any issues, we'll help resolve them.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                  size="lg"
                >
                  Proceed to Secure Payment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Standard Delivery</p>
                    <p className="text-sm text-gray-600">3-5 business days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Delivery Assurance</p>
                    <p className="text-sm text-gray-600">Tracked and insured</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{orderData.sellerName}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⭐ 4.8 rating</span>
                    <span>•</span>
                    <span>156 sales</span>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  ✓ Verified Seller
                </Badge>
                <p className="text-sm text-gray-600">
                  Usually responds within minutes
                </p>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full">
                  View Return Policy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
