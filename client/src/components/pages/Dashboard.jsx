import React from 'react'
import ReactStars from "react-rating-stars-component"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown,  } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'



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

function Dashboard() {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const navigate = useNavigate();

    const handleResourceClick = (item) => {
        console.log('hi',item);
        navigate('/home/details',{state: {item}})

    }

  return (
    <div className='p-10 h-full flex flex-col gap-10 flex-nowrap items-center'>
        <h1 className='text-6xl tracking-tight font-display'>Welcome to Hermes</h1>
        <div className="searchbar w-full flex flex-col flex-nowrap items-center">

            <Input placeholder="Search resources" className="rounded-full w-2/5 border-[1px] border-gray-500 bg-[rgba(255,255,255,.3)] placeholder:text-gray-700 hover:shadow-lg hover:bg-[rgba(55,55,55,0.1)] font-semibold"></Input>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("w-[200px] justify-between rounded-full mt-2 text-gray-500 border-[1px] border-gray-500 hover:shadow-lg hover:bg-[rgba(55,55,55,0.1)]" ,value ? 'focus:bg-slate-200 text-black' : 'bg-[rgba(255,255,255,.3)]')}
                    >
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Filter..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                    <CommandInput placeholder="Filter..." />
                    <CommandList>
                        <CommandEmpty>No Technology found.</CommandEmpty>
                        <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                            >
                            <Check
                                className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            {framework.label}
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
        <div className="w-full flex flex-row gap-2 flex-wrap">
            <div className="w-full min-w-fit">
                <h1 className='text-center text-3xl font-display border-b-2 py-2'>
                    Recommended For you
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
    </div>
  )
}

export default Dashboard