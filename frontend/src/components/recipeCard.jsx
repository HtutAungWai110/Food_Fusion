import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { 
  Clock, 
  Users, 
  ChefHat, 
  Heart, 
  ChevronDown, 
  CookingPot, 
  Info,
  Calendar
} from "lucide-react"
import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

export default function RecipeCard({ recipe }) {
  const {
    title,
    description,
    cuisine,
    dietary,
    difficulty,
    cooking_time,
    servings,
    likes,
    ingredients = [],
    instructions = [],
    image_path,
    created_at
  } = recipe;

  const [open, setOpen] = useState(false);

  // Format date
  const date = new Date(created_at).toLocaleDateString();

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
    >
      <Card className="w-full max-w-md overflow-hidden flex flex-col h-full border-none shadow-lg bg-card/50 backdrop-blur-sm group">
        {/* Recipe Image Placeholder or Real Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image_path || `https://placehold.co/600x400?text=${encodeURIComponent(title)}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-md font-semibold">
              <ChefHat className="w-3 h-3 mr-1" />
              {difficulty}
            </Badge>
          </div>
          <div className="absolute bottom-2 left-2 flex gap-1">
            <Badge className="bg-orange-500 text-white border-none">
              {cuisine}
            </Badge>
            {dietary && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-md">
                {dietary}
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl font-bold line-clamp-1 text-orange-600 dark:text-orange-500">
              {title}
            </CardTitle>
            <div className="flex items-center text-rose-500 font-medium text-sm">
              <Heart className="w-4 h-4 mr-1 fill-current" />
              {likes}
            </div>
          </div>
          <CardDescription className="line-clamp-2 min-h-[40px]">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 flex-grow">
          {/* Stats Bar */}
          <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{cooking_time} mins</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{servings} servings</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
          </div>

          {/* Ingredients Combobox (Read-only as requested) */}
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <CookingPot className="w-4 h-4 text-orange-500" />
              Ingredients
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between font-normal h-9 bg-background/50"
                >
                  <span className="truncate">
                    {ingredients.length > 0 
                      ? `View ${ingredients.length} Ingredients...` 
                      : "No ingredients listed"}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                <Command className="border-none">
                  <CommandInput placeholder="Search ingredients..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No ingredient found.</CommandEmpty>
                    <CommandGroup heading="Required Ingredients">
                      {ingredients.map((ingredient, index) => (
                        <CommandItem
                          key={index}
                          className="flex items-center gap-2 cursor-default pointer-events-none"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                          {ingredient}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all">
                <Info className="w-4 h-4 mr-2" />
                View Instructions
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 max-h-[400px] overflow-y-auto p-4" side="top" align="center">
              <h4 className="font-bold mb-3 flex items-center gap-2 text-orange-600">
                <CookingPot className="w-4 h-4" />
                Instructions
              </h4>
              <div className="space-y-4">
                {instructions.length > 0 ? (
                  instructions.map((step, index) => (
                    <div key={index} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-xs">
                        {index + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground italic">No instructions provided.</p>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
