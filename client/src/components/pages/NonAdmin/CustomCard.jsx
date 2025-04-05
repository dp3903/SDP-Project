import React from 'react'
import ReactStars from "react-rating-stars-component"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


function CustomCard({ item, onClick }) {
  return (
    <Card key={item.id} onClick={onClick} className="w-[250px] bg-[rgba(248,247,255,.8)] transition-all border-none hover:shadow-lg hover:bg-white hover:scale-[1.03]">
        <CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.type}</CardDescription>
            <CardDescription>Available on {item.platform}</CardDescription>
        </CardHeader>

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
                <span>{item.averageRating.toFixed(2)} / 5 ({item.no_of_reviews || 10})</span>
            </CardDescription>
        </CardFooter>
    </Card>
  )
}

export default CustomCard