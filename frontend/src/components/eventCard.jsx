import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function EventCard({ image, title, description, link }) {
  return (
    <Card className="h-full">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-xl" />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={link}>View Details</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
