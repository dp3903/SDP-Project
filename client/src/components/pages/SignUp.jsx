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
        <h1 className='text-5xl w-full '>Sign Up</h1>
        <form className='mt-10 text-left w-full '>
            <Input placeholder="Enter username" type="text"></Input>

            <Input placeholder="Enter password" className="w-full  mt-2" type="password"></Input>

            <Input placeholder="Confirm password" className="w-full  mt-2" type="password"></Input>

            <Button className="w-full  mt-2">Submit</Button>
        </form>
        <div className='w-full  mt-2 px-3 py-2 rounded-md'>
            Already have an account?
            <a className='font-bold cursor-pointer' onClick={signInClick}> Signin</a>
        </div>
        <b>
          Or
        </b>
        <div className='w-full rounded-md'>
            <button className="w-full bg-black text-white rounded-md p-2 flex flex-row flex-nowrap justify-center gap-0">
              <div className="font-semibold h-[30px]">
                Sign in with Google
              </div>
              <div className="bg-google bg-contain bg-no-repeat h-[30px] w-[30px]"></div>
            </button>
        </div>
    </div>
  );
}