import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Wazora</h3>
            <p className="text-sm text-gray-400 mb-4">
              Revolutionizing digital commerce in Africa with dynamic, culturally resonant shopping experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-amber-500">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Market Day
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Vintage Items
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Limited Editions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Bulk Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Bargaining History
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Referrals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  How to Bargain
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Market Day Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-amber-500">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 md:mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs md:text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Wazora. All rights reserved.
          </p>
          <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm">
            <Link href="#" className="text-gray-400 hover:text-amber-500">
              Terms
            </Link>
            <Link href="#" className="text-gray-400 hover:text-amber-500">
              Privacy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-amber-500">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
