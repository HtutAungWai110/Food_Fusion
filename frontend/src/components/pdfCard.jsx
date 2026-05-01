import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Download,
  Eye,
  Calendar,
  User
} from "lucide-react"

import { memo } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react"

function PdfCard({ resource }) {
  const {
    title,
    description,
    image_url,
  
    file_url,
    created_at,
    user,
  
  } = resource;


  // Format date
  const date = new Date(created_at).toLocaleDateString();

  // Handle PDF download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file_url;
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle PDF view in new tab


  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
    >
      <Card className="w-full max-w-md overflow-hidden flex flex-col h-full border-none shadow-lg bg-card/50 backdrop-blur-sm group">
        {/* PDF Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image_url || `https://placehold.co/600x400?text=${encodeURIComponent(title)}`}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-orange-500 text-white border-none">
              PDF Document
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold line-clamp-2 text-orange-600 dark:text-orange-500">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 min-h-[60px]">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 flex-grow">
          {/* Meta Info */}
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {user && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{user.firstname} {user.lastname}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2 flex gap-2">
          
          <Button
            onClick={handleDownload}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default memo(PdfCard);
