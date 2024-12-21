import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from "@/components/ui/progress"


function Roadmap(props) {

    const  [roadmap,setRoadmap]  = useState(props.roadmap);

    useEffect(() => {
        setRoadmap(props.roadmap);
    },[]);
    console.log(roadmap.resourceList);

    function handleCheck(resource){
        setRoadmap(roadmap => {
            return ({
                ...roadmap,
                completed: [...roadmap.completed,resource],
                progress: (roadmap.completed.length+1) / roadmap.resourceList.length * 100,
            });
        })
    }

    return (
        <div className='h-full w-full ml-10 mb-4'>
            <h1 className='text-center font-semibold text-4xl my-4 py-4 border-b-2'>
                {roadmap.title}
            </h1>
            <div className='w-full h-4/5 '>
                <Table className="font-medium">
                    <TableHeader className="block">
                        <TableRow className="w-full flex justify-between">
                            <TableHead className="flex-1">No.</TableHead>
                            <TableHead className="flex-1">Name</TableHead>
                            <TableHead className="flex-1">URL</TableHead>
                            <TableHead className="flex-1">Completed</TableHead>
                            <TableHead className="flex-1">Mark</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="block max-h-80 custom-scrollbar overflow-y-auto">
                        {roadmap.resourceList.map((resource,index) => 
                            <TableRow className="w-full flex justify-between">
                                <TableCell className="flex-1">{index}</TableCell>
                                <TableCell className="flex-1">{resource}</TableCell>
                                <TableCell className="flex-1"><a href="#" className='text-blue-500'>url</a></TableCell>
                                <TableCell className="flex-1 text-right">
                                    {(roadmap.completed.includes(resource)) &&
                                        <span className='text-green-500'><Check/></span>
                                    }
                                    {!(roadmap.completed.includes(resource)) &&
                                        <span className='text-red-500'><X/></span>
                                    }
                                </TableCell>
                                <TableCell className="flex-1">
                                    {!(roadmap.completed.includes(resource)) &&
                                        <Button variant="outline" onClick={()=>handleCheck(resource)}><Check/></Button>
                                    }
                                    {(roadmap.completed.includes(resource)) &&
                                        <span className='text-gray-500'>Completed</span>
                                    }
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div>
                <h1 className='text-center font-semibold text-4xl mt-4 pt-4'>
                    Your Progress
                </h1>
                <h1 className='text-center font-semibold text-xl mb-4 py-4 border-b-2'>
                    {roadmap.progress}%
                </h1>
                <Progress value={roadmap.progress}></Progress>
            </div>
        </div>
    )
}

export default Roadmap