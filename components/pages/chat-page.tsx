"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Archive,
  Settings,
  Phone,
  Video
} from "lucide-react"
import ChatList from "@/components/chat/chat-list"
import ChatContainer from "@/components/chat/chat-container"
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

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for demonstration
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

  const selectedChat = chats.find(chat => chat.id === selectedChatId)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold">Messages</h1>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              {chats.reduce((sum, chat) => sum + chat.unreadCount, 0)} unread
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
            <Button size="icon" variant="ghost">
              <Archive className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat List */}
        <div className="w-full md:w-96 bg-white border-r">
          <ChatList
            onChatSelect={setSelectedChatId}
            selectedChatId={selectedChatId || undefined}
          />
        </div>

        {/* Chat Container */}
        <div className="hidden md:flex flex-1">
          {selectedChat ? (
            <ChatContainer
              productId={selectedChat.productId}
              productName={selectedChat.productName}
              sellerName={selectedChat.sellerName}
              sellerAvatar={selectedChat.sellerAvatar}
              sellerRating={selectedChat.sellerRating}
              isVerified={selectedChat.isVerified}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a chat from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile View - Show chat when selected */}
        {selectedChat && (
          <div className="md:hidden fixed inset-0 bg-white z-50">
            <div className="flex items-center justify-between p-4 border-b">
              <Button
                variant="ghost"
                onClick={() => setSelectedChatId(null)}
              >
                ← Back
              </Button>
              <div className="flex items-center gap-2">
                <span className="font-medium">{selectedChat.sellerName}</span>
                {selectedChat.isOnline && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                )}
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <ChatContainer
              productId={selectedChat.productId}
              productName={selectedChat.productName}
              sellerName={selectedChat.sellerName}
              sellerAvatar={selectedChat.sellerAvatar}
              sellerRating={selectedChat.sellerRating}
              isVerified={selectedChat.isVerified}
            />
          </div>
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <Button size="lg" className="rounded-full w-14 h-14 bg-amber-500 hover:bg-amber-600">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}
