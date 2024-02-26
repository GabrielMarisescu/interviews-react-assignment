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

export interface CategoriesProps {
    categories: CategoriesEnum[]
    drawerWidth: number
    onChangeCategory: (category: CategoriesEnum) => void
}
export interface SearchAppBarProps {
    quantity: number
    price: number
    changeSearch: (search: string) => void
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
