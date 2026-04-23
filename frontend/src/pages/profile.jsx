import { useSelector } from "react-redux";
import { UserCircle, Mail, Calendar, ShieldCheck, ImagePlus } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import Cropper from 'react-easy-crop';
import { getCroppedImg } from "../lib/croppImage";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { proxyFetch } from "../hooks/useApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { getUser } from "../states/UserState";
import PostCard from "../components/postCard";
import MessageBox from "../components/MessageBox";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";


export default function Profile() {
  const { data: userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);

  const { data: userPosts, isLoading: postsLoading } = useQuery({
    queryKey: ["userPosts", userData?.id],
    queryFn: async () => {
      const response = await proxyFetch("/api/user/getPosts", {
        method: "GET",
      });

      const data = await response.json()
      return data
    },
    staleTime: 15 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    console.log(userData)
  }, [userData])
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [imageLoading, setImageLoading] = useState(true);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImage(reader.result);
      };
    }
  }

  const uploadAvatarMutation = useMutation({
    mutationFn: async () => {
        const base64Image = await getCroppedImg(image, croppedAreaPixels);
        const res = await proxyFetch('/api/user/uploadAvatar', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                base64Image
            })
        })

        const data = await res.json();
        return data;
    },
    mutationKey: ["avatar"],
    onSuccess: () => {
        dispatch(getUser());
        setImage(null);
        setCrop({x: 0, y: 0});
        setZoom(1);
        setCroppedAreaPixels(null);
    }
  })

  const uploadAvatar = () => {
    if (!image) return;
    uploadAvatarMutation.mutate();
  }


  if (!userData) return null;

  const joinedDate = "April 2026"; 

  return (
    <div className="min-h-screen bg-background pb-20">
        {image && (
          <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-2xl aspect-square bg-card rounded-2xl overflow-hidden shadow-2xl">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="mt-6 flex gap-4">
              <button 
                onClick={() => setImage(null)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={uploadAvatar}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-colors"
              >
                Save Photo
              </button>
            </div>
          </div>
        )}
      <div className="container mx-auto px-4 max-w-5xl pt-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Profile Header Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-card/30 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] border border-orange-500/10 shadow-sm">
            {/* Avatar on the Left */}
            <div className="relative group cursor-pointer">
              <div className="bg-linear-to-br from-orange-400 to-orange-600 p-1 rounded-full shadow-xl transition-all duration-500 group-hover:shadow-orange-500/20 group-hover:scale-105">
                <div className="bg-background rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center overflow-hidden relative">
                  {userData.image_url ? (
                    <>
                      {imageLoading && <Skeleton className="w-full h-full rounded-full absolute inset-0 z-10" />}
                      <img 
                        src={userData.image_url} 
                        alt="Profile" 
                        onLoad={() => setImageLoading(false)}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                      />
                    </>
                  ) : (
                    <UserCircle className="w-full h-full text-muted-foreground/60 group-hover:scale-110 transition-transform duration-500" />
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <ImagePlus className="w-8 h-8 text-white mb-1" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Update</span>
                    <input 
                    type="file"  
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute w-full h-full z-50 opacity-0 cursor-pointer"/>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-background w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-20" title="Online">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>

            {/* User Info on the Right */}

            <div className="flex-1 text-center md:text-left space-y-4 pt-2">
              <div className="space-y-1">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
                    {userData.firstname} {userData.lastname}
                  </h1>
                  <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 dark:border-orange-800/50">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Member
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 text-muted-foreground font-medium text-lg">
                <p className="flex items-center justify-center md:justify-start gap-3 hover:text-orange-500 transition-colors cursor-default">
                  <Mail className="w-5 h-5 text-orange-500" />
                  {userData.email}
                </p>
                <p className="flex items-center justify-center md:justify-start gap-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  Joined {joinedDate}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 border-none shadow-lg bg-card/50 backdrop-blur-sm h-fit sticky top-24">
                <CardContent className="p-8">
                    <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-foreground">
                        Statistics
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-muted/50 p-6 rounded-2xl text-center group hover:bg-orange-500/5 transition-colors">
                            <p className="text-3xl font-bold text-orange-500 group-hover:scale-110 transition-transform">{userPosts?.data?.length || 0}</p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Posts Shared</p>
                        </div>
                        <div className="bg-muted/50 p-6 rounded-2xl text-center group hover:bg-orange-500/5 transition-colors">
                            <p className="text-3xl font-bold text-orange-500 group-hover:scale-110 transition-transform">
                                {userPosts?.data?.reduce((acc, post) => acc + (post.likes || 0), 0) || 0}
                            </p>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Likes Received</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="md:col-span-2 space-y-6">
                {postsLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="border-none shadow-md bg-card/60 p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                      <Skeleton className="h-24 w-full rounded-xl" />
                      <Skeleton className="h-64 w-full rounded-xl" />
                    </Card>
                  ))
                ) : userPosts?.data?.length > 0 ? (
                  userPosts.data.map((post) => (
                    <PostCard key={post.id} initialData={post} setMessage={setMessage} />
                  ))
                ) : (
                  <div className="bg-muted/20 rounded-[2.5rem] border-2 border-dashed border-muted-foreground/20 p-12 flex flex-col items-center justify-center text-center gap-6 group hover:border-orange-500/30 transition-colors duration-500">
                      <div className="w-20 h-20 bg-muted-foreground/10 rounded-full flex items-center justify-center">
                          <UserCircle className="w-10 h-10 text-muted-foreground/30 group-hover:text-orange-500/30 transition-colors" />
                      </div>
                      <div>
                          <h4 className="text-xl font-bold text-foreground">No activities found</h4>
                          <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                              Start sharing your culinary expertise to build your profile feed!
                          </p>
                      </div>
                  </div>
                )}
            </div>
          </div>
          {message && <MessageBox message={message.message} status={message.status} setMessage={setMessage} />}
        </motion.div>
      </div>
    </div>
  );
}
