import React, { useContext, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import Roadmap from './Roadmap';
import { Plus, CircleHelp } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';

// const test_roadmaps = [
//   {
//     _id : 1,
//     title : 'Roadmap-title-1', 
//     userId : 'User-id',
//     remaining : [
//       { _id : '4', title : 'Title-4', },
//       { _id : '5', title : 'Title-5', },
//       { _id : '6', title : 'Title-6', },
//       { _id : '7', title : 'Title-7', },
//       { _id : '8', title : 'Title-8', },
//       { _id : '9', title : 'Title-9', },
//       { _id : '10', title : 'Title-10', },
//       { _id : '11', title : 'Title-11', },
//       { _id : '12', title : 'Title-12', },
//       { _id : '13', title : 'Title-13', },
//       { _id : '14', title : 'Title-14', },
//       { _id : '15', title : 'Title-15', },
//       { _id : '16', title : 'Title-16', },
//       { _id : '17', title : 'Title-17', },
//       { _id : '18', title : 'Title-18', },
//       { _id : '19', title : 'Title-19', },
//     ],
//     completed : [
//       { _id : '1', title : 'Title-1', },
//       { _id : '2', title : 'Title-2', },
//     ],
//     ongoing : [
//       { _id : '3', title : 'Title-3', },
//     ],
//     createdAt : 'MM-DD-YYYY', 
//     progress : 50.0
//   },
//   {
//     _id : 2,
//     title : 'Roadmap-title-2', 
//     userId : 'User-id',
//     remaining : [
//       { _id : '4', title : 'Title-4', },
//     ],
//     completed : [
//       { _id : '1', title : 'Title-1', },
//       { _id : '2', title : 'Title-2', },
//     ],
//     ongoing : [
//       { _id : '3', title : 'Title-3', },
//     ],
//     createdAt : 'MM-DD-YYYY', 
//     progress : 50.0
//   },
//   {
//     _id : 3,
//     title : 'Roadmap-title-3', 
//     userId : 'User-id',
//     remaining : [
//       { _id : '4', title : 'Title-4', },
//     ],
//     completed : [
//       { _id : '1', title : 'Title-1', },
//       { _id : '2', title : 'Title-2', },
//     ],
//     ongoing : [
//       { _id : '3', title : 'Title-3', },
//     ],
//     createdAt : 'MM-DD-YYYY', 
//     progress : 50.0
//   },
  
// ];

function Roadmaps() {
  const [roadmaps,setRoadmaps] = React.useState([])
  const { id , token } = useContext(AuthContext)
  const navigate = useNavigate()
  function handleResourceClick(item) {

  }

  async function handleNewRoadmap(e){
    e.preventDefault();
    let title = e.target.roadmap_name.value 
    console.log(title)
    let roadmap = { 
      title : title , 
      userId : id,
      completed : [],
      remaining : [],
      ongoing : [], 
      createdAt : new Date().toISOString().replace(/\.\d+Z$/, "Z"),
      progress : 0.0
    }
    const res = await fetch("http://localhost:8000/api/roadmaps/",{
      method : "POST",
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    roadmap 
                )
    })
    if(res.ok)
    {
      const data = await res.json()
      console.log(data)
      setRoadmaps(prev=>[...prev,data])
    }
    else{
      navigate("/error",{state:{error:{status:res.status, message:res.message||"Server Error."}}})
    }

  }
  useEffect( ()=>{
    const fetchData = async () => {
      try{

        const response = await fetch(`http://localhost:8000/api/roadmaps/${id}`,{
          headers: {
            'Authorization': `Bearer ${token}`, 
          }
        })
        if(response.status == 404){
          return
        }
        const data = await response.json()
        setRoadmaps([...data])
        // setRoadmaps(test_roadmaps)
        console.log(roadmaps)
      }
      catch(error){
        console.log(error)
        navigate("/error",{state:{error:{status:500, message:"Internal Server Error."}}})
        return;
      }
    }
    fetchData()
  },[])

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
                key={roadmap._id}
                value={roadmap._id}
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
                <h1 className='font-display text-2xl'>Setting roadmaps helps you manage multiple courses</h1>
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
                  <Input placeholder="Roadmap name..." id="roadmap_name"></Input>
                  <Button className="w-full mt-2">Create Roadmap</Button>
                </form>
              </div>
            </TabsContent>
            {roadmaps.map(roadmap => 
              <TabsContent key={roadmap._id} value={roadmap._id} className="h-5/6">
                  <Roadmap roadmap={roadmap} />
              </TabsContent>
            )}
          </div>

        </Tabs>
    </div>
  )
}

export default Roadmaps