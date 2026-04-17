import MessageBox from "./messageBox";
// eslint-disable-next-line no-unused-vars
import { easeIn, motion } from "motion/react"

export default function MessagePopupBottom({status, message, setMessage}) {
    return (
    <motion.div 
        animate={{
            y: [100, 0, 0, 100], 
            opacity: [0, 1, 1, 0]
        }} 
        transition={{
            duration: 3, 
            times: [0, 0.33, 0.66, 1],
            ease: "easeInOut"
        }} 
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50"
        onAnimationComplete={() => setMessage(null)}
    >
        <MessageBox status={status} message={message}/>
    </motion.div>
    )
}