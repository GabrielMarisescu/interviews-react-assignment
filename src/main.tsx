import './index.css'
import './mocks/browser.ts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { enableMockServiceWorker } from './mocks/browser.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'

enableMockServiceWorker().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
})
