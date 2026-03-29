"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package,
  CreditCard,
  AlertCircle,
  ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"

interface EscrowPaymentProps {
  productId: string
  productName: string
  agreedPrice: number
  sellerName: string
  sellerId: string
  onPaymentComplete: () => void
}

type PaymentStep = "details" | "payment" | "processing" | "held" | "released" | "completed"

export default function EscrowPayment({
  productId,
  productName,
  agreedPrice,
  sellerName,
  sellerId,
  onPaymentComplete,
}: EscrowPaymentProps) {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("details")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock order data
  const orderId = `WZ-${Date.now()}`
  const deliveryFee = 2000
  const serviceFee = Math.floor(agreedPrice * 0.03) // 3% service fee
  const totalAmount = agreedPrice + deliveryFee + serviceFee

  const getStepProgress = () => {
    const steps = {
      details: 20,
      payment: 40,
      processing: 60,
      held: 80,
      released: 90,
      completed: 100,
    }
    return steps[currentStep]
  }

  const getStepIcon = (step: PaymentStep) => {
    switch (step) {
      case "details":
        return <Package className="h-5 w-5" />
      case "payment":
        return <CreditCard className="h-5 w-5" />
      case "processing":
        return <Clock className="h-5 w-5" />
      case "held":
        return <Lock className="h-5 w-5" />
      case "released":
        return <Truck className="h-5 w-5" />
      case "completed":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  const handlePayment = () => {
    setIsProcessing(true)
    setCurrentStep("processing")
    
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep("held")
      setIsProcessing(false)
    }, 3000)
  }

  const simulateDelivery = () => {
    setCurrentStep("released")
    setTimeout(() => {
      setCurrentStep("completed")
      onPaymentComplete()
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "details":
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm md:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product:</span>
                  <span className="font-medium truncate">{productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seller:</span>
                  <span className="font-medium truncate">{sellerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Agreed Price:</span>
                  <span className="font-medium">₦{agreedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-medium">₦{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee (3%):</span>
                  <span className="font-medium">₦{serviceFee.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base md:text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>₦{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm md:text-base">
                Your payment will be securely held in escrow until you confirm delivery of product.
              </AlertDescription>
            </Alert>

            <Button onClick={() => setCurrentStep("payment")} className="w-full text-sm md:text-base">
              Proceed to Payment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )

      case "payment":
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Payment Method</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant={paymentMethod === "card" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("card")}
                    className="h-16 md:h-20 flex-col"
                  >
                    <CreditCard className="h-5 w-5 md:h-6 md:w-6 mb-2" />
                    <span className="text-sm md:text-base">Card Payment</span>
                  </Button>
                  <Button
                    variant={paymentMethod === "bank" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("bank")}
                    className="h-16 md:h-20 flex-col"
                  >
                    <Package className="h-5 w-5 md:h-6 md:w-6 mb-2" />
                    <span className="text-sm md:text-base">Bank Transfer</span>
                  </Button>
                </div>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber" className="text-sm md:text-base">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="text-sm md:text-base" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-sm md:text-base">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="text-sm md:text-base" />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-sm md:text-base">CVV</Label>
                    <Input id="cvv" placeholder="123" className="text-sm md:text-base" />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="space-y-4">
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-sm md:text-base">
                    Bank transfer details will be provided after confirmation. You'll have 24 hours to complete transfer.
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-4 w-4 md:h-5 md:w-5 text-amber-600" />
                <span className="font-medium text-amber-800 text-sm md:text-base">Secure Payment</span>
              </div>
              <p className="text-xs md:text-sm text-amber-700">
                This payment is processed securely through Paystack and held in escrow by Wazora.
              </p>
            </div>

            <Button onClick={handlePayment} disabled={isProcessing} className="w-full text-sm md:text-base">
              {isProcessing ? "Processing..." : `Pay ₦${totalAmount.toLocaleString()}`}
            </Button>
          </div>
        )

      case "processing":
        return (
          <div className="text-center py-6 md:py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Clock className="h-8 w-8 md:h-12 md:w-12 text-amber-500" />
            </motion.div>
            <h3 className="text-base md:text-lg font-semibold mt-4">Processing Payment</h3>
            <p className="text-sm md:text-base text-gray-600">Please wait while we process your payment...</p>
          </div>
        )

      case "held":
        return (
          <div className="space-y-4 md:space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full mb-3 md:mb-4">
                <Lock className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <h3 className="text-base md:text-lg font-semibold">Payment Secured in Escrow</h3>
              <p className="text-sm md:text-base text-gray-600">₦{totalAmount.toLocaleString()} is now held securely</p>
            </div>

            <Card>
              <CardContent className="p-3 md:p-4">
                <div className="space-y-3 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      Payment Held
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Step:</span>
                    <span className="font-medium">Awaiting delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="bg-blue-50 border-blue-200">
              <Truck className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm md:text-base">
                The seller has been notified and will arrange delivery. Confirm receipt when you receive the product.
              </AlertDescription>
            </Alert>

            <Button onClick={simulateDelivery} variant="outline" className="w-full text-sm md:text-base">
              Simulate Delivery Confirmation
            </Button>
          </div>
        )

      case "released":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4"
              >
                <Truck className="h-8 w-8 text-blue-600" />
              </motion.div>
              <h3 className="text-lg font-semibold">Delivery Confirmed</h3>
              <p className="text-gray-600">Releasing payment to seller...</p>
            </div>
          </div>
        )

      case "completed":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Transaction Complete!</h3>
              <p className="text-gray-600">Payment has been released to the seller</p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amount Paid:</span>
                    <span className="font-medium">₦{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={onPaymentComplete} className="w-full">
              Continue Shopping
            </Button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="p-3 md:p-6">
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
          <span className="hidden sm:inline">Secure Escrow Payment</span>
          <span className="sm:hidden">Escrow</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-3 md:p-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-xs md:text-sm text-gray-600">Payment Progress</span>
            <span className="text-xs md:text-sm font-medium">{getStepProgress()}%</span>
          </div>
          <Progress value={getStepProgress()} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mb-4 md:mb-6">
          {(["details", "payment", "processing", "held", "released", "completed"] as PaymentStep[]).map((step, index) => (
            <div key={step} className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs ${
                  getStepProgress() > (index * 20) + 10
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {getStepIcon(step)}
              </div>
              <span className="text-xs text-gray-600 hidden sm:block">
                {step.charAt(0).toUpperCase() + step.slice(1)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        {/* Step Content */}
        {renderStepContent()}
      </CardContent>
    </Card>
  )
}
