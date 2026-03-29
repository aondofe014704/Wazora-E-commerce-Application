"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Phone, Video, MoreVertical, Check, CheckCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  type: "text" | "offer" | "counter-offer" | "accepted-deal"
  content: string
  amount?: number
  status?: "pending" | "accepted" | "rejected"
  sender: "buyer" | "seller"
  timestamp: Date
  read: boolean
}

interface ChatContainerProps {
  productId: string
  productName: string
  sellerName: string
  sellerAvatar?: string
  sellerRating: number
  isVerified: boolean
}

export default function ChatContainer({
  productId,
  productName,
  sellerName,
  sellerAvatar,
  sellerRating,
  isVerified,
}: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "text",
      content: `Hi! I'm interested in the ${productName}. Is it still available?`,
      sender: "buyer",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: "2",
      type: "text",
      content: "Yes, it's available! The item is in excellent condition. Are you interested in making an offer?",
      sender: "seller",
      timestamp: new Date(Date.now() - 3000000),
      read: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        type: "text",
        content: newMessage,
        sender: "buyer",
        timestamp: new Date(),
        read: false,
      }
      setMessages([...messages, message])
      setNewMessage("")
      
      // Simulate seller typing and response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const sellerResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "text",
          content: "Thanks for your message! I'll get back to you shortly.",
          sender: "seller",
          timestamp: new Date(),
          read: false,
        }
        setMessages(prev => [...prev, sellerResponse])
      }, 2000)
    }
  }

  const renderMessage = (message: Message) => {
    const isBuyer = message.sender === "buyer"
    
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isBuyer ? "justify-end" : "justify-start"} mb-4`}
      >
        <div className={`max-w-[85%] md:max-w-[70%] ${isBuyer ? "order-2" : "order-1"}`}>
          <div
            className={`rounded-2xl px-3 md:px-4 py-2 ${
              isBuyer
                ? "bg-amber-500 text-black rounded-br-sm"
                : "bg-gray-800 text-white rounded-bl-sm"
            }`}
          >
            {message.type === "text" && (
              <p className="text-sm break-words">{message.content}</p>
            )}
            
            {message.type === "offer" && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Offer: ₦{message.amount?.toLocaleString()}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="h-6 text-xs">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    Counter
                  </Button>
                </div>
              </div>
            )}
            
            {message.type === "counter-offer" && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Counter Offer: ₦{message.amount?.toLocaleString()}</p>
                <Badge variant={message.status === "pending" ? "secondary" : "default"}>
                  {message.status}
                </Badge>
              </div>
            )}
            
            {message.type === "accepted-deal" && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-green-600">✓ Deal Accepted: ₦{message.amount?.toLocaleString()}</p>
                <Button size="sm" className="h-6 text-xs">
                  Proceed to Payment
                </Button>
              </div>
            )}
          </div>
          
          <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${isBuyer ? "justify-end" : "justify-start"}`}>
            <span className="hidden sm:inline">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="sm:hidden">{message.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            {isBuyer && (
              message.read ? <CheckCheck className="h-3 w-3 text-blue-500" /> : <Check className="h-3 w-3" />
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <Card className="h-[600px] md:h-[600px] flex flex-col">
      <CardHeader className="pb-3 px-3 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarImage src={sellerAvatar} />
              <AvatarFallback className="text-xs md:text-sm">{sellerName.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 md:gap-2">
                <CardTitle className="text-sm md:text-lg truncate">{sellerName}</CardTitle>
                {isVerified && (
                  <Badge variant="secondary" className="text-xs h-4 md:h-5">
                    ✓
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                <span>★ {sellerRating}</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Usually responds in minutes</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 md:h-9 md:w-9">
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 md:h-9 md:w-9">
              <Video className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 md:h-9 md:w-9">
              <MoreVertical className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[350px] md:h-[400px] p-3 md:p-4" ref={scrollAreaRef}>
          <div className="space-y-1">
            {messages.map(renderMessage)}
            
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start mb-4"
                >
                  <div className="bg-gray-800 rounded-2xl px-3 md:px-4 py-2 rounded-bl-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </CardContent>
      
      <Separator />
      
      <div className="p-3 md:p-4">
        <div className="flex gap-2 mb-2 md:mb-3">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 text-sm md:text-base"
          />
          <Button onClick={sendMessage} size="icon" className="h-9 w-9 md:h-10 md:w-10">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 text-xs">
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            Make Offer
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            Buy Now
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-xs">
            Share Product
          </Button>
        </div>
      </div>
    </Card>
  )
}
