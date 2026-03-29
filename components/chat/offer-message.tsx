"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Clock, TrendingUp } from "lucide-react"

interface OfferMessageProps {
  offerAmount: number
  originalPrice: number
  minPrice: number
  status: "pending" | "accepted" | "rejected"
  onAccept?: () => void
  onReject?: () => void
  onCounter?: (amount: number) => void
  isFromBuyer?: boolean
}

export default function OfferMessage({
  offerAmount,
  originalPrice,
  minPrice,
  status,
  onAccept,
  onReject,
  onCounter,
  isFromBuyer = true,
}: OfferMessageProps) {
  const [showCounterInput, setShowCounterInput] = useState(false)
  const [counterAmount, setCounterAmount] = useState(offerAmount)

  const handleCounter = () => {
    if (onCounter && counterAmount >= minPrice && counterAmount <= originalPrice) {
      onCounter(counterAmount)
      setShowCounterInput(false)
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "accepted":
        return <Check className="h-4 w-4" />
      case "rejected":
        return <X className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Card className={`border-2 ${getStatusColor()}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="font-medium">
              {isFromBuyer ? "Buyer's Offer" : "Seller's Offer"}
            </span>
          </div>
          <Badge variant="outline" className={getStatusColor()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>

        <div className="space-y-3">
          {/* Offer Amount */}
          <div className="text-center">
            <p className="text-2xl font-bold">₦{offerAmount.toLocaleString()}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-1">
              <span>{((offerAmount / originalPrice) * 100).toFixed(0)}% of asking price</span>
              <TrendingUp className="h-3 w-3" />
            </div>
          </div>

          <Separator />

          {/* Price Comparison */}
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Original Price:</span>
              <span>₦{originalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Offer Price:</span>
              <span className="font-medium">₦{offerAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>You save:</span>
              <span className="font-medium">₦{(originalPrice - offerAmount).toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <AnimatePresence mode="wait">
            {status === "pending" && !showCounterInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {isFromBuyer ? (
                  <>
                    <Button onClick={onAccept} className="w-full">
                      Accept Offer
                    </Button>
                    <Button onClick={onReject} variant="outline" className="w-full">
                      Reject Offer
                    </Button>
                    <Button onClick={() => setShowCounterInput(true)} variant="ghost" className="w-full">
                      Make Counter Offer
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={onAccept} className="w-full">
                      Accept Offer
                    </Button>
                    <Button onClick={() => setShowCounterInput(true)} variant="outline" className="w-full">
                      Make Counter Offer
                    </Button>
                  </>
                )}
              </motion.div>
            )}

            {status === "pending" && showCounterInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Your Counter Offer</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">₦</span>
                    <Input
                      type="number"
                      value={counterAmount}
                      onChange={(e) => setCounterAmount(Number(e.target.value))}
                      min={minPrice}
                      max={originalPrice}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <Slider
                  value={[counterAmount]}
                  min={minPrice}
                  max={originalPrice}
                  step={100}
                  onValueChange={(value) => setCounterAmount(value[0])}
                  className="my-4"
                />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Min: ₦{minPrice.toLocaleString()}</span>
                  <span>Max: ₦{originalPrice.toLocaleString()}</span>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCounter} className="flex-1">
                    Submit Counter
                  </Button>
                  <Button onClick={() => setShowCounterInput(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}

            {status === "accepted" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
                  <p className="text-green-800 dark:text-green-200 font-medium mb-2">
                    ✓ Deal Accepted!
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                    Both parties have agreed to ₦{offerAmount.toLocaleString()}
                  </p>
                  <Button className="w-full">
                    Proceed to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {status === "rejected" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3">
                  <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                    Offer Declined
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    The offer was not accepted
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
