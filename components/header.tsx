"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Menu, X, User, Bell } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import LogoWithBubbles from "@/components/logo-with-bubbles"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const [scrollPosition, setScrollPosition] = useState(0)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const isMarketDay = pathname === "/market-day"

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Market Day", href: "/market-day" },
    { name: "Categories", href: "/categories" },
    { name: "Sellers", href: "/sellers" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (position / totalHeight) * 100

      setScrollProgress(progress)
      setIsScrollingDown(position > lastScrollPosition)
      setLastScrollPosition(position)
      setScrollPosition(position)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollPosition])

  const headerClasses = cn(
    "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
    scrollPosition > 50 ? "header-scroll" : "",
    isScrollingDown && scrollPosition > 100 ? "header-scroll-down" : "header-scroll-up",
  )

  return (
    <>
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <header className={headerClasses}>
        {isMarketDay && (
          <div className="bg-amber-500 py-1 px-4 text-center text-sm font-medium text-black">
            Market Day is LIVE! Spin the wheel for exclusive discounts!
          </div>
        )}
        <div className="container flex h-16 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LogoWithBubbles />
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground font-bold" : "text-foreground/60",
                )}
              >
                {item.name}
                {item.name === "Market Day" && <Badge className="ml-1 bg-amber-500 text-black">LIVE</Badge>}
              </Link>
            ))}
          </nav>

          <div className="flex items-center ml-auto">
            {isSearchOpen ? (
              <div className="relative flex items-center">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-[200px] md:w-[300px] pr-8"
                  autoFocus
                />
                <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            <Button variant="ghost" size="icon" className="ml-2">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Button variant="ghost" size="icon" className="ml-2">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>

            <Button variant="ghost" size="icon" className="ml-2 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-amber-500 text-black">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
