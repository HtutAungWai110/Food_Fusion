import { likeRecipe, proxyFetch } from "../hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { setUserNull } from "../states/UserState";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"
import { ThumbsUp } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import MessageBox from "./messageBox";
import { Alert } from "@/components/ui/alert"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"


export default function RecipeLikeBtn({id, setMessage}){
    
   
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
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