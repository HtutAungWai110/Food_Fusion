
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {useSelector} from "react-redux"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import MessageBox from "../components/messageBox";
import { Mail, MessageSquare, User } from "lucide-react";
import apiClient from "../lib/client";


export default function ContactUs() {
  const {data: userData} = useSelector((state) => state.user);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstname: userData?.firstname || "",
      lastname: userData?.lastname || "",
      email: userData?.email || ""
    }
  });
  const [message, setMessage] = useState(null);


  const feedbackMutation = useMutation({
    mutationFn: async (formData) => {
      try {
        const res = await apiClient.post(`/feedback/submit`, formData);
        return res.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to submit feedback");
      }
    },
    onSuccess: (data) => {
      setMessage(<MessageBox status="success" message={data.message || "Thank you for your feedback!"} />);
      console.log(data)
      reset();
    },
    onError: (error) => {
      setMessage(<MessageBox status="error" message={error.message} />);
    },
  });

  const onSubmit = (data) => {
    feedbackMutation.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-16 px-4 flex justify-center items-center min-h-[calc(100vh-80px)]"
    >
      <Card className="w-full max-w-2xl shadow-2xl border-orange-100 dark:border-orange-900/30">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-4xl font-extrabold text-orange-600 dark:text-orange-500">
            Get in Touch
          </CardTitle>
          <CardDescription className="text-lg">
            We'd love to hear from you. Please fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" /> First Name
                </label>
                <Input
                  placeholder="John"
                  className="h-12 focus-visible:ring-orange-500/50"
                  {...register("firstname", { required: "First name is required" })}
                />
                {errors.firstname && (
                  <p className="text-destructive text-xs font-medium">{errors.firstname.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-500" /> Last Name
                </label>
                <Input
                  placeholder="Doe"
                  className="h-12 focus-visible:ring-orange-500/50"
                  {...register("lastname", { required: "Last name is required" })}
                />
                {errors.lastname && (
                  <p className="text-destructive text-xs font-medium">{errors.lastname.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" /> Email Address
              </label>
              <Input
                type="email"
                placeholder="john.doe@example.com"
                className="h-12 focus-visible:ring-orange-500/50"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email"
                  }
                })}
              />
              {errors.email && (
                <p className="text-destructive text-xs font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-500" /> Your Feedback
              </label>
              <Textarea
                placeholder="How can we help you?"
                className="min-h-[150px] p-4 focus-visible:ring-orange-500/50"
                {...register("message", { 
                  required: "Feedback message is required",
                  minLength: { value: 10, message: "Please provide a bit more detail (at least 10 characters)" }
                })}
              />
              {errors.message && (
                <p className="text-destructive text-xs font-medium">{errors.message.message}</p>
              )}
            </div>

            {message}

            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/20"
              disabled={feedbackMutation.isPending}
            >
              {feedbackMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner className="w-5 h-5" />
                  Sending...
                </div>
              ) : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
