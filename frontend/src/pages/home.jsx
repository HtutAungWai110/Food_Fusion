import CarouselEvents from "../components/eventCarousel";
import { JoinusCard } from "../components/JoinusCard";

// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"
import { useSelector } from "react-redux";
import FeturedRecipes from "../components/feturedRecipes";
  

export default function Home() {

  const {data, loading} = useSelector((state) => state.user);

  return (
    <>
    {!loading && !data &&
      <JoinusCard/>
    }
    
    <motion.div animate={{ opacity: [0, 1], translateY: [-30, 10, 0], transition: {duration: 1.2} }}> 
    <div className="flex flex-col gap-12 w-full">
      <section className="text-center space-y-6 banner-background sm:h-125 h-auto p-5 flex flex-col justify-center items-center">
        <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-orange-500">
          Welcome to FoodFusion
        </h1>
        <p className="text-background sm:text-[1.2em] text-[0.8em] leading-relaxed sm:w-[50%] w-[90%] ">
          At FoodFusion, we are dedicated to promoting home cooking and culinary creativity among food enthusiasts. 
          Our platform serves as a central hub for sharing recipes, culinary tips, and fostering a vibrant 
          food community where everyone can discover and share their passion for cooking.
        </p>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-orange-500">Upcoming Culinary Events</h2>
          <p className="text-muted-foreground mt-2">Join our hands-on workshops and feast events</p>
        </div>
        <CarouselEvents />
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-orange-500">Popular recipes</h2>
          <p className="text-muted-foreground mt-2">Join our hands-on workshops and feast events</p>
        </div>
        <FeturedRecipes />
      </section>
    </div>
    </motion.div>
    </>
  );
}