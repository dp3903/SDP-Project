import React, { useEffect, useState , useContext } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ReactStars from "react-rating-stars-component"
import { Badge } from '../../ui/badge';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../../ui/button';
import { ThumbsUp, MessageSquareText, ChevronLeft, Pin, Route } from 'lucide-react'
import { redirect, UNSAFE_createClientRoutesWithHMRRevalidationOptOut, useLocation, useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AuthContext from "../AuthContext"
import ErrorPage from '../Error';

// const reviews = [
//     {
//       _id: "64a7f3b1d29a4e1234567890",
//       userId: "user123",
//       userName: "John Doe",
//       resourceId: "res567",
//       rating: 4.5,
//       comment: "This resource was very helpful and easy to follow!",
//       timestamp: "2024-12-01T10:15:30Z",
//     },
//     {
//       _id: "64a7f3b1d29a4e1234567891",
//       userId: "user456",
//       userName: "Jane Smith",
//       resourceId: "res567",
//       rating: 3.0,
//       comment: "The content was okay, but some parts were hard to understand.",
//       timestamp: "2024-12-02T14:25:45Z",
//     },
//     {
//       _id: "64a7f3b1d29a4e1234567892",
//       userId: "user789",
//       userName: "Alice Johnson",
//       resourceId: "res567",
//       rating: 5.0,
//       comment: "Absolutely fantastic! It exceeded my expectations.",
//       timestamp: "2024-12-03T09:00:00Z",
//     },
//     {
//       _id: "64a7f3b1d29a4e1234567893",
//       userId: "user321",
//       userName: "Bob Brown",
//       resourceId: "res567",
//       rating: 1.5,
//       comment: "The content quality was poor and not worth the time.",
//       timestamp: "2024-12-04T18:45:15Z",
//     },
//     {
//       _id: "64a7f3b1d29a4e1234567894",
//       userId: "user654",
//       userName: "Emily Davis",
//       resourceId: "res567",
//       rating: 4.0,
//       comment: "Good resource with a few minor flaws. Worth checking out!",
//       timestamp: "2024-12-05T12:30:20Z",
//     },
// ];
const roadmaps = [
    {
        id: 'roadmap-1',
        title: 'roadmap-1'
    },
    {
        id: 'roadmap-2',
        title: 'roadmap-2'
    },
    {
        id: 'roadmap-3',
        title: 'roadmap-3'
    },
    {
        id: 'roadmap-4',
        title: 'roadmap-4'
    },
];


function AddToRoadmap({ roadmaps , resource}) {
    const [selectedRoadmap, setSelectedRoadmap] = useState(null)
    const [roadmapId, setRoadmapId] = useState("")
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { token } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleSelectRoadmap = (id) => {
      const roadmap = roadmaps.find((r) => r._id === id)
      if (roadmap) {
        setSelectedRoadmap(roadmap)
        setRoadmapId(id)
        
      }
    }
  
    const handleConfirm = async () => {
      console.log(selectedRoadmap)
      // adding the resource to the roadmap 
      selectedRoadmap.remaining.push(resource)
      console.log(selectedRoadmap)
      const res = await fetch(import.meta.env.VITE_BACKEND+"/api/roadmaps/"+selectedRoadmap._id,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...selectedRoadmap})
      })
      if(res.ok)
      {
        const data = await res.json();
        console.log(data)
      }
      else{
        navigate("/error",{state:{error:{status:res.status, message:res.message||"Server Error"}}})
      }
      setDialogOpen(false)
    }
  
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-2 border-black">
            Add to roadmaps
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to your roadmaps.</DialogTitle>
            <DialogDescription>
              You can add this resource to any of your selected roadmap. If the resource already exists within the
              roadmap, it won't be affected.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-2">
            <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{selectedRoadmap ? selectedRoadmap.title : "Select Roadmap"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="center">
                <DropdownMenuLabel>Your Roadmaps</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  <DropdownMenuRadioGroup value={roadmapId} onValueChange={handleSelectRoadmap}>
                    {roadmaps.map((item) => (
                      <DropdownMenuRadioItem
                        key={item._id}
                        value={item._id}
                        // Prevent the dropdown from closing when clicking an item
                        onSelect={(e) => {
                          e.preventDefault()
                        }}
                      >
                        {item.title}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </div>
                <div className="mt-2 flex justify-end p-1">
                  <Button size="sm" onClick={() => setIsDropdownOpen(false)} variant="outline">
                    Done
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <DialogFooter className="flex flex-row sm:justify-between">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleConfirm} disabled={!selectedRoadmap}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }


  

function ResourceDetails(props) {

    const [open, setOpen] = React.useState(false)
    const [rating,setRating] = React.useState(0);
    const [comment,setComment] = React.useState('');
    const [reviews,setReviews] = React.useState([]);
    const [roadmaps,setRoadmaps] = React.useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);
    const { id , token , username} = useContext(AuthContext)
    const [resource, setResource] = useState({
        _id : location.state?.item?._id || '',
        title : location.state?.item?.title || '', 
        type : location.state?.item?.type || '',
        url : location.state?.item?.url || '',
        platform : location.state?.item?.platform || '', 
        tags : location.state?.item?.tags || [],
        averageRating : location.state?.item?.averageRating || 0,
        no_of_reviews : location.state?.item?.no_of_reviews || 0,
    })
   

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        // adding comment to db 
        let review = {
            userId : id,
            username : username,
            resourceId : resource._id,
            rating : rating,
            comment : comment,
        }
        try {
                const review_res = await fetch(import.meta.env.VITE_BACKEND+"/api/reviews/",{
                method : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    review
                )
            })
            if(review_res.ok)
            {
                const data = await review_res.json()
                console.log(data)
                setReviews([...reviews,data])
            }
        }
        catch(error) 
        {
            console.log(error)
        }
        let interaction = {
            userId : id,
            resourceId : resource._id,
            interactionType : "reviewed",
            timestamp : new Date().toISOString().replace(/\.\d+Z$/, "Z"),
        }
        try {
            const interaction_res = await fetch(import.meta.env.VITE_BACKEND+"/api/interactions/",{
                method : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    interaction
                )
            })
            if(interaction_res.ok)
            {
                const data = await interaction_res.json()
                console.log(data)
            }
        }

        catch (error) 
        {
            console.log(error)
        }
        console.log(rating,comment);
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleLike = async () => {
        let data = {
            userId : id,
            resourceId : resource._id,
            interactionType : "like" ,
            timestamp : new Date().toISOString().replace(/\.\d+Z$/, "Z"),
        }
        // add like interaction to the database 
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND+"/api/interactions/",{
                method : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    data
                )
            })
            if(response.ok)
            {
                const data = await response.json()
                console.log(data)
                // navigate('/home/details',{state: {item}})
            }
        }
        catch(error)
        {
            console.log(error)

        }
        console.log(data)
        setLiked((prev) => !prev);
        
    }
    // getting comments from the server 
    useEffect(()=>{
        const item = location.state?.item;
        if(!item){
            navigate("/error",{state:{error:{status:404, message:"Resource Not Found", redirect:'/home'}}})
            return
        }
        setResource(item)
        console.log(resource)
        const fetchReviews = async ()=>{
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND+`/api/reviews/resources/${resource._id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                })
                if(response.ok)
                {
                    const data = await response.json()
                    setReviews(data)
                    console.log(data)
                }
            }
            catch(error)
            {
                console.log(error)
            }
        }
        const fetchRoadmaps = async ()=>{
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND+`/api/roadmaps/`+id,{
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                })
                if(response.ok)
                {
                    const data = await response.json()
                    setRoadmaps(data)
                    console.log(data)
                }
            }
            catch(error)
            {
                console.log(error)
            }
        }
        fetchRoadmaps()
        fetchReviews()
    },[])



  return (
    <div className='flex flex-row h-full'>
        <div className="p-10 details w-1/2">
            <div className="flex flex-col gap-2">
                <h1 className="text-6xl">{resource.title}</h1>

                <div className="text-xl">
                    <ReactStars
                        edit={false}
                        count={5}
                        value={resource.averageRating}
                        size={24}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        // activeColor="rgba(96, 165, 250,1)"
                        // color={"rgba(255,255,255,.5)"}
                    />
                    <span>{resource.averageRating.toFixed(2)} / 5 ({resource.no_of_reviews || 10})</span>
                </div>

                <div className="text-lg mt-5">
                    Platform: {resource.platform}
                    <br/>
                    <div className=''>
                        <a 
                            href={resource.url}  
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="underline italic font-bold inline hover:underline"
                        >
                            {resource.url}
                        </a>
                    </div>
                    <br/>
                    Type: {resource.type}
                </div>

                <span className='text-lg'>Tags</span>
                <div className="text-md flex flex-row gap-1">
                    {resource.tags.map(tag => 
                        <Badge key={tag} className="py-1 px-2">{tag}</Badge>
                    )}
                </div>

                <div className="text-md mt-10 max-w-sm flex flex-row flex-wrap gap-2">
                    <Button onClick={handleBack} ><ChevronLeft/>Back</Button>
                    <Button
            onClick={handleLike}
            variant="outline"
            className={`border-2 !important ${
                liked
                    ? "border-white text-white bg-black hover:bg-black hover:text-white"
                    : "border-black text-black bg-white hover:bg-gray-200"
            }`}
        >
            Like <ThumbsUp />
        </Button>
                    {/* <Button onClick={handleLike} variant="outline" className="border-2 border-black" >Save <Pin/></Button> */}

                    <AddToRoadmap roadmaps={roadmaps} resource={resource} />
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="border-2 border-black">Comment<MessageSquareText/></Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader className="text-left">
                            <DrawerTitle>Comment on this resource</DrawerTitle>
                            <DrawerDescription>
                                You can comment on this resource by giving a rating out of 5 and a comment.
                            </DrawerDescription>
                            </DrawerHeader>

                            <form onSubmit={handleCommentSubmit} className='flex flex-col gap-2 p-4'>
                                <Label>Comment</Label>
                                <Input required className="w-4/5 border-2 border-gray-300" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="comment on this..."></Input>

                                <Label>Rate</Label>
                                <span>
                                <ReactStars
                                    edit={true}
                                    count={5}
                                    value={rating}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    onChange={(new_rating) => setRating(new_rating)}
                                />
                                {rating} / 5</span>

                                <DrawerClose asChild>
                                    <Button disabled={comment==''} type="submit">Submit</Button>
                                </DrawerClose>
                            </form>

                            <DrawerFooter className="pt-2">
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>

        </div>

        <div className="comments flex flex-col h-[100vh] min-w-80 gap-4 py-20">
            <div className="text-2xl">Comments</div>
            <div className="flex flex-col border-t-2 p-2 shadow-lg border-t-gray-600 overflow-y-auto custom-scrollbar gap-4">
                {reviews.length === 0 && <div>No comments yet...</div>}
                {reviews.map(review => 
                    <Card key={review._id} className="w-full bg-[rgba(255,255,255,.3)] backdrop-blur-lg border-none hover:shadow-lg hover:bg-[rgba(255,255,255,0.5)]">
                        <CardHeader>
                            <CardTitle>{review.username}</CardTitle>
                            <CardDescription>
                                <ReactStars
                                    edit={false}
                                    count={5}
                                    value={review.rating}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    // activeColor="rgba(96, 165, 250,1)"
                                    color={"rgba(255,255,255,.5)"}
                                    />
                                <span>{review.rating} / 5</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {review.comment}
                            
                        </CardContent>
                        <CardFooter className="flex justify-between gap-1">
                            
                        <CardDescription>
                                
                            </CardDescription>
                        </CardFooter>
                    </Card>
                )}
            </div>
        </div>
    </div>
  )
}

export default ResourceDetails