/** @format */

import { HeroUIProvider } from '@heroui/react'
import '@/index.css'

import ReactDOM from 'react-dom/client'
import {
    RouterProvider,
    createRouter,
    NavigateOptions,
    ToOptions,
} from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

declare module '@react-types/shared' {
    interface RouterConfig {
        href: ToOptions['to']
        routerOptions: Omit<NavigateOptions, keyof ToOptions>
    }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <HeroUIProvider
            navigate={(to, options) => router.navigate({ to, ...options })}
            useHref={(to) => router.buildLocation({ to }).href}
        >
            <RouterProvider router={router} />
        </HeroUIProvider>
    )
}
