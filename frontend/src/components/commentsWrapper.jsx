import { useQuery } from "@tanstack/react-query";
import CommentTemplate from "./commentTemplate";

export default function CommentWrapper({postId}){

    const {data: comments, isLoading, error} = useQuery({
        queryFn: async () => {
            const res = await fetch(`/api/community_cookbook/getComments?id=${postId}`);
            if(!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            };

            const data = await res.json();
            return data;
        },
        queryKey: ["comments", postId]
    })

   

    if(isLoading) return <p>Loading comments...</p>
    if(error) return <p className="text-red-500 text-sm">Error loading comments: {error.message}</p>
    return (
        <>
            {comments && comments.length > 0 ? (
                comments.map((comment) => (
                <CommentTemplate key={comment.id} cmt={comment}/>
                ))
                ) : (
                <p className="text-xs text-muted-foreground text-center py-2">No comments yet. Be the first to comment!</p>
            )}
        </>   
    )
    
}