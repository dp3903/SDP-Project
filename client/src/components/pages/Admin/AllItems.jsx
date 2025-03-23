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



const keywords = {
  AMETHYST : "AMETHYST",
  SWIFTUI : "SWIFTUI",
  OPENMP : "OPENMP",
  UI_UX : "UI_UX",
  KTOR : "KTOR",
  ML_NET : "ML_NET",
  NOSQL : "NOSQL",
  IOT : "IOT",
  AI : "AI",
  ANGULAR : "ANGULAR",
  GAME_DEVELOPMENT : "GAME_DEVELOPMENT",
  BACKEND : "BACKEND",
  UNITY : "UNITY",
  ROCKET : "ROCKET",
  SQLITE : "SQLITE",
  NUXT_JS : "NUXT_JS",
  JAKARTA_EE : "JAKARTA_EE",
  MACHINE_LEARNING : "MACHINE_LEARNING",
  APACHE_HADOOP : "APACHE_HADOOP",
  COCOS2D_X : "COCOS2D_X",
  FLASK : "FLASK",
  UNREAL_ENGINE : "UNREAL_ENGINE",
  WINFORMS : "WINFORMS",
  MONGODB : "MONGODB",
  SPRING_BOOT : "SPRING_BOOT",
  GO : "GO",
  CLOUD_MICROSERVICES : "CLOUD_MICROSERVICES",
  OPERATING_SYSTEM : "OPERATING_SYSTEM",
  DEVOPS : "DEVOPS",
  DATA_SCIENCE : "DATA_SCIENCE",
  BLOCKCHAIN : "BLOCKCHAIN",
  SCENEKIT : "SCENEKIT",
  CLOUD_COMPUTING : "CLOUD_COMPUTING",
  PYGAME : "PYGAME",
  PYTORCH : "PYTORCH",
  ALGORITHMS : "ALGORITHMS",
  CPP : "CPP",
  MYSQL : "MYSQL",
  KIVY : "KIVY",
  GIN : "GIN",
  EXPRESS_JS : "EXPRESS_JS",
  WXWIDGETS : "WXWIDGETS",
  DJANGO : "DJANGO",
  VAPOR : "VAPOR",
  POSTGRESQL : "POSTGRESQL",
  CYBERSECURITY : "CYBERSECURITY",
  SFML : "SFML",
  DESKTOP_APPLICATIONS : "DESKTOP_APPLICATIONS",
  MLPACK : "MLPACK",
  FASTAPI : "FASTAPI",
  COBRA : "COBRA",
  BEVY : "BEVY",
  CUDA : "CUDA",
  FRONTEND : "FRONTEND",
  SEABORN : "SEABORN",
  SVELTE : "SVELTE",
  PYTHON : "PYTHON",
  TENSORFLOW_CPP : "TENSORFLOW_CPP",
  GRPC : "GRPC",
  NUMPY : "NUMPY",
  THREE_JS : "THREE_JS",
  JETPACK_COMPOSE : "JETPACK_COMPOSE",
  FULL_STACK : "FULL_STACK",
  JMONKEYENGINE : "JMONKEYENGINE",
  NATURAL_LANGUAGE_PROCESSING : "NATURAL_LANGUAGE_PROCESSING",
  DATA_STRUCTURES : "DATA_STRUCTURES",
  SPRITEKIT : "SPRITEKIT",
  FIREBASE : "FIREBASE",
  SQL : "SQL",
  MOBILE_DEVELOPMENT : "MOBILE_DEVELOPMENT",
  CLI_DEVELOPMENT : "CLI_DEVELOPMENT",
  GUI_DEVELOPMENT : "GUI_DEVELOPMENT",
  LIBGDX : "LIBGDX",
  ACTIX : "ACTIX",
  PANDAS : "PANDAS",
  KUBERNETES : "KUBERNETES",
  ECHO : "ECHO",
  WEB_DEVELOPMENT : "WEB_DEVELOPMENT",
  EMBEDDED_SYSTEMS : "EMBEDDED_SYSTEMS",
  CSHARP : "CSHARP",
  JAVASCRIPT : "JAVASCRIPT",
  QT : "QT",
  APACHE_SPARK : "APACHE_SPARK",
  MATPLOTLIB : "MATPLOTLIB",
  REACT : "REACT",
  PHASER_JS : "PHASER_JS",
  WPF : "WPF",
  UIKIT : "UIKIT",
  HIGH_PERFORMANCE_COMPUTING : "HIGH_PERFORMANCE_COMPUTING",
  NESTJS : "NESTJS",
  REDIS : "REDIS",
  BIG_DATA : "BIG_DATA",
  SWIFT : "SWIFT",
  DATABASES : "DATABASES",
  IOS_DEVELOPMENT : "IOS_DEVELOPMENT",
  MACHINE_LEARNING_2 : "MACHINE_LEARNING_2",
  VUE_JS : "VUE_JS",
  RUST : "RUST",
  KOTLIN : "KOTLIN",
  COMPUTER_VISION : "COMPUTER_VISION",
  KOA : "KOA",
  PYGLET : "PYGLET",
  JAVA : "JAVA",
  NEXT_JS : "NEXT_JS",
  SPRING_BOOT_KOTLIN : "SPRING_BOOT_KOTLIN",
  ASP_NET_CORE : "ASP_NET_CORE",
  TENSORFLOW : "TENSORFLOW",
  FIBER : "FIBER",
  NETWORK : "NETWORK",
  ANDROID_SDK : "ANDROID_SDK",
  SCIKIT_LEARN : "SCIKIT_LEARN",
}

const Formats = {
  video: "Video",
  blog: "Blog/Articles",
  pdf: "PDF/Documents",
}

