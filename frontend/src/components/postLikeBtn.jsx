import { likePost, proxyFetch } from "../hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button"
import SessionExpiredAlert from "./sessionExpiredAlert";


export default function PostLikeBtn({id, setMessage, children}){
    
    
    const queryClient = useQueryClient();
    const {data, isLoading,} = useQuery({
        queryFn: async () => {
            const res = await proxyFetch(`/api/community_cookbook/isLiked?id=${id}`, {
                method: "GET"
            })

            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            const data = await res.json();
            return data;

        },
        queryKey: ["postLiked" , id],
        staleTime: 1 * 60 * 1000
        
        

    })

    


     const likeMutation = useMutation({
        mutationFn: (postId) => likePost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["postLiked" , id]
            })

            queryClient.invalidateQueries({
                queryKey: ["posts"]
            })
        },
        onError: () => {
            setMessage({
                message: "Failed to like post. Please try again.",
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
        
        <Button disabled={likeMutation.isPending} variant="ghost" size="sm" onClick={() => likeMutation.mutate(id)} className=" hover:text-rose-500 gap-1.5 px-2 h-9">
              <Heart className={`${data?.liked ? "text-rose-500 fill-rose-500" : "" }`}/>
              {children}
        </Button>

       
        </>
        )
    }
    
}