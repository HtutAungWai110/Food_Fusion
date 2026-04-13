import { UserCircle } from "lucide-react"


export default function CommentTemplate({cmt}){

    const { comment, created_at, user} = cmt;
    return (
        <div className="flex gap-2">
        <UserCircle className="w-7 h-7 text-muted-foreground shrink-0" />
        <div className="flex flex-col bg-muted/30 p-2 rounded-lg text-sm w-full">
            <span className="font-semibold text-xs mb-0.5">
            {user.firstname} {user.lastname}
            </span>
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
        </div>
    )
}