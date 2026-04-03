import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import EventCard from "./eventCard"

const events = [
  {
    title: "Italian Pasta Workshop",
    description: "Master the art of handmade pasta with our expert chefs. Perfect for beginners!",
    image: "https://placehold.co/600x400?text=Italian+Pasta",
    link: "/events/pasta-workshop"
  },
  {
    title: "Thai Street Food Night",
    description: "Discover the secrets of spicy and aromatic Thai cuisine in this hands-on session.",
    image: "https://placehold.co/600x400?text=Thai+Street+Food",
    link: "/events/thai-night"
  },
  {
    title: "Pastry Essentials",
    description: "Learn to bake like a pro! From flaky crusts to delicate fillings, we cover it all.",
    image: "https://placehold.co/600x400?text=Pastry+Essentials",
    link: "/events/pastry-essentials"
  },
  {
    title: "Farm-to-Table Dinner",
    description: "Experience seasonal cooking with the freshest local ingredients from our farm partners.",
    image: "https://placehold.co/600x400?text=Farm-to-Table",
    link: "/events/farm-dinner"
  },
  {
    title: "Vegetarian Feast",
    description: "Explore innovative plant-based recipes that are as delicious as they are healthy.",
    image: "https://placehold.co/600x400?text=Vegetarian+Feast",
    link: "/events/vegetarian-feast"
  }
]

export default function CarouselEvents(){
    return (
        <Carousel className="w-[90%] m-auto">
        <CarouselContent>
            {events.map((event, index) => 
                 <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                        <EventCard {...event} />
                    </div>
                 </CarouselItem>
            )}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext />
        </Carousel>
    )
}