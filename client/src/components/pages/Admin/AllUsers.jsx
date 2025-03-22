import React, { useContext, useEffect } from 'react'
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import DataTable from './DataTable'
import AuthContext from '../AuthContext'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
// const users = [
//     { id: 'i1', name: 'JohnDoe', email: 'johndoe@example.com' },
//     { id: 'i2', name: 'JaneSmith', email: 'janesmith@example.com' },
//     { id: 'i3', name: 'RobertBrown', email: 'robertbrown@example.com' },
//     { id: 'i4', name: 'EmilyClark', email: 'emilyclark@example.com' },
//     { id: 'i5', name: 'MichaelJohnson', email: 'michaeljohnson@example.com' },
//     { id: 'i6', name: 'SarahDavis', email: 'sarahdavis@example.com' },
//     { id: 'i7', name: 'DavidWilson', email: 'davidwilson@example.com' },
//     { id: 'i8', name: 'OliviaMartinez', email: 'oliviamartinez@example.com' },
//     { id: 'i9', name: 'JamesAnderson', email: 'jamesanderson@example.com' },
//     { id: 'i10', name: 'SophiaMiller', email: 'sophiamiller@example.com' },
//     { id: 'i11', name: 'DhruvPatel', email: 'dhruvpatel@example.com' },
// ]
 
const columns = [
    {
        accessorKey: "_id",
        header: ({ column }) => {
            return (
                <div className='flex gap-2 items-center'>
                    <div>
                        Id
                    </div>
                    <Button
                    className="inline"
                    variant="secondary"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                        <ArrowUpDown />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => <div className="capitalize">{row.getValue("_id")}</div>,
    },
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
            <div className='flex gap-2 items-center'>
                <div>
                    Username
                </div>
                <Button
                className="inline"
                variant="secondary"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    <ArrowUpDown />
                </Button>
            </div>
        )
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
        return (
            <div className='flex gap-2 items-center'>
                <div>
                    Email
                </div>
                <Button
                className="inline"
                variant="secondary"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    <ArrowUpDown />
                </Button>
            </div>
        )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            Delete Account {row.getValue("_id")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the following account
              and remove data from servers.<br/>
              Id: {row.getValue("_id")}<br/>
              Username: {row.getValue("name")}<br/>
              Email: {row.getValue("email")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => delete_user(row)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
]

const delete_user = (row) => {
  console.log("deleting user: ",row.original); 
  const deleteUser = async ( ) => { 
    try { 
      // delete user from server
      const response = await fetch('http://localhost:8000/api/admin/user/'+row.original._id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem("token"),
        },
      })
      if(response.ok)
      {
          let data = await response.json();
          console.log(data)
          // setusers(users.filter(user=>user._id!==row.original._id))
          // const navigate = useNavigate();
          // navigate("/Admin/users")
          window.location.href = "/Admin/users";
      }
    }
    catch (error) {
        console.error('Error:', error);
    }
  }
  deleteUser()
}


function AllUsers() {
  const [users,setusers]=React.useState([])
  const {token,id}= React.useContext(AuthContext)
  
  useEffect(()=>{
       const fetchUsers =  async ()=>{
          try {
              const response = await fetch('http://localhost:8000/api/admin/userList', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+token,
                },
              })
              if(response.ok)
              {
                  let data = await response.json();
                  setusers(data)
                  console.log(data)
              }
          } catch (error) {
              console.error('Error:', error);
          }
        }
        fetchUsers()
  },[])
  return (
    <div className='w-full p-10 text-black'>
        <h1 className='text-6xl'>Users</h1>
        <DataTable data={users} columns={columns} filters={['name','email']}/>
    </div>
  )
}

export default AllUsers