import React from 'react'
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

 
const users = [
    { id: 'i1', username: 'JohnDoe', email: 'johndoe@example.com' },
    { id: 'i2', username: 'JaneSmith', email: 'janesmith@example.com' },
    { id: 'i3', username: 'RobertBrown', email: 'robertbrown@example.com' },
    { id: 'i4', username: 'EmilyClark', email: 'emilyclark@example.com' },
    { id: 'i5', username: 'MichaelJohnson', email: 'michaeljohnson@example.com' },
    { id: 'i6', username: 'SarahDavis', email: 'sarahdavis@example.com' },
    { id: 'i7', username: 'DavidWilson', email: 'davidwilson@example.com' },
    { id: 'i8', username: 'OliviaMartinez', email: 'oliviamartinez@example.com' },
    { id: 'i9', username: 'JamesAnderson', email: 'jamesanderson@example.com' },
    { id: 'i10', username: 'SophiaMiller', email: 'sophiamiller@example.com' },
    { id: 'i11', username: 'DhruvPatel', email: 'dhruvpatel@example.com' },
]
 
const columns = [
    {
        accessorKey: "id",
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
        cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
  {
    accessorKey: "username",
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("username")}</div>,
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
            Delete Account {row.getValue("id")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the following account
              and remove data from servers.<br/>
              Id: {row.getValue("id")}<br/>
              Username: {row.getValue("username")}<br/>
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
}


function AllUsers() {
  return (
    <div className='w-full p-10 text-black'>
        <h1 className='text-6xl'>Users</h1>
        <DataTable data={users} columns={columns} filters={['username','email']}/>
    </div>
  )
}

export default AllUsers