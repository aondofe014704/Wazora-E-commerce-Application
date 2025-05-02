"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import type { Product } from "@/lib/data"
import { Check, X, AlertCircle, Clock } from "lucide-react"

// Add these imports at the top
import { motion, AnimatePresence } from "framer-motion"

interface BargainingModalProps {
  product: Product
  onClose: () => void
}

export default function BargainingModal({ product, onClose }: BargainingModalProps) {
  // Keep minPrice for internal logic but don't display it to the user
  const minPrice = product.minPrice || product.price * 0.7
  const [offerPrice, setOfferPrice] = useState(minPrice + (product.price - minPrice) / 2)
  const [offerStatus, setOfferStatus] = useState<"pending" | "accepted" | "rejected" | "counter" | null>(null)
  const [counterOffer, setCounterOffer] = useState(minPrice + (product.price - minPrice) * 0.7)
  const [showCounterInput, setShowCounterInput] = useState(false)

  const handleSliderChange = (value: number[]) => {
    setOfferPrice(value[0])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    // Still check against minPrice internally, but don't show it to the user
    if (!isNaN(value) && value >= minPrice && value <= product.price) {
      setOfferPrice(value)
    }
  }

  const submitOffer = () => {
    // Simulate AI response - in a real app, this would call an API
    setOfferStatus("pending")

    setTimeout(() => {
      // For demo purposes, randomly decide the outcome
      const random = Math.random()
      if (offerPrice >= product.price * 0.85) {
        setOfferStatus("accepted")
      } else if (offerPrice >= product.price * 0.75) {
        setOfferStatus("counter")
      } else {
        setOfferStatus("rejected")
      }
    }, 2000)
  }

  const acceptCounterOffer = () => {
    setOfferStatus("accepted")
  }

  const makeCounterToCounter = () => {
    setShowCounterInput(true)
  }

  const submitCounterToCounter = () => {
    // In a real app, this would send another counter offer
    // For demo, just accept if it's close enough to the counter
    if (offerPrice >= counterOffer * 0.95) {
      setOfferStatus("accepted")
    } else {
      // Simulate rejection after counter-counter
      setOfferStatus("rejected")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Make an Offer</DialogTitle>
          <DialogDescription className="text-center">
            Negotiate a price for {product.name}. The seller will respond within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="animate-slide-in-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">Listed Price</p>
              <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            </div>
            <div className="animate-slide-in-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Your Offer</p>
              <p className="text-lg font-bold">${offerPrice.toFixed(2)}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {offerStatus === null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Your Offer</label>
                  <div className="flex items-center gap-4">
                    <span className="text-lg">$</span>
                    <Input
                      type="number"
                      value={offerPrice.toFixed(2)}
                      onChange={handleInputChange}
                      min={minPrice}
                      max={product.price}
                      step="0.01"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Slider
                    value={[offerPrice]}
                    min={minPrice}
                    max={product.price}
                    step={0.01}
                    onValueChange={handleSliderChange}
                    className="mt-6"
                  />
                  {/* Only show the listed price, not the minimum price */}
                  <div className="flex justify-end mt-2 text-sm text-gray-500">
                    <span>Listed Price: ${product.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg mb-6 bargain-glow">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 animate-pulse" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-300">Bargaining Tips</p>
                      <ul className="text-sm text-amber-700 dark:text-amber-400 list-disc list-inside mt-1">
                        <li>Start with a reasonable offer to show you're serious</li>
                        <li>Be prepared for a counter-offer from the seller</li>
                        <li>Consider the item's condition and market value</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {offerStatus === "pending" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <div className="animate-pulse flex flex-col items-center">
                  <Clock className="h-12 w-12 text-amber-600 mb-4 animate-spin-slow" />
                  <p className="text-lg font-medium mb-2">Sending your offer...</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The seller will respond to your offer of ${offerPrice.toFixed(2)} soon.
                  </p>
                </div>
              </motion.div>
            )}

            {offerStatus === "accepted" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4"
                  >
                    <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <p className="text-lg font-medium mb-2">Offer Accepted!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    The seller has accepted your offer of ${offerPrice.toFixed(2)}.
                  </p>
                  <Button className="w-full animate-pulse-glow" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </motion.div>
            )}

            {offerStatus === "rejected" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4"
                  >
                    <X className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </motion.div>
                  <p className="text-lg font-medium mb-2">Offer Declined</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    The seller has declined your offer of ${offerPrice.toFixed(2)}.
                  </p>
                  <div className="space-y-2 w-full">
                    <Button variant="outline" className="w-full" onClick={() => setOfferStatus(null)}>
                      Make Another Offer
                    </Button>
                    <Button className="w-full animate-pulse-glow" asChild>
                      <Link href="/checkout">Buy at Listed Price (${product.price.toFixed(2)})</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {offerStatus === "counter" && !showCounterInput && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="py-4"
              >
                <div className="flex flex-col items-center mb-6">
                  <p className="text-lg font-medium mb-2">Counter Offer Received</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    The seller has countered your offer of ${offerPrice.toFixed(2)}.
                  </p>
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg w-full bargain-glow">
                    <p className="font-medium text-center">Seller's Counter Offer</p>
                    <p className="text-2xl font-bold text-center text-amber-600 my-2 animate-pulse">
                      ${counterOffer.toFixed(2)}
                    </p>
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                      This is {((counterOffer / product.price) * 100).toFixed(0)}% of the original price
                    </p>
                  </div>
                </div>

                <div className="space-y-3 w-full">
                  <Button className="w-full animate-pulse-glow" onClick={acceptCounterOffer}>
                    Accept Counter Offer
                  </Button>
                  <Button variant="outline" className="w-full" onClick={makeCounterToCounter}>
                    Make Counter Offer
                  </Button>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/checkout">Decline and Buy at Listed Price</Link>
                  </Button>
                </div>
              </motion.div>
            )}

            {offerStatus === "counter" && showCounterInput && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="py-4"
              >
                <p className="font-medium mb-4">Make a Counter to the Seller's Offer</p>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Your Counter Offer</label>
                  <div className="flex items-center gap-4">
                    <span className="text-lg">$</span>
                    <Input
                      type="number"
                      value={offerPrice.toFixed(2)}
                      onChange={handleInputChange}
                      min={minPrice}
                      max={product.price}
                      step="0.01"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Slider
                    value={[offerPrice]}
                    min={minPrice}
                    max={product.price}
                    step={0.01}
                    onValueChange={handleSliderChange}
                    className="mt-6"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Seller's Offer: ${counterOffer.toFixed(2)}</span>
                    <span>Listed Price: ${product.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 w-full">
                  <Button className="w-full animate-pulse-glow" onClick={submitCounterToCounter}>
                    Submit Counter Offer
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowCounterInput(false)}>
                    Back to Seller's Offer
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {offerStatus === null && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submitOffer} className="animate-pulse-glow">
              Submit Offer
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
