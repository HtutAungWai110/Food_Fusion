import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { useMutation } from "@tanstack/react-query";
import { register as registerUserApi } from "../../hooks/useApi";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { XIcon } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

export default function SignupCard({ isPopup = false, onClose }) {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [errorState, setErrorState] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  const registerMutation = useMutation({
    mutationFn: (formData) => registerUserApi(formData),
    onMutate: () => {
      setErrorState(null)
      setLoading(true)
    },
    onSuccess: (data) => {
      if (buttonRef.current) buttonRef.current.disabled = true;
      setErrorState(null)
      if (isPopup && onClose) {
        onClose();
      }
      navigate("/login")
      console.log(data);
    },
    onError: (error) => {
      setErrorState(
        <motion.div animate={{ opacity: [0, 1], transition: { duration: 1 } }}>
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription className="text-red-500">
              {error.message}
            </AlertDescription>
          </Alert>
        </motion.div>
      )
    },
    onSettled: () => {
      setLoading(false)
    }
  })

  const onSubmit = (formData) => {
    registerMutation.mutate(formData)
  }

  return (
    <Card className={`w-full max-w-sm border in-dark:border-gray-500 shadow-2xl relative ${isPopup ? 'sm:scale-100 scale-[90%]' : ''}`}>
      {isPopup && onClose && (
        <XIcon 
          onClick={onClose} 
          className="absolute right-2 top-2 opacity-50 hover:opacity-100 transition-all duration-500 cursor-pointer z-10" 
          size={20}
        />
      )}
      <CardHeader>
        <CardTitle className="font-extrabold text-2xl text-center text-orange-500">
          {isPopup ? "Join us" : "Sign Up"}
        </CardTitle>
        <CardDescription className="text-center">
          {isPopup 
            ? "Create an account to join the Food Fusion community" 
            : "Create an account to join the Food Fusion community"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Firstname</label>
              <input
                className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500 bg-transparent"
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
              {errors.firstname && (
                <p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>
              )}
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium">Lastname</label>
              <input
                className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500 bg-transparent"
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
              {errors.lastname && (
                <p className="text-red-500 text-xs mt-1">{errors.lastname.message}</p>
              )}
            </div>

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
              <label className="text-sm font-medium">Password</label>
              <input
                className="border-b-[2px] p-[10px_0px] outline-none focus:border-b-orange-500 bg-transparent"
                type="password"
                placeholder="Type your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  }
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            {errorState}
            <button 
              ref={buttonRef} 
              type="submit" 
              className="w-full flex justify-center items-center gap-2 bg-orange-500 h-[40px] rounded-2xl text-white font-bold hover:bg-orange-600 transition-colors cursor-pointer"
              disabled={loading}
            >
              Sign Up {loading && <Spinner/>}
            </button>
            {!isPopup && (
              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-orange-500 hover:underline font-semibold">
                  Login
                </Link>
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
