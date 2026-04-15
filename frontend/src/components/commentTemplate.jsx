import { UserCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentTemplate({cmt}){

    const { comment, created_at, user, modifiable, id, post_id} = cmt;
    const queryClient = useQueryClient();

    const deleteCommentMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/community_cookbook/deleteComment?id=${id}`, {
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
        onError: (e) => {
            console.error(e.message);
        }, 
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(["comments", post_id]);
        }
    })
    return (
        <div className="flex gap-2 relative">
            <UserCircle className="w-7 h-7 text-muted-foreground shrink-0" />
            <div className="flex flex-col bg-muted/30 p-2 rounded-lg text-sm w-full">
                <span className="font-semibold text-xs mb-0.5">
                {user.firstname} {user.lastname} 
                </span>
                <span className="opacity-50">({user.email})</span>
                
                <p className="text-foreground/90">{comment}</p>
                <span className="text-[10px] text-muted-foreground mt-1">
                {new Date(created_at).toLocaleString([], { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                })}
                </span>
            </div>
            {modifiable && 
            
                <div className="flex gap-2 items-center absolute right-0">

                    <Button 
                    disabled={deleteCommentMutation.isPending} 
                    onClick={() => deleteCommentMutation.mutate()} 
                 
                    variant="ghost" 
                    className="flex gap-1 text-muted-foreground hover:bg-transparent p-2 border">
                         {deleteCommentMutation.isPending ? <Spinner/> : "Delete"}
                    </Button>
                    <Button 
                
                    variant="ghost" 
                    className=" text-muted-foreground hover:bg-transparent p-2 border">
                        Edit
                    </Button>
                </div>
            }
            
        </div>
    )
}