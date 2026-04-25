import { likePost } from "../hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button"
import SessionExpiredAlert from "./sessionExpiredAlert";
import { useState } from "react";


export default function PostLikeBtn({id, setMessage, likes, isLiked}){
    
    
  

    const [liked, setLiked] = useState(isLiked);
    const [totalLikes, setTotalLikes] = useState(likes);

    const likeMutation = useMutation({
    mutationFn: (postId) => likePost(postId),
    onError: () => {
        setMessage({
            message: "Failed to like post. Please try again.",
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
        
        <Button disabled={likeMutation.isPending} variant="ghost" size="sm" onClick={() => likeMutation.mutate(id)} className=" hover:text-rose-500 gap-1.5 px-2 h-9">
              <Heart className={`${liked ? "text-rose-500 fill-rose-500" : "" }`}/>
              <span className="text-xs font-semibold">{totalLikes}</span>
        </Button>

       
        </>
        )
    
    
}