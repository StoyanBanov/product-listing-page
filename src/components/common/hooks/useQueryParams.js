import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export const useQueryParams = () => {
    const [queryParams, setQueryParams] = useSearchParams()

    const [queryParamsObj] = useState(Object.fromEntries(Array.from(queryParams.entries()).map(([k, v]) => !isNaN(Number(v)) ? [k, Number(v)] : [k, v])))

    return {
        queryParams,
        setQueryParams,
        queryParamsObj
    }
}