import React from 'react'
import { useState } from 'react';
import BlurFade from '../ui/blur-fade'
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { Form , FormField , FormItem , FormLabel , FormControl , FormDescription , FormMessage } from '../ui/form';

function UserReview() {

    const form = useForm({
        defaultValues: {
            experience: '',
            field: '',
        },
    });

    const levels = ['Beginner','Intermediate','Advance'];
    const fields = ['Frontend Development','Backend Development','Fullstack Development','Datastructures','Algorithms','Database','Networking']

    function onSubmit(data) {
        if(data.experience == ''){
            form.setError("experience", { type: "focus", message:"Please select experience" }, { shouldFocus: true });
            return;
        }
        if(data.field == ''){
            form.setError("field", { type: "focus", message:"Please select a field" }, { shouldFocus: true });
            return;
        }
        console.log(data);
    }


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
            <div className="container mt-10 mb-10 mx-auto max-w-md p-4 rounded-lg shadow-md bg-white">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Find Your Resources</h1>
                
                <Form {...form}>

                    <form  onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">
                    
                        <FormField
                            required
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select your skill Level</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {levels.map((item)=>{
                                                return <SelectItem key={item} value={item}>{item}</SelectItem>
                                            })}
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
                            name="field"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select the field you are interested in</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a field" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {fields.map((item)=>{
                                                return <SelectItem key={item} value={item}>{item}</SelectItem>
                                            })}
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                                </FormItem>
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
