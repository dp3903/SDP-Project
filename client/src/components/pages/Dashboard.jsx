import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown, ThumbsUp, MessageSquareText } from "lucide-react"
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



const frameworks = [
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
        title: 'Resource name',
        type: 'Resource type',
        body: 'Resource body...',
        platform: 'Platform...',
        tags: ['react','frontend','development'],
    },
]

function Dashboard() {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

  return (
    <div className='m-10 h-full flex flex-col gap-10 flex-nowrap items-center'>
        <h1 className='text-6xl tracking-tight font-display'>Welcome to Hermes</h1>
        <div className="searchbar w-full flex flex-col flex-nowrap items-center">
            <Input placeholder="Search resources" className="rounded-full w-2/5 border-2 hover:shadow-lg hover:bg-slate-200 focus:bg-slate-200"></Input>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between rounded-full mt-2 text-gray-400"
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
                <div className="flex flex-row flex-wrap gap-2 mt-2">
                    {resources.map(item => 
                        <Card key={item.title} className="w-[250px] hover:shadow-lg hover:bg-slate-100">
                            <CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.type}</CardDescription>
                                <CardDescription>Available on {item.platform}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {item.body}

                                <CardDescription>
                                    <div className="w-full text-sm flex flex-row flex-wrap gap-1 mt-2">
                                        {item.tags.map(t =>
                                            <span key={t} className='border-2 rounded-full px-2'>{t}</span>
                                        )}
                                    </div>
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between gap-1">
                                
                                <Button className="bg-slate-300 text-black hover:bg-slate-400">Comment<MessageSquareText/></Button>
                                <Button variant="outline" className="bg-transparent hover:bg-blue-400">Like<ThumbsUp/></Button>
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