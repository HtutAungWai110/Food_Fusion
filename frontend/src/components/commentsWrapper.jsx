import { useQuery } from "@tanstack/react-query";
import CommentTemplate from "./commentTemplate";
import apiClient from "../lib/client";


export default function CommentWrapper({postId, setMessage}){

    const {data: comments, isLoading, error} = useQuery({
        queryFn: async () => {
            try {
                const res = await apiClient.get(`/community_cookbook/getComments`, {
                    params: { id: postId }
                });
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || error.message);
            }
        },
        queryKey: ["comments", postId],
        staleTime: 3 * 60 * 1000,
    })



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