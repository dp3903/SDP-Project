import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


 
export function SignUp(props) {

  const navigate = useNavigate();



  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const signInClick = (e) => {
    e.preventDefault();
    props.signInClick(e)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    console.log(event.target[2].value)
    console.log(event.target[3].value)

    let username = event.target[0].value;
    let email = event.target[1].value;
    let password = event.target[2].value;
    if(password != event.target[3].value){
      toast("Error!!! Password does not match confirm passoword", {
        description: "Please make sure password matches confirm password.",
      })
      return;
    }

    // validate
    // let response = { username:use, token:'abcd', email:'abc@123.com' }
    // setUsername(response.username);
    // setToken(response.token);
    // setEmail(response.email);

    navigate('/userReview',{state : { username: username, email: email, password: password }})
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <h1 className='text-5xl w-full '>Sign Up</h1>
        <form className='mt-10 text-left w-full flex flex-col gap-2' onSubmit={handleSubmit}>
            <Input placeholder="Enter username" type="text"></Input>

            <Input placeholder="Enter email" type="email"></Input>

            <Input placeholder="Enter password" type="password"></Input>

            <Input placeholder="Confirm password" type="password"></Input>

            <Button className="w-full  mt-2">Submit</Button>
        </form>
        <div className='w-full  mt-2 px-3 py-2 rounded-md'>
            Already have an account?
            <a className='font-bold cursor-pointer underline' onClick={signInClick}> Signin</a>
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