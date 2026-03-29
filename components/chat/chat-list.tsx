"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreVertical, Archive, Settings } from "lucide-react"
import { motion } from "framer-motion"

interface ChatItem {
  id: string
  productId: string
  productName: string
  productImage: string
  sellerName: string
  sellerAvatar?: string
  sellerRating: number
  isVerified: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  hasActiveOffer: boolean
  offerStatus?: "pending" | "accepted" | "rejected"
  isOnline: boolean
}

interface ChatListProps {
  onChatSelect: (chatId: string) => void
  selectedChatId?: string
}

export default function ChatList({ onChatSelect, selectedChatId }: ChatListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  
  const chats: ChatItem[] = [
    {
      id: "1",
      productId: "1",
      productName: "Handcrafted Ankara Tote Bag",
      productImage: "/placeholder.svg?height=40&width=40",
      sellerName: "AfriCraft Designs",
      sellerAvatar: "/placeholder.svg?height=32&width=32",
      sellerRating: 4.8,
      isVerified: true,
      lastMessage: "I can offer you ₦35,000 for the bag",
      lastMessageTime: "2m ago",
      unreadCount: 2,
      hasActiveOffer: true,
      offerStatus: "pending",
      isOnline: true,
    },
    {
      id: "2",
      productId: "3",
      productName: "Handmade Leather Sandals",
      productImage: "/placeholder.svg?height=40&width=40",
      sellerName: "Lagos Leatherworks",
      sellerRating: 4.7,
      isVerified: true,
      lastMessage: "The sandals are available in size 42",
      lastMessageTime: "1h ago",
      unreadCount: 0,
      hasActiveOffer: false,
      isOnline: false,
    },
    {
      id: "3",
      productId: "2",
      productName: "Vintage Kente Cloth Wall Hanging",
      productImage: "/placeholder.svg?height=40&width=40",
      sellerName: "Heritage Artifacts",
      sellerRating: 4.9,
      isVerified: true,
      lastMessage: "Deal accepted! ₦75,000",
      lastMessageTime: "3h ago",
      unreadCount: 0,
      hasActiveOffer: true,
      offerStatus: "accepted",
      isOnline: true,
    },
  ]

  const filteredChats = chats.filter(chat =>
    chat.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 md:p-4 border-b">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-3 md:mb-4">
          <h2 className="text-lg md:text-xl font-semibold">Messages</h2>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 md:h-9 md:w-9">
              <Archive className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 md:h-9 md:w-9">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm md:text-base"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`mx-2 md:mx-2 my-2 cursor-pointer transition-all hover:shadow-md ${
                selectedChatId === chat.id
                  ? "bg-amber-50 border-amber-500 dark:bg-amber-950/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              onClick={() => onChatSelect(chat.id)}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex gap-3">
                  {/* Product Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={chat.productImage}
                      alt={chat.productName}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover"
                    />
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm md:text-base truncate">{chat.productName}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-xs md:text-sm text-gray-500">{chat.sellerName}</span>
                          {chat.isVerified && (
                            <Badge variant="secondary" className="text-xs h-4">
                              ✓
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                        {chat.unreadCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Last Message */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate pr-2">
                        {chat.lastMessage}
                      </p>
                      {chat.hasActiveOffer && (
                        <Badge
                          variant={chat.offerStatus === "accepted" ? "default" : "secondary"}
                          className="text-xs ml-2 flex-shrink-0"
                        >
                          {chat.offerStatus === "pending" && "Offer"}
                          {chat.offerStatus === "accepted" && "Deal"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredChats.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-6 md:p-8">
          <div className="text-center">
            <p className="text-gray-500 mb-2 text-sm md:text-base">No chats found</p>
            <p className="text-sm text-gray-400">Start a conversation from a product page</p>
          </div>
        </div>
      )}
    </div>
  )
}
