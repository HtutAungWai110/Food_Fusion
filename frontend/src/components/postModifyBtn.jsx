import {Button} from "../components/ui/button"
import { MoreHorizontal } from "lucide-react"
import apiClient from "../lib/client"
import { useMutation } from "@tanstack/react-query"

export default function PostModifyBtn({id}){
    return (
        <Button
        variant="ghost"
        ><MoreHorizontal/>
        </Button>
    )
}