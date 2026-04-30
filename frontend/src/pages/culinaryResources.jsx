import apiClient from "../lib/client";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import DownloadableCard from "../components/downloadableCard";
import { motion } from "motion/react";
export default function CulinaryResources(){
    
    const {data: cards, loading, error} = useQuery({
        queryFn: async()=> {
            const res = await apiClient.get("/recipes/cards");
            return res.data
        }
    })

    useEffect(() => {
        console.log(cards)
    }, [cards])

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


    return (
        <>
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-600">Culinary Resources</h1>
        </div>
        
        <motion.div variants={container} initial="hidden" animate="show" className="p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {cards?.data?.map((recipe) => (
          <DownloadableCard key={recipe.id} recipe={recipe} />
        ))}
      </motion.div>
      </>
    )
}