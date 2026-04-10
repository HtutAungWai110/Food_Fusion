import { useForm } from "react-hook-form"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import MessageBox from "../components/messageBox";
import { Spinner } from "@/components/ui/spinner"

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage(){

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [message, setMessage] = useState(null);

    const resetMutation = useMutation({
        mutationFn: async (formData) => {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(formData)
            })

            

            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message);
            }

            const data = await res.json();
            return data;
        },
        mutationKey: ["password_reset"],
        onSuccess: (data) => {
            setMessage(
                <div className="fixed top-[50%] left-[50%] -translate-[50%] w-full h-[100vh] flex items-center justify-center bg-black/50">
                    <div className="sm:w-[500px] w-[90%] bg-card rounded-2xl p-2">
                        <MessageBox status={"success"} message={data.message}/>
                        <Link className="m-5 text-orange-500 font-bold" to={"/login"}>Go back to login</Link>
                    </div>
                </div>
            )
        },
        onError: (error) => {
            
            setMessage(
                <div className="fixed top-[50%] left-[50%] -translate-[50%] w-full h-[100vh] flex items-center justify-center bg-black/50">
                    <div className="sm:w-[500px] w-[90%] bg-background rounded-2xl p-2">
                        <MessageBox status={"error"} message={error.message}/>
                        <button onClick={() => window.location.reload()} className="border rounded-2xl p-2 m-2">Try again</button>
                    </div>
                </div>
            )
        }
    })


    const onSubmit = (formData) => {
        resetMutation.mutate(formData);
    } 
    return (
        <>
        <motion.div animate={{opacity: [0,1], y: [-10, 0],transition: {duration: 1}}} className="flex justify-center items-center min-h-[calc(100vh-80px)]">
            <Card className="w-full max-w-sm border in-dark:border-gray-500 shadow-2xl">
                <CardHeader>
                <CardTitle className="font-extrabold text-2xl text-center text-orange-500">Passoword Reset</CardTitle>
                <CardDescription className="text-center">
                    Enter your email below to reset password
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                    <div className="grid gap-1">
                        <label className="text-sm font-medium">Email</label>
                        <input
                        className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500 bg-transparent"
                        type="email"
                        placeholder="Example: john@example.com"
                        {...register("email", {
                            required: "Enter email",
                            pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Enter valid email"
                            }
                        })}
                        />
                        {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    </div>
                    <button disabled={resetMutation.isPending} type="submit" className="p-2 bg-orange-500 rounded-xl mt-2 text-white flex justify-center items-center gap-2">Submit {resetMutation.isPending && <Spinner/>}</button>
                </form>
            </CardContent>
            </Card>
        </motion.div>
                    
        {message}
        </>
    )
}