/** @format */

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <h1>This is my page</h1>
            <p>
                A portable web service help you and your partner find
                movie/shows that you are both interested in.
            </p>
        </>
    )
}
