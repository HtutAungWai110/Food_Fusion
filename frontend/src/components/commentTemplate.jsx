import { UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"

import { proxyFetch } from "../hooks/useApi";
import { Textarea } from "@/components/ui/textarea";


function CommentTemplate({cmt, setMessage}){

    const { comment, created_at, user, modifiable, id, post_id} = cmt;
    const [imageLoading, setImageLoading] = useState(true);
    const queryClient = useQueryClient();
    const [editing, setEditing] = useState(false);
    const [newComment, setNewComment] = useState(comment)


    const deleteCommentMutation = useMutation({
        mutationFn: async () => {
            const res = await proxyFetch(`/api/community_cookbook/deleteComment?id=${id}&post_id=${post_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(!res.ok) {
                const error = await res.json();
                throw new Error(`Status: ${res.status}, ${error.message}`)
            }

            return await res.json();
        },
        mutationKey: ["delete_comment", id],
        onError: () => {
            setMessage({
                message: "Failed to delete comment. Please try again.",
                status: "error"
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments", post_id]
            });
        }
    })


    const updateCommentMutation = useMutation({
        mutationFn: async () => {
            const res = await proxyFetch(`/api/community_cookbook/updateComment?id=${id}&postId=${post_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({newComment: newComment.trim()})
            })
            if(!res.ok) {
                const error = await res.json();
                throw new Error(`Status: ${res.status}, ${error.message}`)
            }

            return await res.json();
        },
        mutationKey: ["update_comment", id],
        onError: () => {
            setMessage({
                message: "Failed to update comment. Please try again.",
                status: "error"
            })
        },
        onSuccess: () => {
            setEditing(false)
            queryClient.invalidateQueries({
                queryKey: ["comments", post_id]
            })
        }
    })

    const handleUpdateComment = () => {
        if (newComment.trim() === "")return;
        if(newComment.trim() === comment.trim())return;
        updateCommentMutation.mutate();
    }
    return (
        <div className="flex gap-2 relative">
            <div className="w-7 h-7  flex items-center justify-center overflow-hidden relative shrink-0 rounded-full">
                {user?.image_url ? (
                    <>
                        {imageLoading && <Skeleton className="w-full h-full rounded-full absolute inset-0 z-10" />}
                        <img 
                            src={user.image_url} 
                            alt={`${user.firstname} ${user.lastname}`} 
                            onLoad={() => setImageLoading(false)}
                            className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                        />
                    </>
                ) : (
                    <UserCircle className="w-full h-full text-muted-foreground/60" />
                )}
            </div>
            <div className="flex flex-col bg-muted/30 p-2 rounded-lg text-sm w-full">
                <span className="font-semibold text-xs mb-0.5">
                {user.firstname} {user.lastname} 
                </span>
                <span className="opacity-50">({user.email})</span>
                {editing ?
                <>
                    <Textarea 
                    className="min-h-[100px] text-lg p-4 focus:border-none"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                
                    />
                    <div className="flex justify-end m-2 gap-1">
                        <Button 
                        disabled={updateCommentMutation.isPending}
                        onClick={handleUpdateComment}
                        className="flex"
                        >Update {updateCommentMutation.isPending && <Spinner/>}</Button>
                        <Button 
                        onClick={() => {setEditing(false), setNewComment(comment)}}
                        variant="ghost"
                        className="border border-foreground"
                        >Cancle</Button>
                    </div>
                </>
                    : 

                    <>
                        <p className="text-foreground/90">{comment}</p>
                        <span className="text-[10px] text-muted-foreground mt-1">
                        {new Date(created_at).toLocaleString([], { 
                            month: 'short', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        })}
                        </span>
                    </>
                }
                
                
            </div>
            {modifiable && !editing &&
            
                <div className="flex gap-2 items-center absolute right-0">

                    <Button 
                    disabled={deleteCommentMutation.isPending || deleteCommentMutation.isSuccess} 
                    onClick={() => deleteCommentMutation.mutate()} 
                 
                    variant="ghost" 
                    className="flex gap-1 text-muted-foreground hover:bg-transparent p-2 border">
                         {deleteCommentMutation.isPending || deleteCommentMutation.isSuccess ? <Spinner/> : "Delete"}
                    </Button>
                    <Button 
                    onClick={() => setEditing(true)}
                    variant="ghost" 
                    className=" text-muted-foreground hover:bg-transparent p-2 border">
                        Edit
                    </Button>
                </div>
            }
            
        </div>
    )
}
export default memo(CommentTemplate);