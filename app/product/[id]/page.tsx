"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { products } from "@/lib/data"
import ProductCard from "@/components/product-card"
import BargainingModal from "@/components/bargaining-modal"

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id) || products[0] // Fallback to first product if not found

  const [quantity, setQuantity] = useState(1)
  const [isBargainingOpen, setIsBargainingOpen] = useState(false)

  // Get similar products (same category)
  const similarProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Link>
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {product.isLimitedEdition && (
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">Limited Edition</Badge>
            )}
            {product.isVintage && (
              <Badge className="absolute top-4 left-4 bg-purple-500 hover:bg-purple-600">Vintage</Badge>
            )}
            {product.isBargainable && (
              <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600">Bargain</Badge>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <Star className="h-4 w-4 fill-amber-500 text-amber-500 fill-none" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">(24 reviews)</span>
              </div>
              <div className="mx-4 h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Sold by{" "}
                <Link href={`/seller/${product.seller.id}`} className="text-amber-600 hover:underline">
                  {product.seller.name}
                </Link>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.isBargainable && product.minPrice && (
                  <Badge variant="outline" className="ml-3 text-amber-600 border-amber-600">
                    Bargain from ${product.minPrice.toFixed(2)}
                  </Badge>
                )}
              </div>

              {product.isBargainable && product.minPrice && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Acceptable price range:</p>
                  <div className="relative pt-5 pb-1">
                    <Slider
                      defaultValue={[product.minPrice]}
                      min={product.minPrice}
                      max={product.price}
                      step={0.01}
                      disabled
                    />
                    <div className="absolute bottom-0 left-0 text-xs text-gray-600 dark:text-gray-400">
                      ${product.minPrice.toFixed(2)}
                    </div>
                    <div className="absolute bottom-0 right-0 text-xs text-gray-600 dark:text-gray-400">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center mb-6">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">{product.stock} available</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>

              {product.isBargainable && (
                <Button
                  variant="outline"
                  className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
                  onClick={() => setIsBargainingOpen(true)}
                >
                  Make an Offer
                </Button>
              )}

              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 mr-2 text-amber-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center text-sm">
                <Shield className="h-4 w-4 mr-2 text-amber-600" />
                <span>Secure payment & buyer protection</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2 text-amber-600" />
                <span>Bargaining window: 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="seller">Seller Info</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Details</h3>
              <p>
                {product.description} This product is handcrafted by skilled artisans using traditional techniques
                passed down through generations. Each piece is unique and may have slight variations, which adds to its
                authentic character.
              </p>

              <Accordion type="single" collapsible>
                <AccordionItem value="materials">
                  <AccordionTrigger>Materials & Care</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Made from high-quality, sustainably sourced materials. Hand wash only with mild soap and water.
                      Avoid direct sunlight for prolonged periods to maintain colors.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="dimensions">
                  <AccordionTrigger>Dimensions</AccordionTrigger>
                  <AccordionContent>
                    <p>Approximately 30cm x 20cm x 15cm. Weight: 0.5kg.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="origin">
                  <AccordionTrigger>Origin</AccordionTrigger>
                  <AccordionContent>
                    <p>Handcrafted in Lagos, Nigeria by local artisans from the Yoruba community.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500 fill-none" />
                </div>
                <span className="ml-2 text-lg font-medium">4.8 out of 5</span>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">(24 reviews)</span>
              </div>

              <div className="space-y-6">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    </div>
                    <span className="ml-2 font-medium">Excellent quality!</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    The craftsmanship is outstanding. I love the attention to detail and the authentic feel of this
                    product.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Chioma A. - 2 weeks ago</span>
                    <span className="mx-2">•</span>
                    <span>Verified Purchase</span>
                  </div>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-none text-gray-300 dark:text-gray-600" />
                    </div>
                    <span className="ml-2 font-medium">Great product, slow shipping</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    I love the product itself, but shipping took longer than expected. The bargaining feature was fun
                    though!
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>Kwame O. - 1 month ago</span>
                    <span className="mx-2">•</span>
                    <span>Verified Purchase</span>
                  </div>
                </div>
              </div>

              <Button variant="outline">View All Reviews</Button>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              <p>We partner with local delivery services to ensure your products arrive safely and on time.</p>

              <div className="space-y-2">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 mr-2 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Standard Shipping</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      3-5 business days - $5.99 (Free on orders over $50)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Truck className="h-5 w-5 mr-2 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Express Shipping</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">1-2 business days - $12.99</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Delivery Information</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  We currently deliver to major cities in Nigeria, Ghana, Kenya, and South Africa. Delivery times may
                  vary based on your location and product availability.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For rural areas, we partner with local couriers to ensure last-mile delivery. You'll receive real-time
                  tracking updates via SMS or the app.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="seller" className="py-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl font-bold">
                  {product.seller.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{product.seller.name}</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="ml-1 text-sm">{product.seller.rating}</span>
                    </div>
                    <span className="mx-2 text-gray-300 dark:text-gray-700">|</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Member since 2022</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                {product.seller.name} specializes in authentic African crafts and products. All items are ethically
                sourced and support local artisans and communities.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" asChild>
                  <Link href={`/seller/${product.seller.id}`}>Visit Shop</Link>
                </Button>
                <Button variant="outline">Contact Seller</Button>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Seller Policies</h4>
                <Accordion type="single" collapsible>
                  <AccordionItem value="returns">
                    <AccordionTrigger>Returns & Exchanges</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        This seller accepts returns within 14 days of delivery. Items must be in original condition with
                        tags attached.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="bargaining">
                    <AccordionTrigger>Bargaining Policy</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        This seller welcomes bargaining on most products. Offers are typically responded to within 24
                        hours. The seller has set minimum acceptable prices for each item.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Bargaining Modal */}
      {isBargainingOpen && <BargainingModal product={product} onClose={() => setIsBargainingOpen(false)} />}
    </div>
  )
}
