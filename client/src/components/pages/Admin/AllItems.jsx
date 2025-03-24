import React, { useEffect } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpDown, ChevronsUpDown } from "lucide-react"
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
import DataTable from "./DataTable"
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import AuthContext from "../AuthContext"
import { TagSelector } from "@/components/ui/TagSelector"

const Formats = {
  video: "Video",
  blog: "Blog/Articles",
  pdf: "PDF/Documents",
}


let resources_list = []


const delete_resource =async (row) => {
  // console.log("deleting resource: ", row.original)
  console.log("deleting resource: ",row.original); 
  const deleteResource = async ( ) => { 
    try { 
      // delete user from server
      const response = await fetch('http://localhost:8000/api/admin/resource/'+row.original._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem("token"),
        },
      })
      if(response.ok)
      {
          let data = await response.json();
          console.log(data)
          // setusers(users.filter(user=>user._id!==row.original._id))
          // const navigate = useNavigate();
          // navigate("/Admin/users")
          window.location.href = "/Admin/items";
      }
    }
    catch (error) {
        console.error('Error:', error);
    }
  }
  deleteResource()
}


function AllItems() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [tagsOpen, setTagsOpen] = React.useState(false)
  const [tags, setTags] = React.useState([])
  const [resources, setResources] = React.useState([])
  const {token} = React.useContext(AuthContext)
  const [resource, setResource] = React.useState({
    title: "",
    platform: "",
    url: "",
    keywords: null,
    format: null,
  })

  const columns = [
    {
      accessorKey: "_id",
      header: ({ column }) => {
        return (
          <div className="flex gap-2 items-center">
            <div>Id</div>
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
      cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <div className="flex gap-2 items-center">
            <div>Title</div>
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
            <Button variant="destructive">Delete Resource {row.getValue("_id")}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the following Resource and remove data from
                servers.
                <br />
                Id: {row.getValue("_id")}
                <br />
                Title: {row.getValue("title")}
                <br />
                Type: {resources.find(r => r._id == row.getValue("_id")).type}
                <br />
                Tags: {resources.find(r => r._id == row.getValue("_id")).tags}
                <br />
                Platform: {resources.find(r => r._id == row.getValue("_id")).platform}
                <br />
                URL: {resources.find(r => r._id == row.getValue("_id")).url}
                <br />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => delete_resource(row)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    let keys = Object.keys(resource);
    for(let i = 0 ; i < keys.length ; i++)
    {
      if(resource[keys[i]] == "" || resource[keys[i]] == null){
        toast.error("Error: ", {
          description: (
            <div className="text-lg">
              "{keys[i]} field cannot be empty!"
            </div>
          ),
          richColors: true,
        })
        return;
      }
    }

    setDrawerOpen(false)

    console.log(resource) 
    let request = {
      title : resource.title,
      type : resource.format,
      url : resource.url,
      platform : resource.platform,
      tags : resource.keywords,
      averageRating : 0,
      no_of_reviews : 0,
    }
    const respone = await fetch("http://localhost:8000/api/admin/resource/",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token,
      },
      body: JSON.stringify(request),
    })
    if(respone.ok)
    {
      toast.success("Resource added successfully!")
      setResource({
        title: "",
        platform: "",
        url: "",
        keywords: null,
        format: null,
      })
      const data = await respone.json()
      console.log(data)
    }
  }

  useEffect(()=>{
    const fetchResources = async () => { 
      try {
        const response = await fetch('http://localhost:8000/api/admin/resourceList', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,

          },
        })
        if(response.ok)
        {
            let data = await response.json();
            setResources(()=>data)
            console.log(resources)
            console.log(data)
        }
    } catch (error) {
        console.error('Error:', error);
    }
    }
    fetchResources()
  },[])

  return (
    <div className="w-full p-10 text-black">
      <h1 className="text-6xl mb-4">Resources</h1>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerTrigger asChild>
          <Button className="">Add Resource</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Add a Resource</DrawerTitle>
            <DrawerDescription>You can add any resource by giving proper information as required.</DrawerDescription>
          </DrawerHeader>

          <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit}>
            <div>
              <Label>Title</Label>
              <Input
                onChange={(e) =>
                  setResource((r) => {
                    return { ...r, title: e.target.value }
                  })
                }
                value={resource.title}
                className="border-2 border-gray-300"
                placeholder="Title of the resource..."
              ></Input>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Label>Format</Label>
                <Select
                  onValueChange={(value) =>
                    setResource((r) => {
                      return { ...r, format: value }
                    })
                  }
                >
                  <SelectTrigger className="border-2 border-gray-300">
                    <SelectValue placeholder="Select resource format..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Resource Formats</SelectLabel>
                      {Object.keys(Formats).map((k) => {
                        return (
                          <SelectItem key={k} value={k}>
                            {Formats[k]}
                          </SelectItem>
                        )
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Label>Keywords</Label>
                <TagSelector
                  onChange={(newTags) => {
                    // console.log("Tags changed:", newTags) // Add this for debugging
                    setTags(newTags)
                    setResource((r) => ({ ...r, keywords: newTags.length > 0 ? newTags : null }))
                  }}
                  selectedTags={tags}
                  
                />
              </div>
            </div>

            <div>
              <Label>URL/Link</Label>
              <Input
                onChange={(e) =>
                  setResource((r) => {
                    return { ...r, url: e.target.value }
                  })
                }
                value={resource.url}
                className="border-2 border-gray-300"
                placeholder="Link of the resource..."
              ></Input>
            </div>

            <div>
              <Label>Platoform</Label>
              <Input
                onChange={(e) =>
                  setResource((r) => {
                    return { ...r, platform: e.target.value }
                  })
                }
                value={resource.platform}
                className="border-2 border-gray-300"
                placeholder="Platform of the resource, eg: youtube, coursera, etc."
              ></Input>
            </div>

            {/* <DrawerClose asChild> */}
            <Button type="submit" className="mt-4">
              Submit
            </Button>
            {/* </DrawerClose> */}
          </form>

          <DrawerFooter className="pt-2 pb-10">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <DataTable data={resources} columns={columns} filters={["_id", "title"]} />
    </div>
  )
}

export default AllItems 
