import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPost } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
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
import { ImagePlus, X } from "lucide-react";

export default function UploadPost() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const uploadMutation = useMutation({
    mutationFn: (formData) => uploadPost(formData),
    onSuccess: (data) => {
      setMessage(<MessageBox status="success" message={data.message} />);
      queryClient.invalidateQueries(["posts"]);
      setTimeout(() => {
        navigate("/community_cookbook");
      }, 2000);
      console.log(data)
    },
    onError: (error) => {
      setMessage(<MessageBox status="error" message={error.message} />);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('description', data.description);
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }
    uploadMutation.mutate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-10 px-4 flex justify-center"
    >
      <Card className="w-full max-w-2xl shadow-xl border-orange-100 dark:border-orange-900/30">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-orange-600 dark:text-orange-500 text-center">
            Share Your Culinary Story
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Share a recipe, a tip, or just a beautiful food moment with the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                Description
              </label>
              <Textarea
                placeholder="What's cooking? Share your thoughts..."
                className="min-h-[150px] text-lg p-4 focus-visible:ring-orange-500/50"
                {...register("description", { 
                  required: "Description is required",
                  minLength: { value: 10, message: "Tell us a bit more (at least 10 characters)" },
                  maxLength: { value: 1000, message: "Description can't exceed 1000 characters" }
                })}
              />
              {errors.description && (
                <p className="text-destructive text-sm font-medium">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                Post Image
              </label>
              <div className="relative">
                {!preview ? (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-orange-500/50 transition-colors cursor-pointer bg-muted/5">
                    <ImagePlus className="w-12 h-12 text-muted-foreground/50" />
                    <div className="text-center">
                      <p className="font-medium">Click to upload an image</p>
                      <p className="text-xs text-muted-foreground">Any image format supported</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full "
                      {...register("image", { 
                        onChange: onImageChange
                      })}
                    />
                  </div>
                ) : (
                  <div className="relative rounded-2xl aspect-video border-2 border-orange-500/20 group">
                    <img src={preview} alt="Preview" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Button 
                         type="button" 
                         variant="destructive" 
                         size="icon" 
                         className="rounded-full"
                         onClick={() => { setPreview(null); reset({ image: null }); }}
                       >
                         <X className="w-5 h-5" />
                       </Button>
                    </div>
                  </div>
                )}
              </div>
              {errors.image && (
                <p className="text-destructive text-sm font-medium">{errors.image.message}</p>
              )}
            </div>

            {message}

            <Button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/20"
              disabled={uploadMutation.isPending || uploadMutation.isSuccess}
            >
              {uploadMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <Spinner className="w-5 h-5" />
                  Sharing...
                </div>
              ) : "Share Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
