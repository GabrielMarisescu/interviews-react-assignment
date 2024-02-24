import './index.css'
import './mocks/browser.ts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { enableMockServiceWorker } from './mocks/browser.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

enableMockServiceWorker().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </React.StrictMode>
    )
})
