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
import { useCustomStore } from '@/hooks/store'
import { useEffect, useState } from 'react'
import { getMovieInfo, getMovieList } from '@/actions/movieSearch'

export default function MovieList() {
    const [name, setName] = useState('')
    const movieInfo = useCustomStore((state) => state.meta)
    const { totalPages, movieList } = useCustomStore((state) => state.movies)

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className='mt-8 w-full flex flex-col items-center justify-start'>
            <div className='flex flex-col items-center justify-center'>
                <form
                    onSubmit={(event) => {
                        event.preventDefault()
                        getMovieList(name)
                        setCurrentPage(1)
                    }}
                    className='flex flex-row items-center gap-3 bg-white/80 p-4 rounded-xl shadow-md border border-gray-100 w-full max-w-xl mb-4'
                >
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='flex-1 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 shadow text-base transition-all duration-200 bg-gray-50 placeholder:text-gray-400 px-4 py-2 mr-2'
                        placeholder='Search for a movie...'
                        autoFocus
                    />
                    <button
                        type='submit'
                        className='rounded-lg px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-300'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={2}
                            stroke='currentColor'
                            className='w-5 h-5'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z'
                            />
                        </svg>
                        <span className='hidden sm:inline'>Search</span>
                    </button>
                </form>

                <div className='flex flex-wrap justify-center mt-4'>
                    {movieList.map((movie) => (
                        <div key={movie.id} className='m-2 py-2'>
                            <Card
                                className='py-4 max-h-108 overflow-y-hidden'
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

            <div>
                <Pagination
                    color='secondary'
                    page={currentPage}
                    total={totalPages}
                    onChange={(page: number) => {
                        setCurrentPage(page)
                        console.log(`Current page: ${page}`)
                        getMovieList(name, page)
                    }}
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
        </div>
    )
}
