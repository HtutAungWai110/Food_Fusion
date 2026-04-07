import { useQuery } from "@tanstack/react-query"

import { getRecipes } from "../hooks/useApi"
import { useEffect } from "react"

export default function Recipes(){

    const {data, isLoading, error} = useQuery({
        queryKey: ["recipes"],
        queryFn: getRecipes,
    })

    useEffect(() => {
        if (data){
            console.log(data)
        }
    }, [data])


    return (
        <div>Recipes collection</div>
    )
}