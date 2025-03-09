import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import Roadmap from './Roadmap';
import { Plus, CircleHelp } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';


const roadmaps = [
  {
    id : 1,
    title : 'Roadmap-title-1', 
    userId : 'User-id',
    resourceList : [
      { id : '1', title : 'Title-1', },
      { id : '2', title : 'Title-2', },
      { id : '3', title : 'Title-3', },
      { id : '4', title : 'Title-4', },
      { id : '5', title : 'Title-5', },
      { id : '6', title : 'Title-6', },
      { id : '7', title : 'Title-7', },
      { id : '8', title : 'Title-8', },
      { id : '9', title : 'Title-9', },
      { id : '10', title : 'Title-10', },
      { id : '11', title : 'Title-11', },
      { id : '12', title : 'Title-12', },
      { id : '13', title : 'Title-13', },
      { id : '14', title : 'Title-14', },
      { id : '15', title : 'Title-15', },
      { id : '16', title : 'Title-16', },
      { id : '17', title : 'Title-17', },
      { id : '18', title : 'Title-18', },
      { id : '19', title : 'Title-19', },
    ],
    completed : [
      { id : '1', title : 'Title-1', },
      { id : '2', title : 'Title-2', },
    ],
    ongoing : [
      { id : '3', title : 'Title-3', },
    ],
    createdAt : 'MM-DD-YYYY', 
    progress : 50.0
  },
  {
    id : 2,
    title : 'Roadmap-title-2', 
    userId : 'User-id',
    resourceList : [
      { id : '1', title : 'Title-1', },
      { id : '2', title : 'Title-2', },
      { id : '3', title : 'Title-3', },
      { id : '4', title : 'Title-4', },
    ],
    completed : [
      { id : '1', title : 'Title-1', },
      { id : '2', title : 'Title-2', },
    ],
    ongoing : [
      { id : '3', title : 'Title-3', },
    ],
    createdAt : 'MM-DD-YYYY', 
    progress : 50.0
  },
  {
    id : 3,
    title : 'Roadmap-title-3', 
    userId : 'User-id',
    resourceList : [
      { id : '1', title : 'Title-1', },
      { id : '2', title : 'Title-2', },
      { id : '3', title : 'Title-3', },
      { id : '4', title : 'Title-4', },
    ],
    completed : [
      { id : '1', title : 'Title-1', },
      { id : '2', title : 'Title-2', },
    ],
    ongoing : [
      { id : '3', title : 'Title-3', },
    ],
    createdAt : 'MM-DD-YYYY', 
    progress : 50.0
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
        <Tabs defaultValue='__default__' className="w-full h-full flex flex-row flex-nowrap justify-start">
          <TabsList
            className="h-[97%] max-w-96 bg-[#f8f7ff] my-2 p-4 overflow-y-auto flex flex-col justify-start border-none shadow-lg"
          >
            <h1 className="text-black font-bold text-lg">Your Roadmaps</h1>
            <TabsTrigger
              value="__create__"
              className="my-2 border-2 text-gray-700 text-wrap hover:bg-[#b8b8ff]"
            >
              Add roadmap
              <Plus />
            </TabsTrigger>
            {roadmaps.map((roadmap) => (
              <TabsTrigger
                key={roadmap.id}
                value={roadmap.id}
                className="hover:bg-[#b8b8ff] mt-1 border-b-2 rounded-none hover:rounded-md"
              >
                {roadmap.title}
              </TabsTrigger>
            ))}
            <TabsTrigger
              value='__default__'
              className="mt-auto w-full data-[state=active]:bg-[rgb(246,245,255)] data-[state=active]:shadow-none border-t-2 "
            >
              <div className="">
                <button className="text-sm text-gray-500 hover:text-gray-700 p-2 w-full">
                  <CircleHelp className='inline' />
                </button>
              </div>              
            </TabsTrigger>
            
          </TabsList>

          <div className='w-5/6'>
            <TabsContent value="__default__">
              <div className='flex flex-col justify-start items-center mt-8 gap-8'>
                <h1 className='font-display text-6xl'>Roadmaps</h1>
                <h1 className='font-display text-2xl'>Setting roadmaps helps you manage multiple coarses</h1>
                <ul className='list-decimal text-md max-w-xl font-bold list-inside flex flex-col gap-4'>
                  <li>
                    If you are new start by creating your first roadmap.
                  </li>
                  <li>
                    Click on the 'Add roadmap' on the roadmaps' sidebar to add a roadmap.
                  </li>
                  <li>
                    Your roadmaps will be visible in the roadmaps sidebar. Click on any of them to open them.
                  </li>
                  <li>
                    To add items, go to the details page of the coarse you want to add, and use the 'Add to roadmap' option provided.
                  </li>
                  <li>
                    Each item in a roadmap can be re-arranged and placed in any of the appropriate catagories <i>( 'Remaining', 'On-Going' and 'Completed' )</i> using drag and drop features.
                  </li>
                  <li>
                    You can access this help page by clicking on the help icon given below on the roadmap sidebar anytime.
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="__create__">
              <div className='flex flex-col justify-start items-center mt-8 gap-8'>
                <h1 className='font-display text-6xl'>Create a New Roadmap</h1>
                <form onSubmit={handleNewRoadmap} className='w-2/3'>
                  <Input placeholder="Roadmap name..."></Input>
                  <Button className="w-full mt-2">Create Roadmap</Button>
                </form>
              </div>
            </TabsContent>
            {roadmaps.map(roadmap => 
              <TabsContent key={roadmap.id} value={roadmap.id} className="h-5/6">
                  <Roadmap roadmap={roadmap} />
              </TabsContent>
            )}
          </div>

        </Tabs>
    </div>
  )
}

export default Roadmaps