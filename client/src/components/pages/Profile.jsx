import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ReactStars from "react-rating-stars-component"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Star } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import CustomCard from "./CustomCard"

export default function ProfilePage() {

    const navigate = useNavigate();

  const userStats = {
    recommendations: 156,
    averageRating: 4.7
  }

  const recommendedResources = [
    {
        id : 1,
        title : 'Title', 
        type : 'Type',
        category : 'Category', 
        url : 'URL',
        platform : 'Platform', 
        tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
        averageRating : 3.2,
        numberOfRatings: 100,
    },
    {
        id : 2,
        title : 'Title', 
        type : 'Type',
        category : 'Category', 
        url : 'URL',
        platform : 'Platform', 
        tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
        averageRating : 4.7,
        numberOfRatings: 100,
    },
  ]

    const handleResourceClick = (item) => {
        console.log('hi',item);
        navigate('/home/details',{state: {item}})

    }

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-6 mb-8 bg-[rgba(255,255,255,.2)] border-none shadow-lg backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-semibold mb-2">John Doe</h1>
              <p className="text-gray-600 mb-4">Resource Curator & Tech Enthusiast</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-center">
                  <div className="font-semibold">{userStats.recommendations}</div>
                  <div className="text-sm text-gray-600">Recommendations</div>
                </div>
                
                <div className="text-center">
                  <div className="font-semibold flex items-center justify-center gap-1">
                    {userStats.averageRating}
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-sm text-gray-600">Avg. Rating</div>
                </div>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="liked" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 bg-transparent border-[1px]">
            <TabsTrigger value="liked" className="flex-1 data-[state=active]:bg-[rgb(246,245,255)]">
              Liked
            </TabsTrigger>
            <TabsTrigger value="commented" className="flex-1 data-[state=active]:bg-[rgb(246,245,255)]">
              Commented
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1 data-[state=active]:bg-[rgb(246,245,255)]">
              Saved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="liked">
            <div className="flex flex-row flex-wrap gap-2 mt-2">
              {recommendedResources.map((item) => (
                <CustomCard key={item.id} item={item} onClick={()=>handleResourceClick(item)} />
                    
              ))}
            </div>
          </TabsContent>

          <TabsContent value="commented">
            <div className="text-center text-gray-600">
              No comments
            </div>
          </TabsContent>
          
          
          <TabsContent value="saved">
            <div className="text-center text-gray-600">
              No saved resources yet
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}

