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

interface CartItems {
    quantity: number
    products: Product[]
}

export type Cart = {
    items: CartItems[]
    totalPrice: number
    totalItems: number
    loading?: boolean
}

export type ProductCardProps = {
    key: number
    name: string
    id: number
    price: number
    imageUrl: string
    itemsInCart: () => number
    isLoading: boolean
    addToCart: ({ productId, quantity }: CartParams) => void
}

export interface CategoriesProps {
    categories: CategoriesEnum[]
    drawerWidth: number
    onChangeCategory: (category: CategoriesEnum) => void
}
export interface SearchAppBarProps {
    totalItems: number | undefined
    totalPrice: number | undefined
    setSearch: (search: string) => void
}

export interface CartParams {
    productId: number
    quantity: number
}

export enum CategoriesEnum {
    All = 'All',
    Fruit = 'Fruit',
    Vegetables = 'Vegetables',
    Dairy = 'Dairy',
    Bakery = 'Bakery',
    Meat = 'Meat',
    Seafood = 'Seafood',
    Snacks = 'Snacks',
    Beverages = 'Beverages',
}

export interface CartItem {
    product: Product
    quantity: number
}
