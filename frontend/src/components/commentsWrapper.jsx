import { useQuery } from "@tanstack/react-query";
import CommentTemplate from "./commentTemplate";
import { useEffect } from "react";
import { proxyFetch } from "../hooks/useApi";

export default function CommentWrapper({postId, setMessage}){
    const isGuest = JSON.parse(sessionStorage.getItem("guest"))

    const {data: comments, isLoading, error} = useQuery({
        queryFn: async () => {
            let res;
            if (isGuest){
                res = await fetch(`/api/community_cookbook/getComments?id=${postId}`, {
                    method: "GET",
                    credentials: "include"
                });
            } else {
                res = await proxyFetch(`/api/community_cookbook/getComments?id=${postId}`, {
                    method: "GET",
                });
            }
            if(!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            };

            const data = await res.json();
            return data;
        },
        queryKey: ["comments", postId],
        staleTime: 3 * 60 * 1000,
    })


    useEffect(() => {
        console.log(comments)
    }, [comments])
   

    if(isLoading) return <p>Loading comments...</p>
    if(error) return <p className="text-red-500 text-sm">Error loading comments: {error.message}</p>
    return (
        <>
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                <CommentTemplate key={comment.id} cmt={comment} setMessage={setMessage}/>
                ))
                ) : (
                <p className="text-xs text-muted-foreground text-center py-2">No comments yet. Be the first to comment!</p>
            )}
        </>   
    )
    
}