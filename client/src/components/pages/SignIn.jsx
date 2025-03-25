import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'
import { toast } from 'sonner'

 
export function SignIn(props) {

  const navigate = useNavigate();
  const { setUsername, setToken, setId } = useContext(AuthContext);

  function onSubmit(values) {
    console.log(values)
  }

  const signUpClick = (e) => {
    e.preventDefault();
    props.signUpClick(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    console.log(username, password)
    const authResponse = async () => {
      try {
        const response = await fetch('http://localhost:8000/auth/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username : username,
            password :  password,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          console.log(response)
          // throw new Error({message: response, status: response.status});
          if(response.status == 401)
            throw new Error("Invalid Credentials.")
          else
            throw new Error("User not found.")
        }
        else 
        {
          setUsername(data.username);
          setToken(data.access_token);
          setId(data.userId);
          console.log(data)
          if(data.username === "__admin__")
          {
            console.log("routing to admin panel")
            navigate("/Admin")

          }
          else {
            navigate("/home")
          }
       
        }
      }
      catch (error) {
        console.log('Error:', error.message);
        toast.error("Error!!!", {
          description: (<h1 className='text-xl'>{error.message}</h1>),
          richColors: true,
        })
        return;
      }
    
    }
    authResponse();
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <h1 className='text-5xl w-full '>Sign In</h1>
        <form className='w-full mt-10 text-left flex flex-col gap-2'>
            <Input placeholder="Enter username" type="text" id="username"></Input>

            <Input placeholder="Enter password" type="password" id="password"></Input>

            <Button onClick={handleSubmit} className="w-full  mt-2">Submit</Button>
        </form>
        <div className='w-full  mt-2 px-3 py-2 rounded-md'>
            Don't have an account?
            <a className=' font-bold cursor-pointer underline' onClick={signUpClick}> Signup</a>
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