import { likePost } from "../hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button"
import SessionExpiredAlert from "./sessionExpiredAlert";


export default function PostLikeBtn({id, isLiked, setMessage, children}){
    
    
    const queryClient = useQueryClient();

    


     const likeMutation = useMutation({
        mutationFn: (postId) => likePost(postId),
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ["post", id]
            })

        },
        onError: () => {
            setMessage({
                message: "Failed to like post. Please try again.",
                status: "error"
            })
        },
    })




    
        return (
        <>
        
        <Button disabled={likeMutation.isPending} variant="ghost" size="sm" onClick={() => likeMutation.mutate(id)} className=" hover:text-rose-500 gap-1.5 px-2 h-9">
              <Heart className={`${isLiked ? "text-rose-500 fill-rose-500" : "" }`}/>
              {children}
        </Button>

       
        </>
        )
    
    
}