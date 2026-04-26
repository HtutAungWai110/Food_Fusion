import { Button } from "../components/ui/button"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../hooks/useApi";
import {Spinner} from "../components/ui/spinner"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "../components/ui/dropdown-menu"

export default function PostModifyBtn({ id, setMessage }) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        mutationKey: ["delete", id],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"]
            })
        }   
    })

    const handleEdit = () => {
        console.log("Edit post", id);
        // Implementation for edit will go here
    };

    const handleDelete = () => {
        deleteMutation.mutate(id);
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">

                    {
                        deleteMutation.isPending ?
                        <Spinner/> : 
                        <MoreHorizontal className="h-4 w-4" />
                    }
                    
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={deleteMutation.isPending} onClick={handleDelete} className="text-destructive focus:text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}