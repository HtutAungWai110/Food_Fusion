import apiClient from "../lib/client";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import DownloadableCard from "../components/downloadableCard";
import PdfCard from "../components/pdfCard";
import { Skeleton } from "@/components/ui/skeleton"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useState } from "react";
const videoIds = [
    "1kUE0BZtTRc",
    "T4xKThjcKaE",
    "VfowJHJz6-s",
    "Giek094C_l4",
    "xKxrkht7CpY",
    "RnvCbquYeIM",
    "44Wp3WE1AHs",
    "Q6f7CcekmpI",
    "XpF9zc57HAE"
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

export default function EducationalResources(){

    const {data: resources, isLoading, error} = useQuery({
        queryKey: ["Educational_resources"],
        queryFn: async() => {
            const res = await apiClient.get("/educational_resources/all");
            return res.data
        }
    })

    useEffect(() => {
        console.log(resources)
    }, [resources])

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

 
    if (error) {
    return (
        <div className="container mx-auto py-12 px-4 text-center">
          <h2 className="text-2xl font-bold text-red-500">Error loading resources</h2>
          <p className="text-muted-foreground mt-2">{error.message}</p>
        </div>
      )
    }


    return (
        <>
        <div className="m-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-orange-600 dark:text-orange-500">
            Downloadable Recipes Cards
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our downloadable culinary card for recipes for every skill level.
          </p>
        </div>

        {isLoading && (
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-full max-w-md space-y-4">
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-10 w-1/2" />
                    <Skeleton className="h-10 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16"
        >
          {resources?.map((resource) => (
            <PdfCard key={resource.id} resource={resource} />
          ))}
        </motion.div>

        <div className="m-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-orange-600 dark:text-orange-500">
            Educational Videos
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch videos about renewable energy
          </p>
        </div>

        <motion.div variants={container} initial="hidden" animate="show" className="pb-20 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {videoIds.map((videoId) => (
            <VideoWithSkeleton key={videoId} videoId={videoId} />
          ))}
        </motion.div>
      </>
    )
}