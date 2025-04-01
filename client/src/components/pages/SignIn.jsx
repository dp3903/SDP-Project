import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'
import { toast } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
const CLIENT_ID = '485441786516-encet8kq56q4dfrf823remojodgjhtj0.apps.googleusercontent.com'
 
export function SignIn(props) {

  const navigate = useNavigate();
  const { setUsername, setToken, setId} = useContext(AuthContext);

  function onSubmit(values) {
    console.log(values)
  }

  const signUpClick = (e) => {
    e.preventDefault();
    props.signUpClick(e)
  }
  const handleFailure = (error) => {
    console.error("Login Error", error);
  };
 async function handleSuccess(response){
    try {
      console.log(response)
      const { credential } =response 
      const res = await fetch(`http://localhost:8000/auth/callback?code=${credential}`)
      const data = await res.json()
      console.log("User Info : ",data)
      if (data.isNew == false) {
        setUsername(data.username);
        setToken(data.access_token);
        setId(data.userId);
        navigate("/home")
      }
      else {
        setUsername(data.username);
        setToken(data.access_token);
        setId(data.userId);
        console.log(data.username)
        console.log(data.email)
        navigate('/userReview',{
          state : { 
          username: data.username, 
          email: data.email, 
          password:"",
          isGoogleUser:true}
        })
      }
    }
    catch (error) {
      console.log("Error : ", error)
    }
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
           
        <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <div>
                    <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
                  </div>
                </GoogleOAuthProvider>
        </div>
    </div>
  );
}