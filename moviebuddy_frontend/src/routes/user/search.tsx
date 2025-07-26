/** @format */

import { UserSearch } from '@/views/SearchUser'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/search')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <UserSearch />
        </>
    )
}
