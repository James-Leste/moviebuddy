/** @format */

import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '@/views/LoginForm'
import RegisterForm from '@/views/RegisterForm'
import { useState } from 'react'
import { Link } from '@heroui/react'

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <>
            <div className='w-full flex flex-col items-center justify-center h-full'>
                <div className='border p-4 rounded-lg shadow-md w-full max-w-md'>
                    {isLogin ? <LoginForm /> : <RegisterForm />}

                    <div className='justify-center mt-5'>
                        <Link onPress={() => setIsLogin(!isLogin)}>
                            Switch to {isLogin ? 'Register' : 'Login'}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export const Route = createFileRoute('/auth')({
    component: Auth,
})
