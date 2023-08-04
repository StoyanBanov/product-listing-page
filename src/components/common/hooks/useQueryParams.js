import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useQueryParams = () => {
    const [queryParams, setQueryParams] = useSearchParams()

    const [queryParamsObj, setQueryParamsObj] = useState(null)

    useEffect(() => {
        setQueryParamsObj(Object.fromEntries(Array.from(queryParams.entries()).map(([k, v]) => !isNaN(Number(v)) && v !== '' ? [k, Number(v)] : [k, v])))
    }, [queryParams])

    return {
        queryParams,
        setQueryParams,
        queryParamsObj
    }
}