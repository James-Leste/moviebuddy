/** @format */

import { useEffect, useState } from 'react'
import { useCustomStore } from '@/hooks/store'
import { getMovieFavorByUser } from '@/services/moviefavor'
import { getMovieById } from '@/services/query_movies'
import { UserPublicSafe } from '@/types'

export const PersonalPage = () => {
    const user = useCustomStore((state) => state.user)
    const [favoriteMovies, setFavoriteMovies] = useState<any[]>([])
    const [loadingFavors, setLoadingFavors] = useState(true)
    const [favorError, setFavorError] = useState<string | null>(null)

    useEffect(() => {
        const fetchFavorsAndMovies = async () => {
            try {
                const favors = await getMovieFavorByUser()
                const favorList = Array.isArray(favors) ? favors : [favors]

                // Fetch movie info for each favor
                const movies: any[] = []
                for (const favor of favorList) {
                    try {
                        const movie = await getMovieById(favor.movie_id)
                        movies.push(movie)
                    } catch (err) {
                        movies.push({
                            id: favor.movie_id,
                            error: 'Failed to fetch movie info.',
                        })
                    }
                }
                setFavoriteMovies(movies)
            } catch (err) {
                setFavorError('Failed to load favorite movies.')
            } finally {
                setLoadingFavors(false)
            }
        }
        fetchFavorsAndMovies()
    }, [])

    if (!user) {
        return (
            <div className='flex items-center justify-center h-full'>
                <span className='text-gray-500'>No user info available.</span>
            </div>
        )
    }

    // Cast to UserPublicSafe if needed
    const safeUser = user as Partial<UserPublicSafe>
    // Use a temporary avatar for all users
    const tempAvatarUrl =
        'https://api.dicebear.com/7.x/identicon/svg?seed=' +
        encodeURIComponent(safeUser.username ?? 'user')

    return (
        <div className='w-full max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md my-8'>
            <div className='flex items-center gap-6 mb-6'>
                <img
                    src={tempAvatarUrl}
                    alt='Avatar'
                    className='w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow'
                />
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>
                        {safeUser.username}
                    </h1>
                    <p className='text-gray-500'>
                        {safeUser.full_name ?? 'No full name provided'}
                    </p>
                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded text-xs font-semibold ${safeUser.is_verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                    >
                        {safeUser.is_verified ? 'Verified' : 'Unverified'}
                    </span>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                        Bio
                    </h2>
                    <p className='text-gray-600 min-h-[40px]'>
                        {safeUser.bio ?? 'No bio provided.'}
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                        Location
                    </h2>
                    <p className='text-gray-600'>
                        {safeUser.location ?? 'Unknown'}
                    </p>
                </div>
            </div>
            <div className='mt-6'>
                <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                    Favorite Genres
                </h2>
                <div className='flex flex-wrap gap-2'>
                    {safeUser.favorite_genres &&
                    safeUser.favorite_genres.length > 0 ? (
                        safeUser.favorite_genres.map((genre) => (
                            <span
                                key={genre}
                                className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'
                            >
                                {genre}
                            </span>
                        ))
                    ) : (
                        <span className='text-gray-400'>
                            No favorite genres listed.
                        </span>
                    )}
                </div>
            </div>
            <div className='mt-6 grid grid-cols-2 gap-6'>
                <div>
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                        Account Created
                    </h2>
                    <p className='text-gray-600'>
                        {safeUser.created_at
                            ? new Date(safeUser.created_at).toLocaleString()
                            : 'Unknown'}
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                        Last Seen
                    </h2>
                    <p className='text-gray-600'>
                        {safeUser.last_seen
                            ? new Date(safeUser.last_seen).toLocaleString()
                            : 'Never'}
                    </p>
                </div>
            </div>

            {/* Favorite Movies Section */}
            <div className='mt-8'>
                <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                    Favorite Movies
                </h2>
                {loadingFavors ? (
                    <p className='text-gray-400'>Loading...</p>
                ) : favorError ? (
                    <p className='text-red-500'>{favorError}</p>
                ) : favoriteMovies.length > 0 ? (
                    <div className='flex flex-wrap gap-4'>
                        {favoriteMovies.map((movie) => (
                            <div
                                key={movie.id}
                                className='w-48 p-4 bg-gray-100 rounded-lg shadow flex flex-col items-center justify-center text-center'
                            >
                                {movie.error ? (
                                    <span className='text-red-400'>
                                        {movie.error}
                                    </span>
                                ) : (
                                    <>
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                                                    : '/movie_logo.svg'
                                            }
                                            alt={movie.title}
                                            className='w-32 h-48 object-cover rounded mb-2'
                                        />
                                        <div className='font-bold text-base text-gray-800 mb-1'>
                                            {movie.title}
                                        </div>
                                        <div className='text-xs text-gray-500 mb-1'>
                                            ID: {movie.id}
                                        </div>
                                        <div className='text-sm text-gray-600 line-clamp-3'>
                                            {movie.overview}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <span className='text-gray-400'>
                        No favorite movies found.
                    </span>
                )}
            </div>
        </div>
    )
}
