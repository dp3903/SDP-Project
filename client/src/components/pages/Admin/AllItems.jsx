import React from 'react'
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DataTable from './DataTable'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

 
const resources = [
  {
      id: "r1",
      title: "React for Beginners",
      type: "video",
      category: "frontend",
      url: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
      platform: "YouTube",
      tags: ["react", "frontend", "javascript", "web development"],
      averageRating: 4.8,
      no_of_reviews: 1200
  },
  {
      id: "r2",
      title: "Node.js Crash Course",
      type: "video",
      category: "backend",
      url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
      platform: "YouTube",
      tags: ["nodejs", "backend", "javascript", "express"],
      averageRating: 4.7,
      no_of_reviews: 950
  },
  {
      id: "r3",
      title: "Data Structures and Algorithms Explained",
      type: "blog",
      category: "dsa",
      url: "https://www.geeksforgeeks.org/data-structures/",
      platform: "GeeksforGeeks",
      tags: ["dsa", "algorithms", "programming", "computer science"],
      averageRating: 4.6,
      no_of_reviews: 2200
  },
  {
      id: "r4",
      title: "Machine Learning Course",
      type: "pdf",
      category: "machineLearning",
      url: "https://cs229.stanford.edu/notes2021fall/cs229-notes1.pdf",
      platform: "Stanford",
      tags: ["machine learning", "ai", "statistics", "python"],
      averageRating: 4.9,
      no_of_reviews: 500
  },
  {
      id: "r5",
      title: "Database Management Systems",
      type: "video",
      category: "dbms",
      url: "https://www.coursera.org/learn/database-management",
      platform: "Coursera",
      tags: ["dbms", "database", "SQL", "postgresql"],
      averageRating: 4.5,
      no_of_reviews: 1800
  },
  {
      id: "r6",
      title: "Operating System Concepts",
      type: "pdf",
      category: "operatingSystem",
      url: "https://codex.cs.yale.edu/avi/os-book/OS9/slide-dir/",
      platform: "Yale University",
      tags: ["os", "linux", "windows", "system programming"],
      averageRating: 4.7,
      no_of_reviews: 1300
  },
  {
      id: "r7",
      title: "DevOps Roadmap",
      type: "blog",
      category: "devops",
      url: "https://roadmap.sh/devops",
      platform: "Roadmap.sh",
      tags: ["devops", "CI/CD", "docker", "kubernetes"],
      averageRating: 4.8,
      no_of_reviews: 900
  },
  {
      id: "r8",
      title: "Blockchain Fundamentals",
      type: "video",
      category: "blockchain",
      url: "https://www.udemy.com/course/blockchain-and-cryptocurrency/",
      platform: "Udemy",
      tags: ["blockchain", "cryptocurrency", "ethereum", "web3"],
      averageRating: 4.6,
      no_of_reviews: 750
  },
  {
      id: "r9",
      title: "Android Development Guide",
      type: "blog",
      category: "mobiledev",
      url: "https://developer.android.com/guide",
      platform: "Android Developer",
      tags: ["android", "mobile development", "kotlin", "java"],
      averageRating: 4.9,
      no_of_reviews: 1000
  },
  {
      id: "r10",
      title: "IoT Security and Challenges",
      type: "pdf",
      category: "IoT",
      url: "https://www.iotforall.com/iot-security-guide",
      platform: "IoT For All",
      tags: ["IoT", "security", "networking", "edge computing"],
      averageRating: 4.7,
      no_of_reviews: 620
  }
]
 
const columns = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <div className='flex gap-2 items-center'>
                    <div>
                        Id
                    </div>
                    <Button
                    className="inline"
                    variant="secondary"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                        <ArrowUpDown />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
            <div className='flex gap-2 items-center'>
                <div>
                    Title
                </div>
                <Button
                className="inline"
                variant="secondary"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    <ArrowUpDown />
                </Button>
            </div>
        )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            Delete Resource {row.getValue("id")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the following Resource
              and remove data from servers.<br/>
              Id: {row.getValue("id")}<br/>
              Title: {row.getValue("title")}<br/>
              Type: {resources.find(r => r.id == row.getValue("id"))?.type}<br/>
              Category: {resources.find(r => r.id == row.getValue("id"))?.category}<br/>
              Platform: {resources.find(r => r.id == row.getValue("id"))?.platform}<br/>
              URL: {resources.find(r => r.id == row.getValue("id"))?.url}<br/>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => delete_user(row)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
]

