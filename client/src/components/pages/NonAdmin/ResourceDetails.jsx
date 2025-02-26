import React, { useEffect, useState } from 'react'
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
import { useLocation, useNavigate } from 'react-router-dom';
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


const reviews = [
    {
      _id: "64a7f3b1d29a4e1234567890",
      userId: "user123",
      userName: "John Doe",
      resourceId: "res567",
      rating: 4.5,
      comment: "This resource was very helpful and easy to follow!",
      timestamp: "2024-12-01T10:15:30Z",
    },
    {
      _id: "64a7f3b1d29a4e1234567891",
      userId: "user456",
      userName: "Jane Smith",
      resourceId: "res567",
      rating: 3.0,
      comment: "The content was okay, but some parts were hard to understand.",
      timestamp: "2024-12-02T14:25:45Z",
    },
    {
      _id: "64a7f3b1d29a4e1234567892",
      userId: "user789",
      userName: "Alice Johnson",
      resourceId: "res567",
      rating: 5.0,
      comment: "Absolutely fantastic! It exceeded my expectations.",
      timestamp: "2024-12-03T09:00:00Z",
    },
    {
      _id: "64a7f3b1d29a4e1234567893",
      userId: "user321",
      userName: "Bob Brown",
      resourceId: "res567",
      rating: 1.5,
      comment: "The content quality was poor and not worth the time.",
      timestamp: "2024-12-04T18:45:15Z",
    },
    {
      _id: "64a7f3b1d29a4e1234567894",
      userId: "user654",
      userName: "Emily Davis",
      resourceId: "res567",
      rating: 4.0,
      comment: "Good resource with a few minor flaws. Worth checking out!",
      timestamp: "2024-12-05T12:30:20Z",
    },
];
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


function AddToRoadmap(props) {

    const [roadmap,setRoadmap] = useState('');
    const { roadmaps } = props;

    const handleConfirm = (event) => {
        console.log(roadmap);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-2 border-black" >Add to roadmaps <Route/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add to your roadmaps.</DialogTitle>
                    <DialogDescription>
                        You can add this resource to any of your selected roadmap. If the resource already exists within the roadmap, it won't be affected.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-2">

                    {roadmap != '' && 
                        <div>
                            {roadmap}
                        </div>
                    }

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Select Roadmap</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Your Roadmaps</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuRadioGroup value={roadmap} onValueChange={setRoadmap}>
                            {roadmaps.map(item => 
                                <DropdownMenuRadioItem key={item.id} value={item.id}>{item.title}</DropdownMenuRadioItem>
                            )}
                            
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                
                </div>
                <DialogFooter className="flex flex-row sm:justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                        Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild disabled={roadmap==''}>
                        <Button type="button"  onClick={handleConfirm}>
                        Confirm
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
  

function ResourceDetails(props) {

    const [open, setOpen] = React.useState(false)
    const [rating,setRating] = React.useState(0);
    const [comment,setComment] = React.useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const { item } = location.state;

    if(!item){
        return <div>Error: 404 resource not found...</div>
    }
    
    // console.log(item);
    let resource = item;
    // console.log(resource);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        console.log(rating,comment);
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleLike = () => {
        console.log("liked")
    }


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
                        color={"rgba(255,255,255,.5)"}
                    />
                    <span>{resource.averageRating} / 5 ({resource.numberOfRatings})</span>
                </div>

                <div className="text-2xl">
                    Category: {resource.category}
                </div>

                <div className="text-lg mt-10">
                    Platform: {resource.platform}
                    <br/>
                    <span>
                        Link: <a href={resource.url} className="underline italic font-bold inline hover:underline mb-4">{resource.url}</a>
                    </span>
                    <br/>
                    Type: {resource.type}
                </div>

                <div className="text-md flex flex-row gap-1">
                    {resource.tags.map(tag => 
                        <Badge key={tag} className="py-1 px-2">{tag}</Badge>
                    )}
                </div>

                <div className="text-md mt-10 max-w-sm flex flex-row flex-wrap gap-2">
                    <Button onClick={handleBack} ><ChevronLeft/>Back</Button>
                    <Button onClick={handleLike} variant="outline" className="border-2 border-black" >Like <ThumbsUp/></Button>
                    <Button onClick={handleLike} variant="outline" className="border-2 border-black" >Save <Pin/></Button>

                    <AddToRoadmap roadmaps={roadmaps} />
                    
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

        <div className="comments flex flex-col h-[100vh] gap-4 py-20">
            <div className="text-2xl">Comments</div>
            <div className="flex flex-col border-t-2 p-2 shadow-lg border-t-gray-600 overflow-y-auto custom-scrollbar gap-4">
                {reviews.map(review => 
                    <Card key={review._id} className="w-full bg-[rgba(255,255,255,.3)] backdrop-blur-lg border-none hover:shadow-lg hover:bg-[rgba(255,255,255,0.5)]">
                        <CardHeader>
                            <CardTitle>{review.userName}</CardTitle>
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