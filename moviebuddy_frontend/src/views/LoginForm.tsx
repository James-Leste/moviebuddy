/** @format */
import { useState } from 'react'
import { Form, Input, Button, Alert } from '@heroui/react'
import { useCustomStore } from '@/hooks/store'
import { useRouter } from '@tanstack/react-router'
import { login, getUser } from '@/services/auth'
import Cookies from 'js-cookie'

export default function LoginForm() {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const setToken = useCustomStore((state) => state.setToken)
    const setUser = useCustomStore((state) => state.setUser)
    const router = useRouter()
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        setIsSuccess(false)
        try {
            const result = await login(username, password)
            setToken(result.access_token)
            Cookies.set('token', result.access_token, {
                expires: 7, // Expires in 7 days
            })

            // Fetch user data immediately after successful login
            const user = await getUser()
            setUser(user)

            console.log('Login successful:', result)
            setIsSuccess(true)
            await new Promise((resolve) => setTimeout(resolve, 3000))
            await router.invalidate()
            router.navigate({ to: '/movieList' })
        } catch (err) {
            setError('Login failed.')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className='text-green-500 mb-4'>
                {isSuccess && (
                    <Alert
                        color={'success'}
                        title={`Login successful! Redirecting...`}
                    />
                )}
                {error && (
                    <Alert
                        color={'danger'}
                        title={`Please fill out the form.`}
                    />
                )}
            </div>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    isRequired
                    errorMessage='Please enter a valid username'
                    label='Username'
                    labelPlacement='outside'
                    name='username'
                    placeholder='Enter your username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    isRequired
                    errorMessage='Please enter a valid email'
                    label='Password'
                    labelPlacement='outside'
                    name='password'
                    placeholder='Enter your password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='text-red-500'>{error}</div>
                <div className='flex gap-2 mt-2'>
                    <Button
                        isLoading={isLoading}
                        color='primary'
                        type='submit'
                        isDisabled={username === '' || password === ''}
                    >
                        Submit
                    </Button>
                    <Button
                        type='reset'
                        variant='flat'
                        onPress={() => {
                            setUsername('')
                            setPassword('')
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </Form>
        </>
    )
}
