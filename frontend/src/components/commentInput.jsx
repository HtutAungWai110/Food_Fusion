import { UserCircle, Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { postComment } from "../hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux";

export default function CommentInput({ postId, setMessage }) {

  const {data: userData} = useSelector((state) => state.user);


    const [newComment, setNewComment] = useState("");
    const [imageLoading, setImageLoading] = useState(true);
    const queryClient = useQueryClient();

    const postCommentMutation = useMutation({
      mutationFn: () => postComment(newComment, postId),
      mutationKey: ["post_comment", postId],
      onError: () => {
            setMessage({
                message: "Failed to post comment. Please try again.",
                status: "error"
            })
        },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: ["comments", postId]
        });
        setNewComment("");
      }
    })

      
    const handlePostComment = () => {
        if (!newComment.trim()) return;
        // Note: Implementation for posting comment would go here
        postCommentMutation.mutate();
    }

    const handleCommentChange = (e) => {
      if (e.target.value.length > 500) return;
        setNewComment(e.target.value);
      
    }


    return (
        <div className="flex items-center gap-2 pt-2">
                  <div className=" rounded-full w-8 h-8 flex items-center justify-center overflow-hidden relative">
                    {userData?.image_url ? (
                      <>
                        {imageLoading && <Skeleton className="w-full h-full rounded-full absolute inset-0 z-10" />}
                        <img 
                          src={userData.image_url} 
                          alt="Me" 
                          onLoad={() => setImageLoading(false)}
                          className={`w-full h-full object-cover rounded-full transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                        />
                      </>
                    ) : (
                      <UserCircle className="w-7 h-7 text-muted-foreground/60" />
                    )}
                  </div>
                  <span className="opacity-50 text-[10px]">{newComment.length}/500</span>
                  <div className="relative flex-1">
                    
                    <Input
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Write a comment..."
                      className="pr-10 bg-background/50 border-none h-10 text-sm focus-visible:ring-orange-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handlePostComment();
                        }
                      }}
                    />
                    <Button
                      disabled={postCommentMutation.isPending || !newComment.trim()}
                      size="icon"
                      variant="ghost"
                      className={`absolute right-1 top-1 h-8 w-8 hover:bg-transparent ${newComment.trim() ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground/30 disabled:opacity-50"}`}
                      onClick={handlePostComment}
                    >
                      {postCommentMutation.isPending ? <Spinner className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                     
                    </Button>
                  </div>
                </div>
    )
}