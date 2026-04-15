import { likeRecipe, proxyFetch } from "../hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import SessionExpiredAlert from "./sessionExpiredAlert";
import { useDispatch } from "react-redux";
import { setUserNull } from "../states/UserState";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"


export default function RecipeLikeBtn({id, setMessage}){
    
   
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const {data, isLoading,} = useQuery({
        queryFn: async () => {
            const res = await proxyFetch(`/api/recipes/liked?id=${id}`, {
                method: "GET"
            })

            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            const data = await res.json();
            return data;

        },
        queryKey: ["liked", id],
        

    })

    


     const likeMutation = useMutation({
        mutationFn: (postId) => likeRecipe(postId),
        mutationKey: ["recipe_like"],
        onError: (e) => {
            if(e.message === "Unauthorized - No tokens found"){
                setMessage(<SessionExpiredAlert/>);
                dispatch(setUserNull);
               
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["liked", id]})
            queryClient.invalidateQueries({queryKey: ["recipe", id]})
        },
    })

    if(isLoading){
        return (
            <Skeleton className="w-[50px] h-[50px]"/>
        )
    }


    if(data){
        return (
        <>
        
        <button disabled={likeMutation.isPending} className="cursor-pointer active:scale-110" onClick={() => likeMutation.mutate(id)}>
            <ThumbsUp className={`w-5 h-5 text-rose-500 ${data?.liked ? "fill-rose-500" : "fill-none"}`} />
           
        </button>

       
        </>
        )
    }

    
}