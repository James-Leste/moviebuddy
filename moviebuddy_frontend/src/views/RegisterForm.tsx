/** @format */
import { useState } from 'react'
import { Form, Input, Button } from '@heroui/react'
import axios from 'axios'

export default function RegisterForm() {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [errors, setErrors] = useState({})
    return (
        <>
            <h1 className='text-2xl font-bold mb-4'>Register</h1>
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    let data = Object.fromEntries(new FormData(e.currentTarget))
                    const errors: Record<string, string> = {}

                    if (!data.username) {
                        errors.username = 'username not set'
                    }

                    if (!data.password) {
                        errors.password = 'password is required'
                    }
                    setErrors(errors)

                    const params = new URLSearchParams()
                    params.append('username', data.username.toString())
                    params.append('password', data.password.toString())
                    axios.post('http://localhost:8000/api/v1/token', params)
                }}
                className='w-full max-w-xs flex flex-col gap-4'
                validationErrors={errors}
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
                    label='Password'
                    labelPlacement='outside'
                    name='password'
                    placeholder='Enter your password'
                    type='password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setIsPasswordMatch(e.target.value === confirmPassword)
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
                        setIsPasswordMatch(e.target.value === password)
                    }}
                />

                <div className='flex gap-2 mt-2'>
                    <Button
                        color='primary'
                        type='submit'
                        isDisabled={
                            !isPasswordMatch ||
                            (username === '' &&
                                password === '' &&
                                confirmPassword === '')
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
                {!isPasswordMatch && (
                    <div className='text-red-500'>Passwords do not match!</div>
                )}
            </Form>
        </>
    )
}
