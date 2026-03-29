"use client"

import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  CheckCircle, 
  Star, 
  Award, 
  Clock,
  Truck,
  Users,
  Verified
} from "lucide-react"
import { motion } from "framer-motion"

interface TrustBadgesProps {
  isVerified: boolean
  rating: number
  responseTime: string
  totalSales: number
  memberSince: string
  deliveryGuarantee: boolean
  paymentProtected: boolean
}

export default function TrustBadges({
  isVerified,
  rating,
  responseTime,
  totalSales,
  memberSince,
  deliveryGuarantee,
  paymentProtected,
}: TrustBadgesProps) {
  const badges = [
    {
      icon: Verified,
      label: "Verified Seller",
      description: "Identity verified by Wazora",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      show: isVerified,
    },
    {
      icon: Star,
      label: `${rating} Rating`,
      description: "High customer satisfaction",
      color: "bg-amber-100 text-amber-800 border-amber-200",
      show: rating >= 4.5,
    },
    {
      icon: Clock,
      label: `Quick Response`,
      description: `Replies in ${responseTime}`,
      color: "bg-green-100 text-green-800 border-green-200",
      show: true,
    },
    {
      icon: Award,
      label: "Top Seller",
      description: `${totalSales}+ sales`,
      color: "bg-purple-100 text-purple-800 border-purple-200",
      show: totalSales >= 100,
    },
    {
      icon: Shield,
      label: "Payment Protected",
      description: "Escrow payment system",
      color: "bg-green-100 text-green-800 border-green-200",
      show: paymentProtected,
    },
    {
      icon: Truck,
      label: "Delivery Guarantee",
      description: "Safe delivery promised",
      color: "bg-blue-100 text-blue-800 border-blue-200",
      show: deliveryGuarantee,
    },
    {
      icon: Users,
      label: `Member since ${memberSince}`,
      description: "Experienced seller",
      color: "bg-gray-100 text-gray-800 border-gray-200",
      show: true,
    },
  ]

  const visibleBadges = badges.filter(badge => badge.show)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Trust & Safety</h3>
      
      {/* Primary Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {visibleBadges.slice(0, 3).map((badge, index) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Badge
              variant="outline"
              className={`${badge.color} border-2 w-full justify-center py-2 px-3`}
            >
              <badge.icon className="h-4 w-4 mr-2" />
              <div className="text-center">
                <div className="font-medium text-sm">{badge.label}</div>
              </div>
            </Badge>
          </motion.div>
        ))}
      </div>

      {/* Additional Trust Indicators */}
      {visibleBadges.length > 3 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-600">Additional Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {visibleBadges.slice(3).map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (index + 3) * 0.1 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <badge.icon className="h-4 w-4 text-gray-400" />
                <div>
                  <span className="font-medium">{badge.label}</span>
                  <span className="text-gray-500 ml-1">• {badge.description}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Trust Score */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-green-800">Trust Score</h4>
            <p className="text-sm text-green-600">Based on verification, ratings, and history</p>
          </div>
          <div className="text-2xl font-bold text-green-800">
            {Math.min(100, Math.round(
              (isVerified ? 30 : 0) +
              (rating * 15) +
              (totalSales > 100 ? 25 : totalSales > 10 ? 15 : 5) +
              (paymentProtected ? 20 : 0) +
              (deliveryGuarantee ? 10 : 0)
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
