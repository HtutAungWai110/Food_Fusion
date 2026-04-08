import { useQueryClient, useQuery } from "@tanstack/react-query"
import { getRecipes } from "../hooks/useApi"
import RecipeCard from "../components/recipeCard"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { useEffect, useState } from "react"
import Pagination from "../components/pagination"

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

export default function Recipes() {
  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("Any");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => getRecipes(cuisine, difficulty, page),
  })

  const cuisines = [
    "All", "Thai", "Italian", "Indian", "Japanese", "Mexican", "Chinese", "Mediterranean"
  ]

  const difficulties = [
    "Any", "Easy", "Medium", "Hard"
  ]

  useEffect(() => {
  
    queryClient.invalidateQueries({queryKey: ["recipes"]})
  }, [cuisine, difficulty, queryClient, page])

  useEffect(() => {
    setPage(1);
    queryClient.invalidateQueries({queryKey: ["recipes"]})
  }, [cuisine, difficulty, queryClient])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        // This is the magic line for sequential playout
        staggerChildren: 0.1, 
      },
    },
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-orange-500">Our Recipe Collection</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="w-full max-w-md space-y-4">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error loading recipes</h2>
        <p className="text-muted-foreground mt-2">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-orange-600 dark:text-orange-500">
          Culinary Inspirations
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our community cookbook filled with diverse flavors, dietary options, and recipes for every skill level.
        </p>
      </div>

      <div className="flex justify-end items-center gap-2 m-5">
        <div className="flex gap-1 items-center">
        <label>Cuisine: </label>
        <Combobox items={cuisines} value={cuisine} onValueChange={setCuisine}>
        <ComboboxInput/>
        <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        </div>

        <div className="flex gap-1 items-center">
        <label>Difficulty: </label>
        <Combobox items={difficulties} value={difficulty} onValueChange={setDifficulty}>
        <ComboboxInput/>
        <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {data?.data?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </motion.div>
      <Pagination currentPage={page} maxPage={data.last_page} setPage={setPage}/>


      {data?.data?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground italic">No recipes found. Be the first to share one!</p>
        </div>
      )}
    </div>
  )
}
