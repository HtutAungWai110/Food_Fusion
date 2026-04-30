import apiClient from "../lib/client";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import DownloadableCard from "../components/downloadableCard";
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "motion/react";
import { useState } from "react";
const videoIds = [
    "mhDJNfV7hjk",
    "Cyskqnp1j64",
    "hyqfWbDWi9M",
    "WJ_U71a5t-M",
    "FXa2tAH3Ulw",
    "lqUtV6lT1n4",
    "7z1Ygygfquw",
    "H_erG7HSK0A",
    "YrHpeEwk_-U"
];


function VideoWithSkeleton({ videoId }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative">
            {!loaded && (
                <div className="relative">
                    <Skeleton className="h-[250px] w-[430px] rounded-xl" />
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                        onLoad={() => setLoaded(true)}
                    />
                </div>
            )}
            <iframe
                width="430"
                height="250"
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title="YouTube video player"
                frameBorder="0"
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className={loaded ? "block" : "hidden"}
            />
        </div>
    );
}

export default function CulinaryResources(){

    const {data: cards, isLoading, error} = useQuery({
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

        {isLoading &&
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
        }
        
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {cards?.map((recipe) => (
          <DownloadableCard key={recipe.id} recipe={recipe} />
        ))}
        </motion.div>

        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-orange-600">Cooking Videos</h1>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="pb-20 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {videoIds.map((videoId) => (
            <VideoWithSkeleton key={videoId} videoId={videoId} />
          ))}
        </motion.div>
      </>
    )
}