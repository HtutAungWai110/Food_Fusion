// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import SignupCard from "../components/SignupCard";

export default function Signup() {
  return (
    <motion.div 
      animate={{ opacity: [0, 1], y: [-10, 0], transition: { duration: 1 } }} 
      className="flex justify-center items-center min-h-[calc(100vh-80px)] py-10"
    >
      <SignupCard />
    </motion.div>
  )
}
