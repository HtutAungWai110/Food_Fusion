import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@/components/ui/spinner"
import { Link } from "react-router-dom";


import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import MessageBox from "../components/messageBox";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";



export default function ResetPassword(){
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token")
    const email = searchParams.get("email")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const {data, loading, error} = useQuery({
        queryKey: [`reset_session ${token}`],
        queryFn: async () => {
            const res = await fetch(`/api/auth/check-reset-session?token=${token}&email=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }

            })

            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message)
            }

            const data = await res.json();
            return data;
        }
    })

    const genericPattern = {
        value: /^[\u0020-\u007E\u00A0-\u00FF\u0100-\u017F]*$/,
        message: "Emojis and unusual characters are not allowed"
    };

    const resetMutation = useMutation({
        mutationFn: async (password) => {
            const res = await fetch(`/api/auth/reset-password?token=${token}&email=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password})
            })

            if(!res.ok){
                const error = await res.json();
                throw new Error(error.message)
            }

            const data = await res.json();
            return data
        },
        mutationKey: [`reset${token}`],
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

    });

    const onSubmit = (formData) => {
        resetMutation.mutate(formData.password)
    }

    if(!data && loading){
        return (
        <div className="absolute top-[50%] left-[50%] -translate-[50%]">
          <Spinner className="scale-200"/>
        </div>
        )
    }

    if(error){
        return (
        <div className="fixed top-[50%] left-[50%] -translate-[50%] w-full h-[100vh] flex items-center justify-center bg-black/50">
            <div className="sm:w-[500px] w-[90%] bg-background rounded-2xl p-2">
                <MessageBox status={"error"} message={error.message}/>
            </div>
        </div>
        )
    }

    if(data?.tokenValid){

     return (
        <>
        <motion.div animate={{opacity: [0,1], y: [-10, 0],transition: {duration: 1}}} className="flex justify-center items-center min-h-[calc(100vh-80px)]">
            <Card className="w-full max-w-sm border in-dark:border-gray-500 shadow-2xl">
                <CardHeader>
                <CardTitle className="font-extrabold text-2xl text-center text-orange-500">Passoword Reset</CardTitle>
                <CardDescription className="text-center">
                    Enter new password
                </CardDescription>
                </CardHeader>
                <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                    <div className="grid gap-1">
                        <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Password</label>
                        </div>
                        <div className="relative flex items-center">
                        <input
                            className="border-b-[2px] p-[10px_30px_10px_0px] outline-none focus:border-b-orange-500 bg-transparent w-full"
                            type={showPassword ? "text" : "password"}
                            placeholder="Type your password"
                            {...register("password", {
                            required: "Password is required",
                            minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                            },
                            pattern: genericPattern
                            })}
                        />
                        <button
                            type="button"
                            className="absolute right-0 opacity-50 hover:opacity-100 transition-opacity"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        </div>
                        {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="grid gap-1">
                        <label className="text-sm font-medium">Confirm Password</label>
                        <div className="relative flex items-center">
                            <input
                            className="border-b-[2px] p-[10px_30px_10px_0px] outline-none focus:border-b-orange-500 bg-transparent w-full"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-type your password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (val) => val === watch('password') || "Passwords do not match"
                            })}
                            />
                            <button
                            type="button"
                            className="absolute right-0 opacity-50 hover:opacity-100 transition-opacity"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
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
}