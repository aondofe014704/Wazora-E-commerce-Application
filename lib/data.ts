export type Product = {
  id: string
  name: string
  description: string
  price: number
  minPrice?: number
  image: string
  category: string
  seller: {
    id: string
    name: string
    rating: number
  }
  isBargainable: boolean
  isLimitedEdition?: boolean
  isVintage?: boolean
  stock: number
  discount?: number
}

export const products: Product[] = [
  {
    id: "1",
    name: "Handcrafted Ankara Tote Bag",
    description: "Beautiful handmade tote bag made with authentic Ankara fabric. Perfect for everyday use.",
    price: 45.99,
    minPrice: 32.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fashion",
    seller: {
      id: "s1",
      name: "AfriCraft Designs",
      rating: 4.8,
    },
    isBargainable: true,
    stock: 15,
  },
  {
    id: "2",
    name: "Vintage Kente Cloth Wall Hanging",
    description: "Authentic vintage Kente cloth from Ghana, perfect as a decorative wall hanging.",
    price: 89.99,
    minPrice: 65.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home & Decor",
    seller: {
      id: "s2",
      name: "Heritage Artifacts",
      rating: 4.9,
    },
    isBargainable: true,
    isVintage: true,
    stock: 3,
  },
  {
    id: "3",
    name: "Handmade Leather Sandals",
    description: "Traditional handcrafted leather sandals made by skilled artisans.",
    price: 59.99,
    minPrice: 42.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fashion",
    seller: {
      id: "s3",
      name: "Lagos Leatherworks",
      rating: 4.7,
    },
    isBargainable: true,
    stock: 20,
  },
  {
    id: "4",
    name: "Limited Edition African Art Print",
    description: "Limited edition print by renowned Nigerian artist. Only 50 prints available worldwide.",
    price: 120.0,
    minPrice: 95.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "Art",
    seller: {
      id: "s4",
      name: "AfriArt Gallery",
      rating: 5.0,
    },
    isBargainable: true,
    isLimitedEdition: true,
    stock: 5,
  },
  {
    id: "5",
    name: "Shea Butter Gift Set",
    description: "Organic shea butter products sourced directly from women's cooperatives in Ghana.",
    price: 35.99,
    minPrice: 28.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Beauty",
    seller: {
      id: "s5",
      name: "Natural Essence",
      rating: 4.6,
    },
    isBargainable: true,
    stock: 25,
  },
  {
    id: "6",
    name: "Handwoven Basket Set",
    description: "Set of 3 handwoven baskets in different sizes, perfect for storage or decoration.",
    price: 65.0,
    minPrice: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Home & Decor",
    seller: {
      id: "s6",
      name: "Woven Wonders",
      rating: 4.8,
    },
    isBargainable: true,
    stock: 10,
  },
  {
    id: "7",
    name: "African Spice Collection",
    description: "Collection of 6 authentic African spices with recipe book included.",
    price: 29.99,
    minPrice: 22.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Food",
    seller: {
      id: "s7",
      name: "Taste of Africa",
      rating: 4.9,
    },
    isBargainable: true,
    stock: 30,
  },
  {
    id: "8",
    name: "Vintage Tribal Mask",
    description: "Authentic vintage tribal mask from the 1950s. A rare collector's item.",
    price: 199.99,
    minPrice: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Art",
    seller: {
      id: "s8",
      name: "Heritage Artifacts",
      rating: 4.9,
    },
    isBargainable: true,
    isVintage: true,
    stock: 2,
  },
]

export const marketDayProducts: Product[] = [
  {
    id: "md1",
    name: "Limited Edition Adire Fabric Bundle",
    description: "Bundle of 5 yards of hand-dyed Adire fabric in exclusive patterns. Market Day special!",
    price: 120.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fabric",
    seller: {
      id: "s1",
      name: "AfriCraft Designs",
      rating: 4.8,
    },
    isBargainable: false,
    isLimitedEdition: true,
    stock: 10,
    discount: 30,
  },
  {
    id: "md2",
    name: "Bulk Handmade Soap Collection",
    description: "Set of 12 handmade soaps with natural African ingredients. Perfect for resellers!",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Beauty",
    seller: {
      id: "s5",
      name: "Natural Essence",
      rating: 4.6,
    },
    isBargainable: false,
    stock: 20,
    discount: 25,
  },
  {
    id: "md3",
    name: "Vintage Record Collection - African Classics",
    description: "Collection of 5 vintage vinyl records featuring classic African musicians from the 70s.",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Music",
    seller: {
      id: "s8",
      name: "Heritage Artifacts",
      rating: 4.9,
    },
    isBargainable: false,
    isVintage: true,
    stock: 1,
    discount: 15,
  },
  {
    id: "md4",
    name: "Handcrafted Jewelry Set - Market Day Special",
    description: "Exclusive jewelry set with necklace, earrings, and bracelet made from recycled materials.",
    price: 75.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jewelry",
    seller: {
      id: "s3",
      name: "Lagos Leatherworks",
      rating: 4.7,
    },
    isBargainable: false,
    isLimitedEdition: true,
    stock: 15,
    discount: 40,
  },
]

export type SpinReward = {
  id: string
  type: "discount" | "freeShipping" | "extraSpin" | "giftCard"
  value: number
  label: string
  color: string
  probability: number
}

export const spinRewards: SpinReward[] = [
  {
    id: "r1",
    type: "discount",
    value: 5,
    label: "5% OFF",
    color: "#FCD34D", // amber-300
    probability: 30,
  },
  {
    id: "r2",
    type: "discount",
    value: 10,
    label: "10% OFF",
    color: "#FBBF24", // amber-400
    probability: 25,
  },
  {
    id: "r3",
    type: "discount",
    value: 15,
    label: "15% OFF",
    color: "#F59E0B", // amber-500
    probability: 15,
  },
  {
    id: "r4",
    type: "discount",
    value: 20,
    label: "20% OFF",
    color: "#D97706", // amber-600
    probability: 10,
  },
  {
    id: "r5",
    type: "freeShipping",
    value: 0,
    label: "FREE SHIPPING",
    color: "#92400E", // amber-800
    probability: 10,
  },
  {
    id: "r6",
    type: "extraSpin",
    value: 1,
    label: "EXTRA SPIN",
    color: "#78350F", // amber-900
    probability: 8,
  },
  {
    id: "r7",
    type: "giftCard",
    value: 10,
    label: "$10 GIFT CARD",
    color: "#B45309", // amber-700
    probability: 2,
  },
]
