import React from 'react'
import { Calendar, UserPen, Home as HomeIcon, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom";
 
import {
    SidebarProvider,
    SidebarTrigger,
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuAction,
    SidebarFooter,
    useSidebar,
} from "../ui/sidebar"
import { Link, Outlet } from 'react-router-dom';
import { Button } from '../ui/button';


const items = [
    {
      title: "Home",
      url: "/home",
      icon: HomeIcon,
    },
    {
      title: "Profile",
      url: "home/profile",
      icon: UserPen,
    },
    {
      title: "Roadmaps",
      url: "home/roadmaps",
      icon: Calendar,
    },
];


function Home() {

    const navigate = useNavigate();

    const handleSignOut = (e) => {
        console.log("signing out.");
        navigate("/")
    }

    const {
        setOpen,
    } = useSidebar();

  return (
        <>
            <Sidebar variant="sidebar" collapsible="icon" onClick={()=>setOpen(true)}>
                <SidebarContent>
                    <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link to={item.url}>
                                        
                                        <item.icon />
                                        <span className='text-md'>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                            </SidebarMenuItem>
                        ))}

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button onClick={handleSignOut}>
                                        <LogOut />
                                        <span className='text-md'>Sign-out</span>
                                    </button>
                                </SidebarMenuButton>
                                <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                            </SidebarMenuItem>
                        
                        </SidebarMenu>
                    </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>

            <main onClick={()=>setOpen(false)} className='w-full'>
                <Outlet/>
            </main>
        </>
  )
}

export default Home