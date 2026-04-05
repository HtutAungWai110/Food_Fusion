
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner"
import { useState, useRef } from "react";
import MessageBox from "../components/messageBox";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { register, formState: { errors }, handleSubmit } = useForm();

  const [isLoading, setLoading] = useState(false);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  
  const loginMutation = useMutation({
    mutationFn: (formData) => login(formData),
    onSuccess: (data) => {
      setMessage(<MessageBox status={"success"} message={data.message}/>)
      buttonRef.current.disabled = true;
   
      navigate('/', { replace: false, state: null });
      window.location.reload();
      
    },
    onError: (error) => setMessage(
      <MessageBox status={"error"} message={error.message}/>
    ),
    onMutate: () => {
      setMessage(null);
      setLoading(true);
    },
    onSettled: () => setLoading(false)
  })

  const onSubmit = (formData) => {
    loginMutation.mutate(formData)
  }

  return (
    <motion.div animate={{opacity: [0,1], y: [-10, 0],transition: {duration: 1}}} className="flex justify-center items-center min-h-[calc(100vh-80px)]">
      <Card className="w-full max-w-sm border in-dark:border-gray-500 shadow-2xl">
        <CardHeader>
          <CardTitle className="font-extrabold text-2xl text-center text-orange-500">Login</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
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

              <div className="grid gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password</label>
                </div>
                <input
                  className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500 bg-transparent"
                  type="password"
                  placeholder="Type your password"
                  {...register("password", {
                    required: "Password is required"
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>
            {message}
            <div className="flex flex-col gap-4 mt-8">
              <button ref={buttonRef} type="submit" className="w-full bg-orange-500 h-[40px] rounded-2xl text-white font-bold hover:bg-orange-600 transition-colors cursor-pointer flex justify-center items-center gap-2">
                Login {isLoading && <Spinner/>}
              </button>
              <p className="text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="text-orange-500 hover:underline font-semibold" >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