// const resources = [
//   {
//     id: "r1",
//     title: "React for Beginners",
//     type: "video",
//     category: "frontend",
//     url: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
//     platform: "YouTube",
//     tags: ["react", "frontend", "javascript", "web development"],
//     averageRating: 4.8,
//     no_of_reviews: 1200,
//   },
//   {
//     id: "r2",
//     title: "Node.js Crash Course",
//     type: "video",
//     category: "backend",
//     url: "https://www.youtube.com/watch?v=fBNz5xF-Kx4",
//     platform: "YouTube",
//     tags: ["nodejs", "backend", "javascript", "express"],
//     averageRating: 4.7,
//     no_of_reviews: 950,
//   },
//   {
//     id: "r3",
//     title: "Data Structures and Algorithms Explained",
//     type: "blog",
//     category: "dsa",
//     url: "https://www.geeksforgeeks.org/data-structures/",
//     platform: "GeeksforGeeks",
//     tags: ["dsa", "algorithms", "programming", "computer science"],
//     averageRating: 4.6,
//     no_of_reviews: 2200,
//   },
//   {
//     id: "r4",
//     title: "Machine Learning Course",
//     type: "pdf",
//     category: "machineLearning",
//     url: "https://cs229.stanford.edu/notes2021fall/cs229-notes1.pdf",
//     platform: "Stanford",
//     tags: ["machine learning", "ai", "statistics", "python"],
//     averageRating: 4.9,
//     no_of_reviews: 500,
//   },
//   {
//     id: "r5",
//     title: "Database Management Systems",
//     type: "video",
//     category: "dbms",
//     url: "https://www.coursera.org/learn/database-management",
//     platform: "Coursera",
//     tags: ["dbms", "database", "SQL", "postgresql"],
//     averageRating: 4.5,
//     no_of_reviews: 1800,
//   },
//   {
//     id: "r6",
//     title: "Operating System Concepts",
//     type: "pdf",
//     category: "operatingSystem",
//     url: "https://codex.cs.yale.edu/avi/os-book/OS9/slide-dir/",
//     platform: "Yale University",
//     tags: ["os", "linux", "windows", "system programming"],
//     averageRating: 4.7,
//     no_of_reviews: 1300,
//   },
//   {
//     id: "r7",
//     title: "DevOps Roadmap",
//     type: "blog",
//     category: "devops",
//     url: "https://roadmap.sh/devops",
//     platform: "Roadmap.sh",
//     tags: ["devops", "CI/CD", "docker", "kubernetes"],
//     averageRating: 4.8,
//     no_of_reviews: 900,
//   },
//   {
//     id: "r8",
//     title: "Blockchain Fundamentals",
//     type: "video",
//     category: "blockchain",
//     url: "https://www.udemy.com/course/blockchain-and-cryptocurrency/",
//     platform: "Udemy",
//     tags: ["blockchain", "cryptocurrency", "ethereum", "web3"],
//     averageRating: 4.6,
//     no_of_reviews: 750,
//   },
//   {
//     id: "r9",
//     title: "Android Development Guide",
//     type: "blog",
//     category: "mobiledev",
//     url: "https://developer.android.com/guide",
//     platform: "Android Developer",
//     tags: ["android", "mobile development", "kotlin", "java"],
//     averageRating: 4.9,
//     no_of_reviews: 1000,
//   },
//   {
//     id: "r10",
//     title: "IoT Security and Challenges",
//     type: "pdf",
//     category: "IoT",
//     url: "https://www.iotforall.com/iot-security-guide",
//     platform: "IoT For All",
//     tags: ["IoT", "security", "networking", "edge computing"],
//     averageRating: 4.7,
//     no_of_reviews: 620,
//   },
// ]
let resources_list = []

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
              Type: {row.getValue("type")}
              <br />
              Tags: {row.getValue("tags")}
              <br />
              Platform: {row.getValue("platform")}
              <br />
              URL: {row.getValue("url")}
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

const delete_resource =async (row) => {
  // console.log("deleting resource: ", row.original)
  console.log("deleting user: ",row.original); 
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

function TagSelector({
  tags = Object.keys(keywords),
  selectedTags = [],
  onChange,
  placeholder = "Type to filter tags...",
  className,
  disabled = false,
}) {
  const [inputValue, setInputValue] = React.useState("")
  const [selected, setSelected] = React.useState(selectedTags)

  const handleUnselect = (tag) => {
    const newSelected = selected.filter((s) => s !== tag)
    setSelected(newSelected)
    onChange?.(newSelected)
  }

  const handleSelect = (tag) => {
    if (selected.includes(tag)) return
    const newSelected = [...selected, tag]
    setSelected(newSelected)
    onChange?.(newSelected)
    setInputValue("")
  }

  const filteredTags = tags.filter((tag) => tag.toLowerCase().includes(inputValue.toLowerCase()))

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-1 mb-2 rounded-md p-2 border-2 border-gray-300">
        {selected.length > 0 ? (
          selected.map((tag) => (
            <Badge key={tag} variant="secondary" className="mr-1 mb-1">
              {keywords[tag]}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (!disabled) handleUnselect(tag)
                }}
                disabled={disabled}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))
        ) : (
          <span className="text-muted-foreground text-sm">No tags selected</span>
        )}
      </div>

      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabled}
        className="border-2 border-gray-300"
      />

      <ScrollArea className="h-[120px] rounded-md border-2 border-gray-300">
        <div className="p-2">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
              <Button
                key={tag}
                variant="ghost"
                size="sm"
                className={cn("justify-start w-full text-left mb-1", selected.includes(tag) && "bg-muted")}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleSelect(tag)
                }}
                disabled={disabled}
              >
                {keywords[tag]}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground p-2">No tags found</p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
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
