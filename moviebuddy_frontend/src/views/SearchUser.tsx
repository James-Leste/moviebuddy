/** @format */

import { searchUsers } from '@/services/usersearch'
import { UserPublicSafe } from '@/types'
import { useState } from 'react'

export const UserSearch = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState<UserPublicSafe[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setResults([])
            return
        }
        setLoading(true)
        setError(null)
        try {
            const response = await searchUsers(searchQuery)
            setResults(response)
        } catch (err) {
            setError('Failed to fetch results')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search for users...'
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
            {error && <p className='error'>{error}</p>}
            <ul>
                {results.map((user) => (
                    <li key={user.id}>
                        {user.username} - {user.full_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
