import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import ReactStars from "react-rating-stars-component"



const resources = [
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
    {
        id : 3,
        title : 'Title', 
        type : 'Type',
        category : 'Category', 
        url : 'URL',
        platform : 'Platform', 
        tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
        averageRating : 4.7,
        numberOfRatings: 100,
    },
    {
        id : 4,
        title : 'Title', 
        type : 'Type',
        category : 'Category', 
        url : 'URL',
        platform : 'Platform', 
        tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
        averageRating : 4.7,
        numberOfRatings: 100,
    },
    {
        id : 5,
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

function Trending() {

    const navigate = useNavigate();

    const handleResourceClick = (item) => {
        console.log('hi',item);
        navigate('/home/details',{state: {item}})

    }

  return (
    <div className="w-full flex flex-row gap-2 pt-20 flex-wrap">
        <div className="w-full min-w-fit">
            <h1 className='text-center text-3xl font-display border-b-2 border-b-black mx-4 py-2'>
                Trending
            </h1>
            <div className="flex flex-row justify-center flex-wrap gap-2 mt-2 p-4">
                {resources.map(item => 
                    <Card key={item.id} onClick={()=>handleResourceClick(item)} className="w-[250px] bg-[rgba(255,255,255,.3)] backdrop-blur-lg border-none shadow-lg hover:bg-[rgba(55,55,55,0.1)]">
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.type}</CardDescription>
                            <CardDescription>Available on {item.platform}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <a href={item.url} className="text-blue-500 hover:underline mb-4 block">{item.url}</a>

                            
                        </CardContent>
                        <CardFooter className="flex justify-between gap-1">
                            
                        <CardDescription>
                                <ReactStars
                                    edit={false}
                                    count={5}
                                    value={item.averageRating}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    // activeColor="rgba(96, 165, 250,1)"
                                    color={"rgba(255,255,255,.5)"}
                                />
                                <span>{item.averageRating} / 5 ({item.numberOfRatings})</span>
                            </CardDescription>
                        </CardFooter>
                    </Card>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default Trending