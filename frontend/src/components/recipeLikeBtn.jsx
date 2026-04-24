import { likeRecipe } from "../hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";


// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import apiClient from "../lib/client";


export default function RecipeLikeBtn({id, setMessage}){
    
   

    const queryClient = useQueryClient();
    const {data, isLoading,} = useQuery({
        queryFn: async () => {
            try {
                const res = await apiClient.get(`/recipes/liked`, {
                    params: { id }
                });
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || error.message);
            }

        },
        queryKey: ["liked", id],
        

    })

    


     const likeMutation = useMutation({
        mutationFn: (postId) => likeRecipe(postId),
        mutationKey: ["recipe_like"],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["liked", id]})
            queryClient.invalidateQueries({queryKey: ["recipe", id]})
        },
        onError: () => {
            setMessage({
                message: "Failed to like this post. Please try again.",
                status: "error"
            })
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