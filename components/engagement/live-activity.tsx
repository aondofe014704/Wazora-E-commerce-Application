"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Eye, 
  Users, 
  MessageCircle, 
  TrendingUp,
  Activity,
  Clock,
  Zap
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LiveActivityProps {
  productId: string
  productName: string
}

interface ActivityEvent {
  id: string
  type: "view" | "offer" | "chat" | "purchase"
  message: string
  timestamp: Date
  userId: string
  userName?: string
  amount?: number
}

export default function LiveActivity({ productId, productName }: LiveActivityProps) {
  const [activities, setActivities] = useState<ActivityEvent[]>([])
  const [viewCount, setViewCount] = useState(0)
  const [activeUsers, setActiveUsers] = useState(0)
  const [recentOffers, setRecentOffers] = useState(0)

  // Simulate live activity
  useEffect(() => {
    const generateActivity = () => {
      const types: ActivityEvent["type"][] = ["view", "offer", "chat", "purchase"]
      const randomType = types[Math.floor(Math.random() * types.length)]
      
      const event: ActivityEvent = {
        id: Date.now().toString(),
        type: randomType,
        message: "",
        timestamp: new Date(),
        userId: `user-${Math.random()}`,
      }

      switch (randomType) {
        case "view":
          event.message = `Someone is viewing ${productName}`
          setViewCount(prev => prev + 1)
          break
        case "offer":
          event.amount = Math.floor(Math.random() * 50000) + 10000
          event.message = `New offer of ₦${event.amount.toLocaleString()}`
          event.userName = `Buyer${Math.floor(Math.random() * 100)}`
          setRecentOffers(prev => prev + 1)
          break
        case "chat":
          event.message = `New chat started`
          break
        case "purchase":
          event.amount = Math.floor(Math.random() * 50000) + 10000
          event.message = `Item purchased for ₦${event.amount.toLocaleString()}`
          break
      }

      setActivities(prev => [event, ...prev].slice(0, 10))
    }

    // Generate initial activity
    for (let i = 0; i < 5; i++) {
      generateActivity()
    }

    // Generate new activity periodically
    const interval = setInterval(generateActivity, 8000)
    
    // Update active users
    const usersInterval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 20) + 5)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(usersInterval)
    }
  }, [productName])

  const getActivityIcon = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "view":
        return <Eye className="h-4 w-4" />
      case "offer":
        return <TrendingUp className="h-4 w-4" />
      case "chat":
        return <MessageCircle className="h-4 w-4" />
      case "purchase":
        return <Zap className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: ActivityEvent["type"]) => {
    switch (type) {
      case "view":
        return "text-blue-600 bg-blue-100"
      case "offer":
        return "text-amber-600 bg-amber-100"
      case "chat":
        return "text-green-600 bg-green-100"
      case "purchase":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000)
    
    if (seconds < 60) return "Just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="space-y-4">
      {/* Live Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Eye className="h-4 w-4 text-blue-600" />
              <span className="ml-1 text-xs text-blue-600 font-medium">Live Views</span>
            </div>
            <div className="text-lg font-bold text-blue-800">{viewCount}</div>
            <div className="text-xs text-blue-600">people viewing</div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-amber-600" />
              <span className="ml-1 text-xs text-amber-600 font-medium">Offers</span>
            </div>
            <div className="text-lg font-bold text-amber-800">{recentOffers}</div>
            <div className="text-xs text-amber-600">recent offers</div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-green-600" />
              <span className="ml-1 text-xs text-green-600 font-medium">Active</span>
            </div>
            <div className="text-lg font-bold text-green-800">{activeUsers}</div>
            <div className="text-xs text-green-600">users now</div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Activity
            </h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500">Live</span>
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={`p-1 rounded-full ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      {activity.message}
                      {activity.amount && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          ₦{activity.amount.toLocaleString()}
                        </Badge>
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                      {activity.userName && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{activity.userName}</span>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {activities.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent activity</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Engagement Prompt */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-amber-800">Popular Item</h4>
              <p className="text-sm text-amber-600">
                {viewCount} people have viewed this in the last hour
              </p>
            </div>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
              Make Offer Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
