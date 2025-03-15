import React, { useContext, useState, useEffect } from 'react'
import { Calendar, UserPen, Home as HomeIcon, LogOut, TrendingUp, Route } from "lucide-react"
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
} from "../../ui/sidebar"
import { Link, Outlet } from 'react-router-dom';
import { Button } from '../../ui/button';
import ResourceDetails from './ResourceDetails';
import AuthContext from '../AuthContext';


const items = [
    {
      title: "Home",
      url: "",
      icon: HomeIcon,
    },
    {
      title: "Profile",
      url: "profile",
      icon: UserPen,
    },
    {
      title: "Roadmaps",
      url: "roadmaps",
      icon: Route,
    },
    {
      title: "Trending",
      url: "treanding",
      icon: TrendingUp,
    },
];


function Home() {

    const navigate = useNavigate();
    const [active,setActive] = useState('Home');
    const { token } = useContext(AuthContext);

    const handleSignOut = (e) => {
        console.log("signing out.");
        navigate("/")
    }

    useEffect(() => {
        // if(token == '')
        //     console.log("due to no token....")
        //     navigate('/');
    },[]);

    const {
        setOpen,
    } = useSidebar();

  return (
        <>
            <Sidebar variant="floating" collapsible="icon" onClick={()=>setOpen(true)}>
                <SidebarContent>
                    <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
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

                {/* <ResourceDetails/> */}

            </main>
        </>
  )
}

export default Home