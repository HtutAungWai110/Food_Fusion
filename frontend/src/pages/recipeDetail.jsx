import { useQuery } from "@tanstack/react-query"
import { getRecipe } from "../hooks/useApi"
import { useSearchParams, Link } from "react-router-dom"
import {
    X,
ThumbsUp,
  Clock, 
  Users, 
  ChefHat, 
  Calendar, 
  ChevronLeft,
  CookingPot,
  ListChecks,
  Info
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import RecipeLikeBtn from "../components/recipeLikeBtn"
import SignupCard from "../components/SignupCard"
import { useSelector } from "react-redux"
import MessagePopupBottom from "../components/messagePopupBottom"
import AddToMycookbookBtn from "../components/addToMycookbookBtn"
import { getMyCookbook } from "../states/MyCookbookState"
import { useDispatch } from "react-redux"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useEffect, useState } from "react"


export default function RecipeDetail() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState(null);
    const id = searchParams.get("id");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyCookbook())
    }, [])

    const {data: myCookbook} = useSelector(state => state.myCookbook)

    const { data, isLoading, error } = useQuery({
        queryKey: ["recipe", id],
        queryFn: () => getRecipe(id),
        enabled: !!id,
        staleTime: 15,
        gcTime: 10,
    })

    useEffect(() => {
        console.log(myCookbook)
    }, [myCookbook])

    useEffect(() => {
        console.log(data)
    }, [data])

    const {data: userData} = useSelector(state => state.user);

    const onLike = () => {
        setMessage(
            {
                message: "Please login to like recipes.",
                status: "error"
            }
        )
    }

    if (isLoading) {
        return <RecipeDetailSkeleton />;
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <Alert variant="destructive" className="max-w-2xl">
                    <AlertTitle>Error Loading Recipe</AlertTitle>
                    <AlertDescription>
                        {error?.message || "Something went wrong while fetching the recipe details."}
                    </AlertDescription>
                    <Link to="/recipe_collection">
                        <Button variant="outline" className="mt-4">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Recipes
                        </Button>
                    </Link>
                </Alert>
            </div>
        );
    }

    if(data){

        const {
            id,
            title,
            description,
            cuisine,
            dietary,
            difficulty,
            cooking_time,
            servings,
            likes,
            ingredients = [],
            detailed_instruction,
            image_url,
            created_at,
            isLiked
        } = data;

        const date = new Date(created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-background pb-20 pt-10"
            >
                {message && 
                    <MessagePopupBottom status={message.status} message={message.message} setMessage={setMessage}/>
                }
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Back Button */}
                    <Link to="/recipe_collection">
                        <Button variant="ghost" className="mb-6 hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-950 transition-colors">
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Back to Recipes
                        </Button>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content (Title, Image, Instructions) */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Hero Section */}
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <Badge className="bg-orange-500 text-white border-none">
                                        {cuisine}
                                    </Badge>
                                    {dietary && (
                                        <Badge variant="outline" className="border-orange-500/30">
                                            {dietary}
                                        </Badge>
                                    )}
                                    <Badge variant="secondary" className="font-semibold">
                                        <ChefHat className="w-3 h-3 mr-1" />
                                        {difficulty}
                                    </Badge>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-orange-600 dark:text-orange-500">
                                    {title}
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {description}
                                </p>
                            </div>

                            {/* Featured Image */}
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-background ring-1 ring-orange-100/50">
                                <img
                                    src={image_url || `https://placehold.co/1200x800?text=${encodeURIComponent(title)}`}
                                    alt={title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                            </div>

                            {/* Detailed Instructions */}
                            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                                <CardHeader className="bg-orange-50 dark:bg-orange-950/20 border-b border-orange-100 dark:border-orange-900/30">
                                    <CardTitle className="flex items-center gap-2 text-2xl text-orange-600 dark:text-orange-500">
                                        <CookingPot className="w-6 h-6" />
                                        Detailed Instructions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-8">
                                    <div className="prose prose-orange dark:prose-invert max-w-none">
                                        {detailed_instruction ? (
                                            <div className="whitespace-pre-wrap leading-relaxed text-lg text-foreground/90 font-sans">
                                                {detailed_instruction.split('\n').map((line, i) => {
                                                    if (line.startsWith('## ')) {
                                                        return (
                                                            <h3 key={i} className="text-2xl font-bold mt-8 mb-4 text-orange-700 dark:text-orange-400">
                                                                {line.replace('## ', '')}
                                                            </h3>
                                                        );
                                                    }
                                                    return <p key={i} className="mb-4">{line}</p>;
                                                })}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground italic">
                                                <Info className="w-12 h-12 mb-4 opacity-20" />
                                                <p>No detailed instructions available for this recipe.</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar (Stats, Ingredients) */}
                        <div className="space-y-8">
                            {/* Stats Card */}
                            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm sticky top-10">
                                <CardContent className="p-6 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-muted/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-1">
                                            <Clock className="w-5 h-5 text-orange-500" />
                                            <span className="text-sm font-semibold">{cooking_time} mins</span>
                                            <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Cooking Time</span>
                                        </div>
                                        <div className="bg-muted/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-1">
                                            <Users className="w-5 h-5 text-orange-500" />
                                            <span className="text-sm font-semibold">{servings} Servings</span>
                                            <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Yield</span>
                                        </div>
                                        <div className="bg-muted/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-1">
                                            {/* <button className="cursor-pointer active:scale-110" onClick={() => likeMutation.mutate(id)}>
                                                <ThumbsUp className="w-5 h-5 text-rose-500 " />
                                            </button> */}
                                            {userData ? 

                                            <RecipeLikeBtn id={id} likes={likes} isLiked={isLiked} setMessage={setMessage}/>
                                            :
                                            <button onClick={onLike} className="cursor-pointer active:scale-110">
                                                <ThumbsUp className={`w-5 h-5 text-rose-500 `} />
                                                 <span className="text-sm font-semibold">{likes} Likes</span>
                                            </button>
                                            
        
                                            
                                            }
                                           
                                            <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Community</span>
                                        </div>
                                        <div className="bg-muted/50 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-1">
                                            <Calendar className="w-5 h-5 text-blue-500" />
                                            <span className="text-[10px] font-semibold">{date}</span>
                                            <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Published</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Ingredients Section */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 font-bold text-lg">
                                            <ListChecks className="w-5 h-5 text-orange-500" />
                                            Ingredients
                                        </h3>
                                        <div className="space-y-3">
                                            {ingredients.length > 0 ? (
                                                ingredients.map((ingredient, index) => (
                                                    <div key={index} className="flex items-center gap-3 group">
                                                        <div className="h-2 w-2 rounded-full bg-orange-500 group-hover:scale-125 transition-transform" />
                                                        <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors">
                                                            {ingredient}
                                                        </span>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-muted-foreground italic text-sm">No ingredients listed.</p>
                                            )}
                                        </div>
                                    </div>

                                    <Separator />

                                    <AddToMycookbookBtn id={id} setMessage={setMessage}/>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    
                </div>
                
            </motion.div>
        );
    }
}

function RecipeDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl space-y-8 animate-pulse">
            <div className="w-32 h-10 bg-muted rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-20" />
                        </div>
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-2/3" />
                    </div>
                    <Skeleton className="aspect-video w-full rounded-3xl" />
                    <Skeleton className="h-96 w-full rounded-2xl" />
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-[500px] w-full rounded-2xl" />
                </div>
            </div>
        </div>
    );
}