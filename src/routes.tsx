import { createBrowserRouter } from 'react-router-dom'
import './index.css'
import ErrorPage from './Common/Components/errorPage'
import ProductPage from './Pages/ProductPage/index.tsx'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProductPage />,
        errorElement: <ErrorPage />,
    },
])
