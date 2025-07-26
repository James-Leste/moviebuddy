/** @format */
import { useEffect, useState } from 'react'
import { Form, Input, Button, Alert } from '@heroui/react'
import { register } from '@/services/auth'
import { useRouter } from '@tanstack/react-router'

export default function RegisterForm() {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        setIsPasswordMatch(password === confirmPassword)
    }, [password, confirmPassword])

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsLoading(true)
        setIsSuccess(false)
        setError('')
        try {
            const result = await register(username, password, email)
            console.log('Register successful:', result)
            await router.invalidate()
            setIsSuccess(true)
            await new Promise((resolve) => setTimeout(resolve, 3000))
            router.navigate({ to: '/auth/login' })
        } catch (err) {
            setError('Registration failed.')
            setIsSuccess(false)
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
                        title={`Registration successful! Redirecting...`}
                    />
                )}
                {!isPasswordMatch && (
                    <Alert
                        color={'warning'}
                        title={`Passwords do not match!`}
                    />
                )}
                {error && (
                    <Alert
                        color={'danger'}
                        title={`Please fill out the form.`}
                    />
                )}
            </div>

            <h1 className='text-2xl font-bold mb-4'>Register</h1>
            <Form
                onSubmit={handleSubmit}
                className='w-full max-w-xs flex flex-col gap-4'
            >
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
                    label='Email'
                    labelPlacement='outside'
                    name='email'
                    placeholder='Enter your email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />

                <Input
                    isRequired
                    errorMessage='Please re-enter your password'
                    label='Confirm Password'
                    labelPlacement='outside'
                    name='confirmPassword'
                    placeholder='Re-enter your password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                />
                <div className='text-red-500'>{error}</div>
                <div className='flex gap-2 mt-2'>
                    <Button
                        isLoading={isLoading}
                        color='primary'
                        type='submit'
                        isDisabled={
                            !isPasswordMatch ||
                            username == '' ||
                            password == '' ||
                            confirmPassword == '' ||
                            email == ''
                        }
                    >
                        Submit
                    </Button>
                    <Button
                        type='reset'
                        variant='flat'
                        onPress={() => {
                            setUsername('')
                            setPassword('')
                            setConfirmPassword('')
                            setIsPasswordMatch(true)
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </Form>
        </>
    )
}
