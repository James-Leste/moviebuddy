/** @format */

import LoginForm from '@/views/LoginForm'
import { Link } from '@heroui/react'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()
    return (
        <>
            <div className='w-full flex flex-col items-center justify-center h-full'>
                <div className='border p-4 rounded-lg shadow-md w-full max-w-md'>
                    <LoginForm />

                    <div className='justify-center mt-5'>
                        <Link
                            onPress={() =>
                                router.navigate({ to: '/auth/register' })
                            }
                            className='text-sm'
                        >
                            Don't have an account? Register
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
