import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useQueryParams = () => {
    const [queryParams, setQueryParams] = useSearchParams()

    const [queryParamsObj] = useState(Object.fromEntries(queryParams.entries()))

    return {
        queryParams,
        setQueryParams,
        queryParamsObj
    }
}