/** @format */

import RegisterForm from '@/views/RegisterForm'
import { Link } from '@heroui/react'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()
    return (
        <>
            <div className='w-full flex flex-col items-center justify-center h-full'>
                <div className='border p-4 rounded-lg shadow-md w-full max-w-md'>
                    <RegisterForm />

                    <div className='justify-center mt-5'>
                        <Link
                            onPress={() =>
                                router.navigate({ to: '/auth/login' })
                            }
                            className='text-sm'
                        >
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
