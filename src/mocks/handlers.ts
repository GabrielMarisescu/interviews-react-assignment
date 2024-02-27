import { delay, http, HttpResponse } from 'msw'
import { names } from './names.ts'

type Product = {
    id: number
    name: string
    imageUrl: string
    price: number
    category: string
}

const categories = [
    'Fruit',
    'Vegetables',
    'Dairy',
    'Bakery',
    'Meat',
    'Seafood',
    'Snacks',
    'Beverages',
]

function randomGroceryCategory() {
    return categories[Math.floor(Math.random() * categories.length)]
}

// generate a rondom list of product with approriate library
const products: Product[] = names.map((name, index) => ({
    id: index,
    name: name,
    imageUrl: `https://via.placeholder.com/150?text=Product+${index}`,
    price: parseFloat((Math.random() * 40).toFixed(2)),
    category: randomGroceryCategory(),
}))

let cart: Record<number, number> = {}

function computeCart() {
    const detailedCart = Object.entries(cart)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, quantity]) => quantity > 0)
        .map(([productId, quantity]) => {
            const product = products.find(
                (p) => p.id === parseInt(productId, 10)
            )!
            return {
                product,
                quantity,
            }
        })
    const totalPrice = detailedCart.reduce(
        (acc, { product, quantity }) => acc + product.price * quantity,
        0
    )
    const totalItems = detailedCart.reduce(
        (acc, { quantity }) => acc + quantity,
        0
    )
    return HttpResponse.json({
        items: detailedCart,
        totalPrice,
        totalItems,
    })
}

export const handlers = [
    http.get('/products', async ({ request }) => {
        await delay()
        // Construct a URL instance out of the intercepted request.
        const url = new URL(request.url)

        // Read the "id" URL query parameter using the "URLSearchParams" API.
        // Given "/product?id=1", "productId" will equal "1".
        const searchQuery = url.searchParams.get('q')
        const category = url.searchParams.get('category')
        const page = url.searchParams.get('page') || '0'
        const limit = url.searchParams.get('limit') || '10'

        const filteredProducts = products.filter((product) => {
            if (
                searchQuery &&
                !product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                return false
            }
            if (category && product.category !== category) {
                return false
            }
            return true
        })
        const realPage = parseInt(page, 10) || 0
        const realLimit = parseInt(limit, 10) || 10
        const pageList = filteredProducts.slice(
            realPage * realLimit,
            (realPage + 1) * realLimit
        )

        return HttpResponse.json({
            products: pageList,
            total: filteredProducts.length,
            hasMore: realPage * realLimit + realLimit < filteredProducts.length,
        })
    }),
    http.post<never, { productId: number; quantity: number }>(
        '/cart',
        async ({ request }) => {
            await delay(1000)
            const { productId, quantity } = await request.json()
            const currentQuantity = cart[productId] || 0
            cart[productId] = currentQuantity + quantity
            return computeCart()
        }
    ),
    http.get('/cart', async () => {
        await delay()
        return computeCart()
    }),
    http.post('/orders', async () => {
        await delay(1500)

        cart = {}

        return new HttpResponse(
            undefined,
            Math.random() > 0.5 ? { status: 200 } : { status: 500 }
        )
    }),
]
