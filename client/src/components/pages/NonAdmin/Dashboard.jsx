import React, { useContext, useEffect } from 'react'
import { Input } from '../../ui/input'
import { toast } from 'sonner';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import CustomCard from './CustomCard'
import AuthContext from '../AuthContext'
import { Grid, MagnifyingGlass } from 'react-loader-spinner';

const frameworks = [
    {
      value: "",
      label: "None",
    },
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
];

const demoResources = [
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

function Dashboard() {

    const [open, setOpen] = React.useState(false)
    const [isSearch, setIsSearch] = React.useState(false)
    const [isSearching, setIsSearching] = React.useState(false)
    const [filterValue, setFilterValue] = React.useState("")
    const [searchValue, setSearchValue] = React.useState("")
    const [resources, setResources] = React.useState([]);
    const { id , token} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleResourceClick =async (item) => {
        console.log('hi',item);
        // add like interaction to the database 
        let data = {
            userId : id,
            resourceId : item._id,
            interactionType : "click" ,
            timestamp : new Date().toISOString().replace(/\.\d+Z$/, "Z"),
        }
        // add like interaction to the database 
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND+'/api/interactions/',{
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
                navigate('/home/details',{state: {item}})
            }
        }
        catch(error)
        {
            console.log(error)
            navigate('/error',{error})
        }
      
        
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsSearching(true)
        setResources([])
        if(searchValue.trim() === ''){
            // get recommendations 
            let user_id = id 
            try {
                const rec_response = await fetch(import.meta.env.VITE_REC+"/api/recommendations/"+user_id,)
                if(rec_response.ok)
                {
                    let recommendations = await rec_response.json();
                    setResources(recommendations.recommended_resources)
                    console.log(recommendations)
                }
            }
            catch (error) {
                error.status == null ? error.status=500 : null ;
                error.message == null ? error.message="Internal Server Error." : null ;
                console.log("Recommendations error:", error);
                navigate('/error',{state:{error:{status:500, message:"Internal server error."}}})
            }
            setIsSearch(false)
            setIsSearching(false)
            setResources(resources)
        }
        else{
            // search from all
            try {
                const search_res = await fetch(import.meta.env.VITE_BACKEND+"/api/resources/search?q="+searchValue,{
                    method : "GET",
                    headers : {
                        "Authorization": `Bearer ${token}`,  // Set Bearer token here
                        "Content-Type": "application/json",
                    }
                })
                if(!search_res.ok)
                {
                    console.log("ERROR seacrhing the database")
                }
                const data = await search_res.json();
                console.log(data)
                setIsSearch(true)
                setIsSearching(false)
                setResources(data);
            }
            catch (error)
            {
                console.log(error)
                navigate('/error',{error})
            }
           
        }
    }

    useEffect(()=>{
        // get recommendations
        let user_id = id 
        const recResponse = async () => {
            try {
                console.log(import.meta.env.VITE_REC)
                const rec_response = await fetch(import.meta.env.VITE_REC+"/api/recommendations/"+user_id,)
                if(rec_response.ok)
                {
                    let recommendations = await rec_response.json();
                    setResources(recommendations.recommended_resources)
                    console.log(recommendations)
                }
            }
            catch (error) {
                error.status == null ? error.status=500 : null ;
                error.message == null ? error.message="Internal Server Error." : null ;
                console.log("Recommendations error:", error);
                navigate('/error',{state:{error:{status:500, message:"Internal server error."}}})
            }
        }
        // setResources(demoResources)
        recResponse()
    },[]);

  return (
    <div className='p-10 h-full flex flex-col gap-10 flex-nowrap items-center'>
        <h1 className='text-6xl tracking-tight font-display'>Welcome to Hermes</h1>
        <form onSubmit={handleSearch} className="searchbar w-full flex flex-col flex-nowrap items-center">

            <Input placeholder="Search resources" value={searchValue} onChange={e => setSearchValue(e.target.value)} className="rounded-full w-2/5 border-[1px] border-gray-500 bg-[rgba(255,255,255,.3)] placeholder:text-gray-700 hover:shadow-lg hover:bg-[rgba(55,55,55,0.1)] font-semibold"></Input>

        </form>
        <div className="w-full flex flex-row gap-2 flex-wrap">
            <div className="w-full min-w-fit">
                <h1 className='text-center text-3xl font-display border-b-2 py-2'>
                     {isSearch ? "Search Results" : "Recommended For You"}
                </h1>
                <div className="flex flex-row justify-center flex-wrap gap-2 mt-2 p-4">
                {resources.length > 0 ? (
    resources.map(item => (
        <CustomCard key={item._id} item={item} onClick={() => handleResourceClick(item)} />
    ))
) : (
    isSearching ? (
        <div className='flex flex-col items-center gap-10'>
            <div className='font-semibold text-lg'>
                Getting Your Search results...
            </div>
            <MagnifyingGlass
                visible={true}
                height="120"
                width="120"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </div>
    ) : (
        <div className='flex flex-col items-center gap-10'>
            <div className='font-semibold text-lg'>
                Getting your recommendations...
            </div>
            <Grid
                visible={true}
                height="80"
                width="80"
                color="rgb(0,0,0)"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="grid-wrapper"
            />
        </div>
    )
)}

                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard