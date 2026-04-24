import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useQuery } from "@tanstack/react-query"

import RecipeCard from "./recipeCard"
import apiClient from "../lib/client"

export default function FeturedRecipes(){

    const {data} = useQuery({
        queryKey: ["popular_recipes"],
        queryFn: async () => {
            try {
                const res = await apiClient.get("/recipes/popularRecipes");
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || error.message);
            }
        },
        staleTime: Infinity
    })

    return (
        <Carousel className="w-[90%] m-auto">
        <CarouselContent>
            {data?.map((recipe, index) => 
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                        <RecipeCard recipe={recipe} />
                    </div>
                    </CarouselItem>
            )}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext />
        </Carousel>
    )
}