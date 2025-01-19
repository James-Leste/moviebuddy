/** @format */
import {
    Card,
    Image,
    Button,
    Input,
    CardHeader,
    CardBody,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    useDraggable,
} from '@heroui/react'
import { useMovieInfoStore, useMovieListStore } from '@/hooks/MovieInfoStore'
import { useState, useRef } from 'react'
import { getMovieInfo, getMovieList } from '@/actions/movieSearch'
import Topbar from '@/components/topbar'

export default function MovieList() {
    const [name, setName] = useState('')
    const movieInfo = useMovieInfoStore((state) => state.meta)
    const movieList = useMovieListStore((state) => state.movies.movieList)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <div className='w-screen'>
                <Topbar></Topbar>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='lg'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>
                                {movieInfo.title}
                            </ModalHeader>
                            <ModalBody className='flex flex-row justify-center'>
                                <div className='w-1/2'>
                                    <Image
                                        src={`https://image.tmdb.org/t/p/original/${movieInfo.image}`}
                                        alt='Card background'
                                    />
                                </div>
                                <p className='w-1/2 h-full'>
                                    {movieInfo.overview}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color='primary' onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

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
                        <div key={movie.id} className='mx-2 py-2'>
                            <Card
                                className='py-4'
                                onPress={async () => {
                                    await getMovieInfo(movie.id)
                                    onOpen()
                                }}
                                isPressable
                            >
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
