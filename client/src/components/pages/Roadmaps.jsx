import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import Roadmap from './Roadmap';
import { Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


const roadmaps = [
  {
    id : 1,
    title : 'Roadmap-title-1', 
    userId : 'User-id',
    resourceList : ['Resource1','Resource2','Resource3','Resource4',],
    completed : ['Resource1','Resource2','Resource3',],
    createdAt : 'MM-DD-YYYY', 
    progress : 75.0
  },
  {
    id : 2,
    title : 'Roadmap-title-2', 
    userId : 'User-id',
    resourceList : ['Resource1','Resource2','Resource3','Resource4',],
    completed : ['Resource1','Resource2','Resource3',],
    createdAt : 'MM-DD-YYYY', 
    progress : 75.0
  },
  {
    id : 3,
    title : 'Roadmap-title-3', 
    userId : 'User-id',
    resourceList : ['Resource1','Resource2','Resource3','Resource4',],
    completed : ['Resource1','Resource2','Resource3',],
    createdAt : 'MM-DD-YYYY', 
    progress : 75.0
  },
  {
    id : 4,
    title : 'Roadmap-title-4', 
    userId : 'User-id',
    resourceList : ['Resource1','Resource2','Resource3','Resource4',],
    completed : ['Resource1','Resource2','Resource3',],
    createdAt : 'MM-DD-YYYY', 
    progress : 75.0
  },
];

function Roadmaps() {

  function handleResourceClick(item) {

  }

  function handleNewRoadmap(e){
    e.preventDefault();
  }

  return (
    <div className="w-full h-full">
        <Tabs className="w-full h-full flex flex-row flex-nowrap justify-start">
          <TabsList className="h-[95%] max-w-96 bg-[rgba(255,255,255,.1)] my-4 overflow-y-auto flex-col justify-start border-none shadow-lg">
            <h1 className='text-black font-bold text-lg'>Your Roadmaps</h1>
            <TabsTrigger value="__create__" className="my-2 border-2 text-gray-700 text-wrap">
              Add roadmap
              <Plus/>
            </TabsTrigger>
            {roadmaps.map(roadmap => 
              <TabsTrigger key={roadmap.id} value={roadmap.id} className="hover:bg-white mt-1 border-b-2 rounded-none hover:rounded-md">
                {roadmap.title}
              </TabsTrigger>
            )}
          </TabsList>

          <div className='w-4/5'>
            <TabsContent value="__create__">
              <div className='flex flex-col justify-start items-center mt-8 gap-8'>
                <h1 className='font-display text-6xl'>Create a New Roadmap</h1>
                <form onSubmit={handleNewRoadmap} className='w-2/3'>
                  <Input placeholder="Roadmap name..."></Input>
                  <Button className="w-full mt-2">Submit</Button>
                </form>
              </div>
            </TabsContent>
            {roadmaps.map(roadmap => 
              <TabsContent key={roadmap.id} value={roadmap.id}>
                  <Roadmap roadmap={roadmap} />
              </TabsContent>
            )}
          </div>

        </Tabs>
    </div>
  )
}

export default Roadmaps