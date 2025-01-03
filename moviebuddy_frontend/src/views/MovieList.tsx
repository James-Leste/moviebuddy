/** @format */
import {
    Card,
    Image,
    Button,
    Input,
    CardHeader,
    CardBody,
} from '@nextui-org/react'
import { queryMovies } from '@/services/query_movies'
import { MovieModel } from '@/types'
import { useMovieInfoStore, useMovieListStore } from '@/hooks/MovieInfoStore'
import { useState } from 'react'

async function getMovieInfo(name: string) {
    const data = await queryMovies(name)
    if (data.results.length === 0) {
        console.log('No movie found')
        return
    }
    const resultMovie: MovieModel = {
        id: data.results[0].id,
        title: data.results[0].title,
        image: data.results[0].poster_path,
        popularity: data.results[0].popularity,
    }

    useMovieInfoStore.setState({ meta: resultMovie })
    return resultMovie
}

async function getMovieList(name: string) {
    const data = await queryMovies(name)
    if (data.results.length === 0) {
        console.log('No movie found')
        return
    }
    const results: any[] = data.results
    const resultMovieList: MovieModel[] = results.map((movie) => {
        return {
            id: movie.id,
            title: movie.title,
            image: movie.poster_path,
            popularity: movie.popularity,
        }
    })

    useMovieListStore.setState({ movies: resultMovieList })
    return resultMovieList
}

export default function MovieList() {
    const [name, setName] = useState('')
    const movieInfo = useMovieInfoStore((state) => state.meta)
    const movieList = useMovieListStore((state) => state.movies)
    return (
        <>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row items-center w-80'>
                    <Input
                        label='Movie name'
                        type='text'
                        value={name}
                        onValueChange={setName}
                    />
                    <Button onPress={() => getMovieInfo(name)}>click me</Button>
                </div>
                {/* <div>
                    <p>Name: {movieInfo.title}</p>
                    <Image className='object-cover' src={url} width={200} />
                </div> */}

                <Card className='py-4 w-80'>
                    <CardHeader className='pb-0 pt-2 px-4 flex-col items-start overflow-x-hidden w-60'>
                        <p className='text-tiny uppercase font-bold whitespace-nowrap '>
                            <span className='font-thin'>Title: </span>
                            {movieInfo.title}
                        </p>
                        <small className='text-default-500'>
                            <span className='font-thin'>Popularity: </span>
                            {movieInfo.popularity}
                        </small>
                        {/* <h4 className='font-bold text-large'>
                                Frontend Radio
                            </h4> */}
                    </CardHeader>
                    <CardBody className='overflow-visible py-2 items-center'>
                        <Image
                            alt='Card background'
                            className='object-cover rounded-xl'
                            src={`https://image.tmdb.org/t/p/original/${movieInfo.image}`}
                            width={270}
                        />
                    </CardBody>
                </Card>
                <Button onPress={() => getMovieList(name)}>click me</Button>

                <div className='flex flex-row w-full overflow-x-scroll'>
                    {movieList.map((movie) => (
                        <div key={movie.id}>
                            <Card className='py-4'>
                                <CardHeader className='pb-0 pt-2 px-4 flex-col items-start overflow-x-hidden w-60'>
                                    <p className='text-tiny uppercase font-bold whitespace-nowrap '>
                                        <span className='font-thin'>
                                            Title:{' '}
                                        </span>
                                        {movie.title}
                                    </p>
                                    <small className='text-default-500'>
                                        <span className='font-thin'>
                                            Popularity:{' '}
                                        </span>
                                        {movie.popularity}
                                    </small>
                                    {/* <h4 className='font-bold text-large'>
                                    Frontend Radio
                                </h4> */}
                                </CardHeader>
                                <CardBody className='overflow-visible py-2 items-center'>
                                    <Image
                                        alt='Card background'
                                        className='object-cover rounded-xl'
                                        src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                                        width={270}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            {/* <Card isFooterBlurred className='border-none' radius='lg'>
                <Image
                    alt='Woman listing to music'
                    className='object-cover'
                    height={200}
                    src='https://nextui.org/images/hero-card.jpeg'
                    width={200}
                />
                <CardFooter className='justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
                    <p className='text-tiny text-white/80'>{movieInfo.title}</p>

                    <Button
                        className='text-tiny text-white bg-black/20'
                        color='default'
                        radius='lg'
                        size='sm'
                        variant='flat'
                    >
                        Notify me
                    </Button>
                </CardFooter>
            </Card> */}
        </>
    )
}
