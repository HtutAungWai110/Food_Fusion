import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, UserCircle, X, MoreHorizontal, ImagePlus } from "lucide-react"
import PostLikeBtn from "./postLikeBtn"
import { memo, useEffect, useState } from "react"
import SignupCard from "./SignupCard"
import { Link } from "react-router-dom"
import CommentInput from "./commentInput"
import CommentWrapper from "./commentsWrapper"
import PostModifyBtn from "./postModifyBtn"
import { useSelector } from "react-redux"
import {Skeleton} from "@/components/ui/skeleton"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "../lib/client"
import { useForm } from "react-hook-form"
import { updatePost } from "../hooks/useApi"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"

function PostCard({ initialData, setMessage }) {

  const {data: post, error} = useQuery({
    queryKey: ["post", initialData.id],
    initialData: initialData,
    queryFn: async () => {
        try {
            const res = await apiClient.get(`/community_cookbook/getPost`, {
                params: { postId: initialData.id }
            });
            return res.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || error.message);
        }
    },
  })
  const { user, post_description, image_url, likes, created_at, id, modifiable, isLiked } = post;
  const [showingComments, setShowingComments] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [userImageLoading, setUserImageLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editPreview, setEditPreview] = useState(image_url);
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const updateMutation = useMutation({
    mutationFn: (formData) => updatePost(formData),
    onSuccess: (data) => {
      setIsEditing(false)
      setMessage({ message: data.message, status: "success" });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error(error)
      setMessage({ message: error.message, status: "error" });
    }
  });

  useEffect(() => {
    if (isEditing) {
      reset({ description: post_description });
      setEditPreview(image_url);
    }
  }, [isEditing, post_description, image_url, reset]);


  const onEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitEdit = (data) => {
    if(data.description.trim() === post_description.trim() && editPreview === image_url){
      setIsEditing(false)
      return;
    }
    const formData = new FormData();
    formData.append('postId', id);
    formData.append('description', data.description);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }
    
    updateMutation.mutate(formData);
  };

  // Format date to locale string
  const date = new Date(created_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const onLike = () => {
        setMessage(
            {
              message: "Please login to like posts.",
              status: "error"
            }
        )
  }

  useEffect(() => {
    if(error){
      console.error(error)
    }
  }, [error])
  

  const {data: userData} = useSelector(state => state.user);
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto mb-6"
    >
      <Card className="border-none shadow-md bg-card/60 backdrop-blur-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
          <div className="flex items-center gap-3">
            <div className="p-0.5 border-2 border-orange-500 rounded-full">
              <div className="rounded-full w-10 h-10 flex items-center justify-center overflow-hidden relative">
                {
                  user?.image_url ?
                  <>
                    {userImageLoading && <Skeleton className="w-full h-full rounded-full absolute inset-0 z-10" />}
                    <img
                      src={user?.image_url}
                      alt={`${user.firstname} ${user.lastname}`}
                      onLoad={() => setUserImageLoading(false)}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${userImageLoading ? 'opacity-0' : 'opacity-100'}`}
                    />
                  </>
                  :
                  <UserCircle className="w-full h-full text-muted-foreground/60" />
                }
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base leading-tight">
                {user.firstname} {user.lastname}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">{date}</span>
            </div>
          </div>

          {
            modifiable &&
            <PostModifyBtn id={id} setMessage={setMessage} onEdit={() => setIsEditing(true)}/>
          }
        </CardHeader>

        <CardContent className="space-y-4 pt-2 px-4">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmitEdit)} className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  {...register("description", { required: "Description is required" })}
                  className="min-h-[100px] focus-visible:ring-orange-500"
                  placeholder="Update your post..."
                />
                {errors.description && (
                  <p className="text-xs text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="relative group">
                <div className="relative rounded-xl overflow-hidden border border-border/50 bg-muted/30">
                  {editPreview ? (
                    <img src={editPreview} alt="Preview" className="w-full h-auto opacity-50" />
                  ) : (
                    <div className="h-32 flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-xl">
                       <ImagePlus className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-background/80 p-2 rounded-lg shadow-sm border border-border flex items-center gap-2 cursor-pointer hover:bg-background transition-colors">
                      <ImagePlus className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold">Change Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        {...register("image", { onChange: onEditImageChange })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending} 
                  className="flex-1 bg-orange-500 hover:bg-orange-600 h-9"
                >
                  {updateMutation.isPending ? <Spinner className="w-4 h-4 mr-2" /> : "Save Changes"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)} 
                  className="h-9"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {post_description}
              </p>

              {
                image_url && imageLoading && (
                  <Skeleton className="w-full h-64 rounded-xl" />
                )
              }
              
              {image_url && (
                <div className="rounded-xl overflow-hidden border border-border/50">
                  <img 
                    src={image_url} 
                    alt="Post content" 
                    className="w-full h-auto " 
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>

        <CardFooter className="border-t bg-muted/20 py-1.5 px-4 rounded-b-xl flex flex-col">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">

              { userData ? 

              <PostLikeBtn 
              id={id} 
              setMessage={setMessage} 
              likes={likes} 
              isLiked={isLiked}/>

            
              :
              <Button onClick={onLike} variant="ghost" size="sm" className="hover:text-rose-500 gap-1.5 px-2 h-9">
                <Heart className="w-4 h-4" />
                <span className="text-xs font-semibold">{likes}</span>
              </Button>
              }
              
              
              <Button onClick={() => setShowingComments(prev => !prev)} variant="ghost" size="sm" className={`hover:text-blue-500 gap-1.5 px-2 h-9 ${showingComments ? "text-blue-500" : ""}`}>
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-semibold">Comment</span>
              </Button>
            </div>
            

            <Button variant="ghost" size="sm" className="hover:text-green-500 px-2 h-9">
              <Share2 className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-semibold">Share</span>
            </Button>
          </div>

          <AnimatePresence>
          {
            showingComments && 
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t space-y-4 p-5 max-h-[200px] overflow-y-auto">
                {/* Comments Display List */}
                <CommentWrapper postId={id} setMessage={setMessage}/>
                {/* New Comment Input */}
             
              
              </div>
              <div className="mt-2 pt-2 border-t space-y-4 p-5 max-h-[200px] overflow-y-auto">
                {
                  userData ?
                  
                  <CommentInput postId={id} setMessage={setMessage}/>
                  :
                  <div className="text-center p-5">
                    <Link className="font-bold text-orange-500" to={'/login'}>Login</Link> or <Link className="font-bold text-orange-500" to={'/signup'}>Signup</Link> to post a comment.
                  </div>
                }
              </div>
            </motion.div>
          }
          </AnimatePresence>

        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default memo(PostCard);