import React from 'react'

interface ErrorPageProps {
    error?: {
        statusText?: string
        message?: string
    }
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => (
    <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
            <i>{error?.statusText || error?.message}</i>
        </p>
    </div>
)

export default ErrorPage
