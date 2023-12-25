import {useEffect, useState} from "react"

interface UseFetchOutput <T> {
    data: T
    isLoading: boolean
    error: unknown
    reFetch: () => void
}
const useFetch = <T>(request: Promise<T>): UseFetchOutput<T> => {

    const [data, setData] = useState<T | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        (async () => await fetchData())()
    }, [])

    const fetchData = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await request
            setData(response)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const reFetch = async () => {
        setIsLoading(true)
        await fetchData()
    }

    return {
        data: data!,
        isLoading,
        error,
        reFetch: reFetch
    }
}

export default useFetch
