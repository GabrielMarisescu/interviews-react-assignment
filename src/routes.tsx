import { createBrowserRouter } from 'react-router-dom'
import './index.css'
import ErrorPage from './Common/Components/errorPage'
import App from './App'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
])
