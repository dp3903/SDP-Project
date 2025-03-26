import React, { useEffect } from 'react'
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
import CustomCard from './CustomCard';



// const resources = [
//     {
//         id : 1,
//         title : 'Title', 
//         type : 'Type',
//         category : 'Category', 
//         url : 'URL',
//         platform : 'Platform', 
//         tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
//         averageRating : 3.2,
//         numberOfRatings: 100,
//     },
//     {
//         id : 2,
//         title : 'Title', 
//         type : 'Type',
//         category : 'Category', 
//         url : 'URL',
//         platform : 'Platform', 
//         tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
//         averageRating : 4.7,
//         numberOfRatings: 100,
//     },
//     {
//         id : 3,
//         title : 'Title', 
//         type : 'Type',
//         category : 'Category', 
//         url : 'URL',
//         platform : 'Platform', 
//         tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
//         averageRating : 4.7,
//         numberOfRatings: 100,
//     },
//     {
//         id : 4,
//         title : 'Title', 
//         type : 'Type',
//         category : 'Category', 
//         url : 'URL',
//         platform : 'Platform', 
//         tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
//         averageRating : 4.7,
//         numberOfRatings: 100,
//     },
//     {
//         id : 5,
//         title : 'Title', 
//         type : 'Type',
//         category : 'Category', 
//         url : 'URL',
//         platform : 'Platform', 
//         tags : ['Tag-1','Tag-2','Tag-3','Tag-4',],
//         averageRating : 4.7,
//         numberOfRatings: 100,
//     },
// ]

function Trending() {

    const navigate = useNavigate();
    const [resources,setResources] = React.useState([])
    const handleResourceClick = (item) => {
        console.log('hi',item);
        navigate('/home/details',{state: {item}})

    }
    useEffect(()=>{
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8080/api/trending/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setResources(data);
            }
            catch (error) {
                console.error('Error:', error);
                navigate("/error",{state:{error:{status:500, message:"Internal Server Error."}}})
                return;
            }
        }
        fetchData();
    },[])

  return (
    <div className="w-full flex flex-row gap-2 pt-20 flex-wrap">
        <div className="w-full min-w-fit">
            <h1 className='text-center text-3xl font-display border-b-2 border-b-black mx-4 py-2'>
                Trending
            </h1>
            <div className="flex flex-row justify-center flex-wrap gap-2 mt-2 p-4">
            {resources && resources.length > 0 ? (
    resources.map(item => (
        <CustomCard key={item.id} item={item} onClick={() => handleResourceClick(item)} />
    ))
) : (
    <p className="text-black-500 text-center">Getting New Trends📈📉</p>
)}

                
            </div>
        </div>
    </div>
  )
}

export default Trending