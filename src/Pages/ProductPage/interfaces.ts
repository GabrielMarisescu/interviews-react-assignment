export type Product = {
    id: number
    name: string
    imageUrl: string
    price: number
    itemsInCart: number
    category: string
}

export type FullProducts = {
    hasMore: boolean
    products: Product[]
    total: number
    pageParam: number
}

export type Cart = {
    items: Product[]
    totalPrice: number
    totalItems: number
}

export type ProductCardProps = Product & {
    key: number
    isLoading: boolean
}
