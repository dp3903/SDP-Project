import React, { useState } from 'react'
import { Boxes, Users, Home as HomeIcon, LogOut } from "lucide-react"
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
} from "@/components/ui/sidebar"
import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const items = [
    {
      title: "Personal",
      url: "",
      icon: HomeIcon,
    },
    {
      title: "Users",
      url: "users",
      icon: Users,
    },
    {
      title: "Items",
      url: "items",
      icon: Boxes,
    },
];


function AdminNavigator() {

    const navigate = useNavigate();
    const [active,setActive] = useState('Personal');

    const handleSignOut = (e) => {
        console.log("signing out.");
        navigate("/")
    }

    const {
        setOpen,
    } = useSidebar();

  return (
        <>
            <Sidebar variant="floating" collapsible="icon" onClick={()=>setOpen(true)}>
                <SidebarContent>
                    <SidebarGroup>
                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild isActive={item.title==active} onClick={(e)=>setActive(item.title)}>
                                    <Link to={item.url}>
                                        
                                        <item.icon />
                                        <span className='text-md text-black font-semibold'>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
                            </SidebarMenuItem>
                        ))}

                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <button onClick={handleSignOut}>
                                        <LogOut />
                                        <span className='text-md text-black font-semibold'>Sign-out</span>
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

                <Outlet className="" />

            </main>
        </>
  )
}

export default AdminNavigator