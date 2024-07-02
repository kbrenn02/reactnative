// Create a custom hook to pull data from Appwrite
import { useState, useEffect } from "react"
import { Alert } from "react-native"

const useAppwrite = (fn: any) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fn();

            setData(response)
        } catch (error) {
            let errorMessage = 'An unknown error occurred'
            Alert.alert('Error', errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => fetchData();

    return { data, isLoading, refetch }
}

export default useAppwrite;