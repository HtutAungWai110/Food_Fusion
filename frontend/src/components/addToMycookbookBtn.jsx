import {Button} from "../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../lib/client";
import { addToMycookbook, removeFromMycookbook } from "../states/MyCookbookState";
import { useDispatch } from "react-redux";
export default function AddToMycookbookBtn({id, setMessage, recipeExist}){
    const dispatch = useDispatch();;
    const addToCookbookMutation = useMutation({
        mutationFn: async () => {
            try{
            const res = await apiClient.post(`/user/addToMycookbook?id=${id}`)
                return res.data;
            } catch (error) {
                if (error.response) {
                    throw new Error(`Status: ${error.response.status}, ${error.response.data.message}`);
                }
                throw error;
            }
        },
        mutationKey: ["mycookbook"],
        onSuccess: (data) => {
            console.log(data)
            if(data.added){
                dispatch(
                    addToMycookbook(data.newRecipe.recipe)
                )
            } else {
                dispatch(
                    removeFromMycookbook(id)
                )
            }
            setMessage({
                message: data.message,
                status: "success"
            })
        },
        onError: (error) => {
            console.log(error.message)
            setMessage({
                message: "Failed to add recipe to cookbook",
                status: "error"
            })
        }
        
    })
    return (
        <Button 
        disabled={addToCookbookMutation.isPending} 
        onClick = {() => addToCookbookMutation.mutate()}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl transition-all">
            {recipeExist ? "Remove from my cookbook" : "Add to my cookbook"}
        </Button>
    )
}