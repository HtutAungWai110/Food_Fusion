import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, UserCircle, X } from "lucide-react"
import PostLikeBtn from "./postLikeBtn"
import { memo } from "react"
import SignupCard from "./SignupCard"
import MessageBox from "./messageBox"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

function PostCard({ post, setMessage }) {
  const { user, post_description, image_path, likes, created_at, id } = post;

  // Format date to locale string
  const date = new Date(created_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const onLike = () => {
        setMessage(
            <motion.div animate={{scale: [0, 1]}} className="fixed top-[50%] left-[50%] -translate-[50%] z-50 flex flex-col items-center w-full max-w-sm ">
                
                <SignupCard/>
                <button onClick={() => setMessage(null)} className="absolute right-1 top-1 opacity-50 hover:opacity-70"><X/></button>
                <MessageBox status={"error"} message={"Login or signup for this action"}/>
            </motion.div>
        )
  }

  const isGuest = JSON.parse(localStorage.getItem("guest"));
  

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
            <div className="bg-orange-100 dark:bg-orange-950 p-1.5 rounded-full">
              <UserCircle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base leading-tight">
                {user.firstname} {user.lastname}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">{date}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-2 px-4">
          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 whitespace-pre-wrap">
            {post_description}
          </p>
          
          {image_path && (
            <div className="rounded-xl overflow-hidden border border-border/50">
              <img 
                src={image_path} 
                alt="Post content" 
                className="w-full h-auto object-cover max-h-[500px]" 
              />
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t bg-muted/20 py-1.5 px-4 rounded-b-xl">
          <div className="flex items-center gap-1">

            { isGuest ? 

            <Button onClick={onLike} variant="ghost" size="sm" className="hover:text-rose-500 gap-1.5 px-2 h-9">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-semibold">{likes}</span>
            </Button>
            :
            <PostLikeBtn id={id} setMessage={setMessage}>
              <span className="text-xs font-semibold">{likes}</span>
            </PostLikeBtn>
            }
            
            
            <Button variant="ghost" size="sm" className="hover:text-blue-500 gap-1.5 px-2 h-9">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-semibold">Comment</span>
            </Button>
          </div>

          <Button variant="ghost" size="sm" className="hover:text-green-500 px-2 h-9">
            <Share2 className="w-4 h-4 mr-1.5" />
            <span className="text-xs font-semibold">Share</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default memo(PostCard);