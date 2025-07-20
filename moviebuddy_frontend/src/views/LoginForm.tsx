/** @format */
import { useState } from 'react'
import { Form, Input, Button } from '@heroui/react'
import axios from 'axios'

export default function LoginForm() {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [errors, setErrors] = useState({})
    return (
        <>
            <h1 className='text-2xl font-bold mb-4'>Login</h1>
            <Form
                onSubmit={(e) => {
                    e.preventDefault()
                    const errors: Record<string, string> = {}

                    let data = Object.fromEntries(new FormData(e.currentTarget))
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
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className='flex gap-2 mt-2'>
                    <Button
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
