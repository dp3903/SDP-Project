import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import AuthContext from './AuthContext'
const CLIENT_ID = '485441786516-encet8kq56q4dfrf823remojodgjhtj0.apps.googleusercontent.com'
 
export function SignUp(props) {

  const navigate = useNavigate();
  const { setUsername , setId , setToken } = useContext(AuthContext)


  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const handleFailure = (error) => {
    console.error("Login Error", error);
  };
 async function handleSuccess(response){
    try {
      console.log(response)
      const { credential } =response 
      const res = await fetch(import.meta.env.VITE_BACKEND+`/auth/callback?code=${credential}`)
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
  const signInClick = (e) => {
    e.preventDefault();
    props.signInClick(e)
  }

  const handleSubmit = async (event) => {
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

    
    try {
      const response = await fetch(import.meta.env.VITE_BACKEND+'/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username : username,
          password :  password,
        }),
      });
      const data = await response.json();
      
      console.log(response)
      // throw new Error({message: response, status: response.status});
      if(response.status != 404)
        throw new Error("Username already exists, please try again with a different username.")
      
    }
    catch (error) {
      console.log('Error:', error.message);
      toast.error("Error!!!", {
        description: (<h1 className='text-xl'>{error.message}</h1>),
        richColors: true,
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
         
            <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <div>
                    <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
                  </div>
                </GoogleOAuthProvider>
           
        </div>
    </div>
  );
}