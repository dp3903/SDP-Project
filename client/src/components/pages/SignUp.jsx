import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

 
export function SignUp(props) {

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const signInClick = (e) => {
    e.preventDefault();
    props.signInClick(e)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <h1 className='w-full text-5xl w-full '>Sign Up</h1>
        <form className='w-full mt-10 text-left w-full '>
            <Input placeholder="Enter username" type="text"></Input>

            <Input placeholder="Enter password" className="w-full  mt-2" type="password"></Input>

            <Input placeholder="Confirm password" className="w-full  mt-2" type="password"></Input>

            <Button className="w-full  mt-2">Submit</Button>
        </form>
        <div className='w-full  mt-2 border-2 px-3 py-2 rounded-md'>
            Already have an account?
            <a className='text-blue-800 cursor-pointer' onClick={signInClick}>Signin</a>
        </div>
    </div>
  );
}