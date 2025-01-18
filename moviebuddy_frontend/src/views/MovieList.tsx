/** @format */
import {
    Card,
    Image,
    Button,
    Input,
    CardHeader,
    CardBody,
} from "@heroui/react"
import { useMovieInfoStore, useMovieListStore } from '@/hooks/MovieInfoStore'
import { useState } from 'react'
import { getMovieInfo, getMovieList } from '@/actions/movieSearch'

export default function MovieList() {
    const [name, setName] = useState('')
    const movieInfo = useMovieInfoStore((state) => state.meta)
    const movieList = useMovieListStore((state) => state.movies.movieList)
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
                    {/* <Button onPress={() => getMovieInfo(name)}>click me</Button> */}
                    <Button onPress={() => getMovieList(name)}>click me</Button>
                </div>

                <div className='flex flex-row w-full overflow-x-scroll'>
                    {movieList.map((movie) => (
                        <div key={movie.id}>
                            <Card className='py-4'>
                                <CardHeader className='pb-0 pt-2 px-4 flex-col items-start w-60'>
                                    <p className='text-tiny uppercase font-bold whitespace-nowrap hover:whitespace-normal w-full overflow-hidden text-ellipsis ...'>
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
