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
import React, { useEffect, useContext } from "react"
import {toast} from 'sonner';
// import { useNavigate } from 'react-router-dom';

function EditProfile({ username, setUsername, token, email, setEmail }) {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username,
    email,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const { id } = useContext(AuthContext)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  async function updateUser(user){
    const res = await fetch("http://localhost:8000/api/users/"+id,{
      method : "PUT",
      headers : {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body : JSON.stringify({
        ...user
      })

    })
    if(res.ok)
    {
      const data = await res.json()
      console.log(data)
    }
    else {
      console.log(res)
    }
  }
  const handleUserUpdate = async (e) => {
    e.preventDefault();
    
    const { username, email, oldPassword, newPassword, confirmPassword } = formData;
    
    if (!username || !email || !oldPassword || !newPassword || !confirmPassword) {
      toast.error('All fields must be filled');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    
    if (newPassword === oldPassword) {
      toast.error('New password must be different from the old password');
      return;
    }
    
    // toast.success('Profile updated successfully');
    console.log('Updated Data:', formData);

    const auth_res = await fetch("http://localhost:8000/api/users/"+id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });
    const data = await auth_res.json();
    if (auth_res.ok) {
      console.log("Login successful:",data);
      let user = {
        "_id":id,
        "name":formData.username, 
        "email":formData.email,
        "password":formData.newPassword,
      }
      console.log(user)
      updateUser(user);
    } else {
      console.error("Login failed:", data);
      toast.error("password is incorrect")
    }


  };
  async function handleDeleteAccount()
  {
      // const res = await fetch("http://localhost:8000/api/users/"+id,)
      // logic for deleting mappings removing the interactions of the users etc... 
      toast.success("account deleted successfully")
      navigate("/")
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleUserUpdate}>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input id="oldPassword" type="password" value={formData.oldPassword} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" value={formData.newPassword} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} />
          </div>
          <div className="flex justify-between items-center">
            {/* Red Delete Account Button on the Left */}
            <Button
              type="button"
              className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
  
            {/* Save Changes Button on the Right */}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
  
}
function handleUserUpdate(event) {
  event.preventdefault()
  console.log(event)
}
export default function ProfilePage() {

  const navigate = useNavigate();
  const { username, setUsername, token, email, setEmail , id } = useContext(AuthContext);
  const [resourcesLiked,setResourceLiked] = React.useState([])
  const [resourceReviewed,setResourceReviewed] = React.useState([])
  // const [userStats,setUserStats] = React.useState({}) 
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
    const getLikedResources = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/resources/like/${id}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
        console.log("Liked Resources:", data);
        setResourceLiked(data)
        
      } catch (error) {
        console.error("Failed to fetch liked resources:", error);
      }
    };
    const getReviewedResources = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/resources/review/${id}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Reviewed Resources:", data);
        setResourceReviewed(data)
      } catch (error) {
        console.error("Failed to fetch liked resources:", error);
      }
    }
    
    useEffect(()=>{
          getLikedResources();
          getReviewedResources();

    },[])

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
                  <div className="font-semibold">{resourcesLiked.length}</div>
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
                
                {/* <div className="text-center">
                  <div className="font-semibold flex items-center justify-center gap-1">
                    {userStats.averageRating}
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="text-sm text-gray-600">Avg. Rating</div>
                </div> */}
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
            {/* <TabsTrigger value="saved" className="flex-1 data-[state=active]:bg-[rgb(246,245,255)] text-black">
              Saved
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="liked">
            <div className="flex flex-row flex-wrap gap-2 mt-2">
            {resourcesLiked.length > 0 ? (
  resourcesLiked.map((item) => (
    <CustomCard key={item.id} item={item} onClick={() => handleResourceClick(item)} />
  ))
) : (
  <p className="text-center text-black-500">No likes yet </p>
)}
            </div>
          </TabsContent>
          <TabsContent value="commented">
          {resourceReviewed?.length > 0 ? (
  resourceReviewed.map((item) => (
    <CustomCard key={item.id} item={item} onClick={() => handleResourceClick(item)} />
  ))
) : (
  <p className="text-center text-black-500">No Reviews yet </p>
)}
          </TabsContent>
          
          
          {/* <TabsContent value="saved">
            <div className="text-center text-gray-600">
              No saved resources yet
            </div>
          </TabsContent> */}

        </Tabs>
      </div>
    </div>
  )
}

