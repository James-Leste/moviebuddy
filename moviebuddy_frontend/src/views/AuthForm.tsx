/** @format */
import { useState } from 'react'
import { Form, Input, Button } from '@heroui/react'
import axios from 'axios'

export default function App() {
    const [action, setAction] = useState('')

    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <Form
                className='w-full max-w-sm flex flex-col gap-4 items-center mb-5'
                onReset={() => setAction('reset')}
                onSubmit={(e) => {
                    e.preventDefault()
                    let data = Object.fromEntries(new FormData(e.currentTarget))

                    const params = new URLSearchParams()
                    params.append('username', data.username.toString())
                    params.append('password', data.password.toString())
                    axios.post('http://localhost:8000/api/v1/token', params)
                    setAction(`submit ${JSON.stringify(data)}`)
                }}
            >
                <Input
                    isRequired
                    errorMessage='Please enter a valid username'
                    label='Username'
                    labelPlacement='outside'
                    name='username'
                    placeholder='Enter your username'
                    type='text'
                />

                <Input
                    isRequired
                    errorMessage='Please enter a valid email'
                    label='Password'
                    labelPlacement='outside'
                    name='password'
                    placeholder='Enter your password'
                    type='password'
                />
                <div className='flex gap-2'>
                    <Button color='primary' type='submit'>
                        Submit
                    </Button>
                    <Button type='reset' variant='flat'>
                        Reset
                    </Button>
                </div>
                {action && (
                    <div className='text-small text-default-500'>
                        Action: <code>{action}</code>
                    </div>
                )}
            </Form>
        </div>
    )
}
