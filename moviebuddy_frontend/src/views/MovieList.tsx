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
    Pagination,
} from '@heroui/react'
import { useMovieInfoStore, useMovieListStore } from '@/hooks/MovieInfoStore'
import { useEffect, useState } from 'react'
import { getMovieInfo, getMovieList } from '@/actions/movieSearch'
import Topbar from '@/components/topbar'

export default function MovieList() {
    const [name, setName] = useState('')
    const movieInfo = useMovieInfoStore((state) => state.meta)
    const { totalPages, movieList } = useMovieListStore((state) => state.movies)

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        getMovieList(name, currentPage)
    }, [currentPage])

    return (
        <>
            <Topbar></Topbar>

            <div className='flex flex-col items-center'>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        getMovieList(name)
                        setCurrentPage(1)
                    }}
                    className='flex flex-row items-center w-80'
                >
                    <Input
                        label='Movie name'
                        type='text'
                        value={name}
                        onValueChange={setName}
                    />
                    <Button type='submit'>click me</Button>
                </form>

                <div className='flex flex-row w-full overflow-x-scrol overflow-y-hidden'>
                    {movieList.map((movie) => (
                        <div key={movie.id} className='m-2 py-2'>
                            <Card
                                className='py-4 max-h-108 overflow-y-scroll'
                                onPress={async () => {
                                    await getMovieInfo(movie.id)
                                    onOpen()
                                }}
                                isPressable
                            >
                                <CardHeader className='pb-0 pt-2 px-4 flex-col items-start w-60'>
                                    <p className='text-tiny font-bold whitespace-nowrap hover:whitespace-normal overflow-hidden text-ellipsis ...'>
                                        {movie.title}
                                    </p>
                                    <small className='text-default-500'>
                                        <span className='font-thin'>
                                            Popularity:{' '}
                                        </span>
                                        {movie.popularity}
                                    </small>
                                </CardHeader>
                                <CardBody className='overflow-visible py-2 items-center'>
                                    <Image
                                        alt='Card background'
                                        className='object-cover rounded-xl'
                                        src={`https://image.tmdb.org/t/p/original/${movie.image}`}
                                        width={270}
                                        height={360}
                                        isBlurred
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-5 w-full items-center my-5'>
                <Pagination
                    color='secondary'
                    page={currentPage}
                    total={totalPages}
                    onChange={setCurrentPage}
                />
            </div>

            {/* Modal opened onClicked */}

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior='inside'
                size='lg'
            >
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
        </>
    )
}
