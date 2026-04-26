import { likeRecipe } from "../hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp } from "lucide-react";


// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useState } from "react";


export default function RecipeLikeBtn({id, likes, isLiked, setMessage}){

    const [liked, setLiked] = useState(isLiked);
    const [totalLikes, setTotalLikes] = useState(likes);


     const likeMutation = useMutation({
        mutationFn: (postId) => likeRecipe(postId),
        mutationKey: ["recipe_like"],
        onError: () => {
            setMessage({
                message: "Failed to like this post. Please try again.",
                status: "error"
            })
            onLike()
        },
        onMutate: () => onLike()
    })

    
    const onLike = () => {
        if(liked){
            setTotalLikes(prev => prev - 1);
        } else {
            setTotalLikes(prev => prev + 1);
        }
        setLiked(!liked);
    }




        return (
        <>
        
        <button disabled={likeMutation.isPending} className="cursor-pointer active:scale-110" onClick={() => likeMutation.mutate(id)}>
            <ThumbsUp className={`w-5 h-5 text-rose-500 ${liked ? "fill-rose-500" : "fill-none"}`} />
             <span className="text-sm font-semibold">{totalLikes} Likes</span>
        </button>

       
        </>
        )
    

    
}