export type Product = {
    id: number
    name: string
    imageUrl: string
    price: number
    category: string
    itemInCart: number
    loading: boolean
}

export type Cart = {
    items: Product[]
    totalPrice: number
    totalItems: number
}
