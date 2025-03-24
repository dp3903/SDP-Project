import React, { useEffect } from 'react'
import { useState } from 'react';
import BlurFade from '../../ui/blur-fade'
import { Button } from '../../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../../ui/select';
import { Input } from '../../ui/input';
import { useForm } from 'react-hook-form';
import { Form , FormField , FormItem , FormLabel , FormControl , FormDescription , FormMessage } from '../../ui/form';
import { useLocation, useNavigate } from 'react-router-dom';
import { date } from 'zod';
import AuthContext from '../AuthContext'
import { useContext } from "react"
import { TagSelector } from '@/components/ui/TagSelector';

function UserReview() {
    const { setUsername, setToken, setEmail , setId , token , id} = useContext(AuthContext);
    const location = useLocation();
    const { username , email , password} = location.state || {}
    const navigate = useNavigate();
    const [dummy,setDummy] = useState();

    const form = useForm({
        defaultValues: {
            experience: 'beginner',
            fields: [],
            platforms: ['video','blog','pdf'],
        },
    });

    const levels = {
        beginner : "Beginner",
        intermediate : "Intermediate",
        advanced : "Advanced",
    };
    const platforms = {
        video : "Videos",
        blog : "Blogs",
        pdf : "Documents",
    };
    

    function onSubmit(data) {
        if(data.experience == ''){
            form.setError("experience", { type: "focus", message:"Please select experience" }, { shouldFocus: true });
            return;
        }
        if(data.fields.length == 0){
            form.setError("fields", { type: "focus", message:"Please select a field" }, { shouldFocus: true });
            return;
        }
        if(data.platforms.length == 0){
            form.setError("platforms", { type: "focus", message:"Please select a platform" }, { shouldFocus: true });
            return;
        }
        console.log(data);
        console.log(username,email,password)
        // post request to backend api 
        const postdata = async ( ) => {
            data = {
                name : username,
                email : email,
                password :  password,
                prefrences : {
                    skillLevel : data.experience,
                    preferredFormat : data.platforms,
                    interests : data.fields,
                },
                joinedat: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
            
            }
            console.log(data)
            try {
                const response = await fetch("http://localhost:8000/auth/signup/",{
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        data
                    )
                })
                if (!response.ok)
                {
                    console.log(response)
                    throw new Error(`HTTP error! status: ${response.status}`);
                    
                }
                else 
                {
                    console.log("success creating user")
                    const data = await response.json();
                    console.log(data)
                    setUsername(username);
                    setToken(data.access_token);
                    console.log(token)
                    setEmail(email);   
                    setId(data.userId);
                    
                    navigate("/home")
                }
            }
            catch (error) {
                console.error('Error:', error);
                console.log(error)
            }
        }
        postdata();
        
       
    }

    const toggleOption = (option,field) => {
        let arr = form.getValues(field);
        if(arr.includes(option)){
            form.setValue(field,arr.filter(item => item != option));
        }
        else{
            form.setValue(field,[...arr , option]);
        }
        setDummy(!dummy);
    };


  return (
    <div className='pt-20 px-10 max-w-4xl min-h-[100vh] bg-blue-200 flex flex-col flex-nowrap'>
        <BlurFade delay={0.25} inView>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Hey There 👋
            </h2>
        </BlurFade>
        <BlurFade delay={0.25 * 2} inView>
            <h2 className="mt-5 text-lg text-pretty tracking-tighter sm:text-3xl xl:text-2xl/none">
                We would like to ask you some questions to generate the best recommendations for your needs.
            </h2>
        </BlurFade>
        
        <BlurFade delay={0.25 * 3} inView>
            <div className="container mt-10 mb-10 mx-auto max-w-lg p-4 rounded-lg shadow-md bg-white">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Find Your Resources</h1>
                
                <Form {...form}>

                    <form  onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">
                    
                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-semibold text-gray-800 mb-4">Select your skill Level</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.keys(levels).map(item => 
                                                <SelectItem key={item} value={item} > {levels[item]} </SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        You can select Beginner if you are new
                                    </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="platforms"
                            render={({ field }) => (
                                <div className="container mx-auto max-w-lg p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Select Your preferred resource platforms.
                                    </h2>
                                    <FormDescription className="mb-4">
                                        You must select at least 1 platform that you like to learn from.
                                    </FormDescription>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {Object.keys(platforms).map((option) => (
                                        <div
                                            key={option}
                                            onClick={() => toggleOption(option,'platforms')}
                                            className={`cursor-pointer min-w-fit p-4 rounded-lg border ${
                                            form.getValues('platforms').includes(option)
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-gray-100 hover:bg-blue-200 text-gray-800 border-gray-300"
                                            } hover:shadow-lg transition`}
                                        >
                                            {platforms[option]}
                                        </div>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </div>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="fields"
                            render={({ field }) => (
                                <div className="container mx-auto max-w-lg p-4">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Select Your Interests
                                    </h2>
                                    <FormDescription className="mb-4">
                                        You can select any subjects you wish to get recommendations on.
                                    </FormDescription>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <TagSelector 
                                            onChange={(newtags)=>{
                                                form.setValue("fields", newtags)
                                            }}
                                        />
                                    </div>
                                    <FormMessage />
                                </div>
                            )}
                        />
                        
                        

                        <Button type="submit" className="w-full text-white">
                            Get Recommendations
                        </Button>
                    </form>
                </Form>
            </div>
        </BlurFade>
    </div>
  )
}

export default UserReview