const delete_user = (row) => {
  console.log("deleting resource: ",row.original);
}


function AllItems() {

  const [open,setOpen] = React.useState(false);
  const [resource,setResource] = React.useState({
    title: '',
    platform: '',
    url: '',
    category: null,
    format: null,
  });

  const Categories = {
    frontend : "Frontend",
    backend : "Backend",
    fullstack : "Fullstack",
    machineLearning : "MachineLearning",
    ai : "AI",
    dsa : "DSA",
    algorithms : "Algorithms",
    dbms : "DBMS",
    operatingSystem : "OperatingSystem",
    networking : "Networking",
    devops : "Devops",
    blockchain : "Blockchain",
    mobiledev : "Mobiledev",
    IoT : "IoT",
  };

  const Formats = {
    video : "Video",
    blog : "Blog/Articles",
    pdf : "PDF/Documents",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);

    console.log(resource)
  }


  return (
    <div className='w-full p-10 text-black'>
        <h1 className='text-6xl mb-4'>Resources</h1>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
              <Button className="">Add Resource</Button>
          </DrawerTrigger>
          <DrawerContent>
              <DrawerHeader className="text-left">
              <DrawerTitle>Add a Resource</DrawerTitle>
              <DrawerDescription>
                  You can add any resource by giving proper information as required.
              </DrawerDescription>
              </DrawerHeader>

              <form className='flex flex-col gap-2 p-4' onSubmit={handleSubmit}>
                  <div>
                    <Label>Title</Label>
                    <Input required onChange={e => setResource(r => {return {...r,title: e.target.value}})} value={resource.title} className="border-2 border-gray-300" placeholder="Title of the resource..."></Input>
                  </div>

                  <div className='flex gap-2'>
                    <div className='flex-1'>
                      <Label>Format</Label>
                      <Select required onValueChange={value => setResource(r => {return {...r,format: value}})}>
                        <SelectTrigger className="border-2 border-gray-300">
                          <SelectValue placeholder="Select resource format..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Resource Formats</SelectLabel>
                            {Object.keys(Formats).map(k => {
                              return (
                                <SelectItem key={k} value={k}>{Formats[k]}</SelectItem>
                              )
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className='flex-1'>
                      <Label>Category</Label>
                      <Select required onValueChange={value => setResource(r => {return {...r,category: value}})}>
                        <SelectTrigger className="border-2 border-gray-300">
                          <SelectValue placeholder="Select resource category..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Resource Categories</SelectLabel>
                            {Object.keys(Categories).map(k => {
                              return (
                                <SelectItem onClick={e => setResource(r => {return {...r,category: k}})} key={k} value={k}>{Categories[k]}</SelectItem>
                              )
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>URL/Link</Label>
                    <Input required onChange={e => setResource(r => {return {...r,url: e.target.value}})} value={resource.url} className="border-2 border-gray-300" placeholder="Link of the resource..."></Input>
                  </div>
                 
                  <div>
                    <Label>Platoform</Label>
                    <Input required onChange={e => setResource(r => {return {...r,platform: e.target.value}})} value={resource.platform} className="border-2 border-gray-300" placeholder="Platform of the resource, eg: youtube, coursera, etc."></Input>
                  </div>

                  {/* <DrawerClose asChild> */}
                      <Button type="submit" className="mt-4">Submit</Button>
                  {/* </DrawerClose> */}
              </form>

              <DrawerFooter className="pt-2 pb-10">
              <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
              </DrawerClose>
              </DrawerFooter>
          </DrawerContent>
      </Drawer>
      <DataTable data={resources} columns={columns} filters={['id','title']}/>
    </div>
  )
}

export default AllItems