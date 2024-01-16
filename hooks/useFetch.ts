import {useEffect, useState} from "react"

interface UseFetchOutput <T> {
    data: T
    isLoading: boolean
    error: unknown
    reFetch: () => void
}

/**
 * Custom hook to fetch data asynchronously.
 *
 * @template T - The type of data returned from the request.
 * @param {Promise<T>} request - The promise that resolves to the data.
 * @returns {UseFetchOutput<T>} An object containing the fetched data, loading status, error, and a function to refetch the data.
 */
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
