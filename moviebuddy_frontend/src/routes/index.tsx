/** @format */

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <h1>This is my page</h1>
        </>
    )
}
