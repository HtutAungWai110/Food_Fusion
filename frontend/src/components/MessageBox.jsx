import { AlertOctagon, CheckCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";


export default function MessageBox({status, message}){
    return (
        <motion.div>
          <Alert>
            {status === "error" ?  <AlertOctagon/> : <CheckCircle/>}
            <AlertTitle>{status === "error" ? "Warning!": "Success!"}</AlertTitle>
            <AlertDescription className={status === "error" ? "text-red-500" : "text-green-500"}>
              {message}
            </AlertDescription>
            
          </Alert>
        </motion.div>
    )
}