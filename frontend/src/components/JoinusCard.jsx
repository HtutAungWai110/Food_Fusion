

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {useForm} from "react-hook-form"
// eslint-disable-next-line no-unused-vars
import { motion, easeIn } from "motion/react";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../../hooks/useApi";




export function JoinusCard() {


    const {register, formState: {errors}, handleSubmit} = useForm();

    const registerMutation = useMutation({
      mutationFn: (formData) => registerApi(formData),
      onSuccess: (data) => {
      console.log( data);
      },
      onError: (error) => {
      console.error(error.message)
      }


    })

    const onSubmit = (formData) => {
        registerMutation.mutate(formData)
    }

    const [isShowing, setIsShowing] = useState(true)

    

  return (
    <>
    {isShowing && 
    
    
    <motion.div animate={{opacity: [0.7, 1], scale: [0, 1.1, 1], transition: {duration: 0.5, ease: easeIn}}} className="fixed left-[50%] top-[50%] -translate-[50%] z-20 w-[500px] flex justify-center">
    
    <Card className="w-full max-w-sm sm:scale-100 scale-[90%] border in-dark:border-gray-500 shadow-2xl">
        <XIcon onClick={() => setIsShowing(false)} className="absolute right-1 top-1 opacity-10 hover:opacity-40 transition-all duration-500"/>
      <CardHeader>
        <CardTitle className="font-extrabold text-2xl text-center text-orange-500">Join us</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className="grid gap-1">
              <label>Firstname</label>
              <input className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500"
                id="email"
                type="text"
                placeholder="Example: John"
                {...register("firstname", {
                    required: "Enter firstname",
                    minLength: {
                        value: 2,
                        message: "Firstname is too short"
                    }
                })}
              />
               {errors.firstname && 
                    <p className="text-red-500">{errors.firstname.message}</p>
                }
            </div>

               


            <div className="grid gap-1">
              <label>Lastname</label>
              <input className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500"
                id="email"
                type="text"
                placeholder="Example: Doe"
                {...register("lastname", {
                    required: "Enter lastname",
                    minLength: {
                        value: 2,
                        message: "Lastname is too short"
                    }
                })}
              />
               {errors.lastname && 
                    <p className="text-red-500">{errors.lastname.message}</p>
                }
            </div>

           

             <div className="grid gap-1">
              <label>Email</label>
              <input className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500"
                id="email"
                type="text"
                placeholder="Example: Doe"
                {...register("email", {
                    required: "Enter email",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter valid email"
                    }
                })}
              />

               {errors.email && 
                    <p className="text-red-500">{errors.email.message}</p>
                }
            </div>


            <div className="grid gap-1">
              <label>Password</label>
              <input className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500"
                id="password" 
                type="password"
                placeholder="Type your password"
                

                {...register("password", {
                    required: "Password is required",
                    
                    minLength: {
                        value: 8,
                        message: "Password lenght must be 8 characters long"
                    }
                })}
              />
                {errors.password && 
                    <p className="text-red-500">{errors.password.message}</p>
                }
              
            </div>

            

           
          </div>
    <div className="flex-col gap-2 p-5 mt-2">
        <button type="submit" className="w-full bg-orange-500 h-[40px] rounded-2xl text-white">
            Sing up
        </button>
        
      </div>
          
        </form>
      </CardContent>
      
    </Card>
    </motion.div>
    }
    </>
    
  )
}


