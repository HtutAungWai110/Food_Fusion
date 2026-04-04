

import { CheckCircle2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { XIcon } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
export default function SignupMessage({isPopUp = false}) {

    const [isShowing, setShowing] = useState(true);
  return (
    <>
    {isShowing && 
        <div className="flex items-center justify-center min-h-[500px] w-full p-4 overflow-hidden relative">
        {isPopUp && isShowing &&
            <button onClick={() => setShowing(false)} className="absolute right-6 top-6 z-50 opacity-20 hover:opacity-40 cursor-pointer"><XIcon/></button>
        }
        
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for a smooth pop
        }}
        className="relative w-full max-w-md"
      >
        {/* Decorative background elements */}
        <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
        
        <Card className="relative overflow-hidden border-none shadow-2xl bg-card/70 backdrop-blur-xl ring-1 ring-foreground/5">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-primary/50 via-primary to-primary/50" />
          
          <CardHeader className="text-center pt-10 pb-2">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 260, 
                damping: 15 
              }}
              className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 shadow-inner"
            >
              <div className="relative">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className="absolute inset-0 h-16 w-16 -m-2 rounded-full border-2 border-green-500/30"
                />
                <CheckCircle2 className="h-16 w-16 text-green-500 drop-shadow-sm" />
              </div>
            </motion.div>
            
            <CardTitle className="text-3xl font-bold tracking-tight bg-linear-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
              Signup Complete!
            </CardTitle>
            <CardDescription className="text-lg mt-2 font-medium text-muted-foreground/80">
              Welcome to the Food Fusion family
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center px-8 py-6">
            <p className="text-muted-foreground leading-relaxed">
              Your account has been created successfully. Get ready to discover, create, and share amazing culinary experiences with our global community.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 p-8 pt-2">
            <Button asChild className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20 group" variant="default">
              <Link to="/login" className="flex items-center justify-center gap-2">
                Continue to Login
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xs text-center text-muted-foreground/60 font-medium"
            >
              Already logged in? <Link to="/" className="text-primary/80 hover:text-primary hover:underline underline-offset-4">Return Home</Link>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>

    }
    </>
    
  );
}
