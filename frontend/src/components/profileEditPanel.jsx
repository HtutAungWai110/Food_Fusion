import { useForm } from "react-hook-form";
import { useMutation, } from "@tanstack/react-query";
import { updateProfile } from "../hooks/useApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { getUser } from "../states/UserState";
import { useState } from "react";
import MessageBox from "./MessageBox";

export default function ProfileEditPanel({ open, onClose, userData, setMessage }) {

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstname: userData?.firstname,
      lastname: userData?.lastname,
      email: userData?.email,
    }
  });

  const dispatch = useDispatch();
  const [errorState, setErrorState] = useState(null);

  const watchedFirstname = watch("firstname");
  const watchedLastname = watch("lastname");
  const watchedEmail = watch("email");

  const hasChanged = 
    watchedFirstname?.trim() !== userData?.firstname?.trim() ||
    watchedLastname?.trim() !== userData?.lastname?.trim() ||
    watchedEmail?.trim() !== userData?.email?.trim();

  const mutation = useMutation({
    mutationFn: (formData) => updateProfile(formData),
    onSuccess: () => {
      dispatch(getUser());
      setMessage({
        message: "Saved successfully",
        status: "success"
      })
      onClose();
    },
    onError: (error) => {
      setErrorState(error.message);

      
    },
    onMutate: () => {
      setErrorState(null)
    }
  });

  const onSubmit = (formData) => {
    if(!hasChanged){
      onClose()
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-orange-500 text-center">Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Firstname</label>
            <Input
              {...register("firstname", { required: "Firstname is required" })}
              placeholder="Firstname"
              className="h-10 focus:border-orange-500"
            />
            {errors.firstname && <p className="text-red-500 text-xs">{errors.firstname.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Lastname</label>
            <Input
              {...register("lastname", { required: "Lastname is required" })}
              placeholder="Lastname"
              className="h-10 focus:border-orange-500"
            />
            {errors.lastname && <p className="text-red-500 text-xs">{errors.lastname.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <Input
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format"
                }
              })}
              placeholder="Email"
              className="h-10 focus:border-orange-500"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {hasChanged && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Enter Password</label>
              <Input
                {...register("password", { required: "Password is required to save changes" })}
                type="password"
                placeholder="Password"
                className="h-10 focus:border-orange-500"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
          )}

          {errorState && (
            <div className="mt-2">
                <MessageBox status="error" message={errorState} />
            </div>
          )}

          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-10 rounded-xl transition-colors cursor-pointer"
              disabled={mutation.isPending}
            >
              Save Changes {mutation.isPending && <Spinner className="ml-2" />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
