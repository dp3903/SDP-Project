import {
    Card,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Button } from "../../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { Star } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import CustomCard from "./CustomCard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthContext from "../AuthContext"
import { useEffect, useContext } from "react"


function EditProfile({ username, setUsername, token, email, setEmail }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-2xl'>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done. Click anywhere outside to exit.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          <div>
            <Label htmlFor="username" className="text-right text-nowrap">
              Username
            </Label>
            <Input
              id="username"
              defaultValue={username}
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-right text-nowrap">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={email}
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="oldPassword" className="text-right text-nowrap">
              Old Password
            </Label>
            <Input
              id="oldPassword"
              type="password"
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-right text-nowrap">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-right text-nowrap">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              className="col-span-3"
            />
          </div>

        </div>
        <DialogFooter className="sm:justify-between">

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button type="submit">
            Save changes
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function ProfilePage() {

  const navigate = useNavigate();
  const { username, setUsername, token, email, setEmail } = useContext(AuthContext);

  const userStats = {
    averageRating: 4.7,
    resourcesLiked: 10,
    roadmapsCompleted: 2,
    roadmapsOngoing: 1,
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
        <Card className="p-6 mb-8 bg-[rgba(255,255,255,.4)] border-none shadow-lg backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-semibold mb-2">{username}</h1>
              <p className="text-gray-600 mb-4">Resource Curator & Tech Enthusiast</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">

                <div className="text-center">
                  <div className="font-semibold">{userStats.resourcesLiked}</div>
                  <div className="text-sm text-gray-600">Resources Liked</div>
                </div>
                
                <div className="text-center">
                  <div className="font-semibold">{userStats.roadmapsCompleted}</div>
                  <div className="text-sm text-gray-600">Roadmaps Completed</div>
                </div>
                
                <div className="text-center">
                  <div className="font-semibold">{userStats.roadmapsOngoing}</div>
                  <div className="text-sm text-gray-600">Ongoing Roadmaps</div>
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
            
            <div>  
              <EditProfile username={username} setUsername={setUsername} token={token} email={email} setEmail={setEmail} />
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="liked" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 bg-transparent border-[1px]">
            <TabsTrigger value="liked" className="flex-1 data-[state=active]:bg-[rgb(246,245,255)] text-black">
              Liked
            </TabsTrigger>
            <TabsTrigger value="commented" className="flex-1 data-[state=active]:bg-[rgb(246,245,255)] text-black">
              Commented
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex-1 data-[state=active]:bg-[rgb(246,245,255)] text-black">
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

