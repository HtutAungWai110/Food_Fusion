// eslint-disable-next-line no-unused-vars
import { motion, easeIn } from "motion/react";
import { useState } from "react";
import SignupCard from "./SignupCard";

export function JoinusCard() {
  const [isShowing, setIsShowing] = useState(true);
  

  if (!isShowing) return null;

  return (
    <motion.div 
      animate={{ 
        opacity: [0, 1], 
        scale: [0, 1.1, 1], 
        transition: { duration: 0.5, ease: easeIn } 
      }} 
      className="fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-50 w-full max-w-[500px] flex justify-center px-4"
    >
      <SignupCard isPopup={true} onClose={() => setIsShowing(false)} />
    </motion.div>
  );
}
