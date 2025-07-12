/** @format */

import { createFileRoute } from '@tanstack/react-router'
import AuthForm from '@/views/AuthForm'

export const Route = createFileRoute('/AuthRoute')({
    component: About,
})

function About() {
    return (
        <>
            <AuthForm></AuthForm>
        </>
    )
}
