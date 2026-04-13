import { likePost, proxyFetch } from "../hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { setUserNull } from "../states/UserState";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import { Heart } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MessageBox from "./messageBox";
import { Alert } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useEffect } from "react";


export default function PostLikeBtn({id, setMessage, children}){
    
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        queryKey: ["postLiked", id],
        

    })
    useEffect(() => {
        console.log(data)
    }, [data])

    


     const likeMutation = useMutation({
        mutationFn: (postId) => likePost(postId),
        mutationKey: ["post_like"],
        onError: (e) => {
            if(e.message === "Unauthorized - No tokens found"){
                setMessage(
                    <div className="fixed top-[50%] left-[50%] -translate-[50%] z-50 rounded-2xl w-[500px]">

                        <Alert>
                            <MessageBox status={"error"} message={"Session expired! Login again."}/>
                            <button className="border rounded-xl m-2 bg-orange-500 p-2 text-white" onClick={() => navigate("/login")}>Login</button>
                        </Alert>
                    </div>
                ),
                dispatch(setUserNull())
            }
            console.error(e.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["postLiked", id]})
            queryClient.invalidateQueries({queryKey: ["posts"]})
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
        
        <Button variant="ghost" size="sm" onClick={() => likeMutation.mutate(id)} className=" hover:text-rose-500 gap-1.5 px-2 h-9">
              <Heart className={`${data?.liked ? "text-rose-500 fill-rose-500" : "" }`}/>
              {children}
        </Button>

       
        </>
        )
    }
    
}