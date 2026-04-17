import { useQuery } from "@tanstack/react-query"
import { getPosts } from "../hooks/useApi"
import {  useState } from "react"
import PostCard from "../components/postCard"
import Pagination from "../components/pagination"
import { Spinner } from "@/components/ui/spinner"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import MessagePopupBottom from "../components/messagePopupBottom"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react"


export default function CommunityCookbook() {
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

     const onUploadClick = () => {
        navigate("/upload_post");
     }
   

    const { data: posts, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: () =>  getPosts(page),
    })


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Spinner className="w-10 h-10 text-orange-500" />
                <p className="text-muted-foreground animate-pulse font-medium">Cooking up your feed...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-4">
                <Alert variant="destructive" className="bg-destructive/10">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        {error.message || "Failed to load posts. Please try again later."}
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-background to-muted/30 pb-20">
            {/* Header Section */}
            <div className=" flex justify-end m-5 p-2">
                <Button 
                onClick={onUploadClick}
                variant="outline" 
                className="hover:scale-105">
                    Upload post
                </Button>
            </div>
            <div className="max-w-4xl mx-auto pt-10 px-4 mb-10 text-center">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent"
                >
                    Community Cookbook
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                >
                    Discover recipes, tips, and culinary stories shared by our global community of home cooks.
                </motion.p>
            </div>

            {/* Feed Section */}
            
            <div className="max-w-3xl mx-auto px-4">
                <AnimatePresence mode="popLayout">

                        <div className="space-y-6">
                            {posts?.data?.length > 0 ? (
                                posts.data.map((post) => (
                                    <PostCard key={post.id} post={post} setMessage={setMessage}/>
                                ))
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-20 bg-card rounded-2xl border-2 border-dashed border-muted"
                                >
                                    <p className="text-muted-foreground">No posts found. Be the first to share something!</p>
                                </motion.div>
                            )}
                        </div>
         
                </AnimatePresence>

                {/* Pagination Section */}
                {posts?.last_page > 1 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12"
                    >
                        <Pagination 
                            currentPage={page} 
                            maxPage={posts.last_page} 
                            setPage={setPage} 
                        />
                    </motion.div>
                )}
            </div>
            {message
                && 
            <MessagePopupBottom message={message.message} status={message.status} setMessage={setMessage}/>
            }
            
            <Pagination currentPage={posts?.current_page} maxPage={posts?.last_page} setPage={setPage}/>
        </div>
    )
}