import { useSelector } from "react-redux";
import RecipeCard from "../components/recipeCard";
import { ChefHat, BookOpen } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
export default function MyCookbook() {
  const { data: cookbook, loading, error } = useSelector((state) => state.myCookbook);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 max-w-7xl pt-12">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 rounded-2xl text-orange-500 mb-2">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            My <span className="text-orange-500">Cookbook</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your personal collection of saved recipes and culinary inspirations.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] w-full bg-muted animate-pulse rounded-[2rem]" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-destructive/10 rounded-[2.5rem] border border-destructive/20">
            <p className="text-destructive font-bold text-xl">{error}</p>
          </div>
        ) : cookbook && cookbook.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {cookbook.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border-2 border-dashed border-muted-foreground/20">
            <ChefHat className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Your cookbook is empty</h3>
            <p className="text-muted-foreground">
              Start exploring recipes and save your favorites to see them here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
