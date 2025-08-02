/** @format */

import { PersonalPage } from '@/views/PersonalPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/personal')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <PersonalPage />
        </>
    )
}
