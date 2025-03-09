import { Button } from '@/components/ui/button'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



function EditProfile() {
    return (
      <Dialog>
        <DialogTrigger asChild>
            <Button className="mt-2">
                Edit information
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='text-2xl'>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done. Click anywhere outside to exit.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            
            <div>
              <Label htmlFor="username" className="text-right text-nowrap">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="John Doe"
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-right text-nowrap">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="John_Doe@gmail.com"
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="oldPassword" className="text-right text-nowrap">
                Old Password
              </Label>
              <Input
                id="oldPassword"
                type="password"
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-right text-nowrap">
                New Password
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-right text-nowrap">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className="col-span-3"
              />
            </div>
  
          </div>
          <DialogFooter className="sm:justify-between">
  
            <Button type="submit">
              Save changes
            </Button>
  
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}


function AdminHome() {
  return (
    <div className='w-full'>
        <div className='flex flex-col justify-start items-center mt-8 gap-8'>
            <h1 className='font-display text-6xl'>You are an Admin</h1>
            
            <div className='flex flex-col justify-start items-center font-bold'>
                <span>
                    Username: admin
                </span>
                <span>
                    Email: mail@123.com
                </span>
                <EditProfile/>
            </div>
            
            <h1 className='font-display text-2xl'>The following points must be read to know your admin previleges.</h1>
            <ul className='list-decimal text-md max-w-xl font-bold list-inside flex flex-col gap-4'>
                <li>
                    Admin users are super users that can perform some actions that normal users cannot.
                </li>
                <li>
                    The admin will have rights to add any item/resource but be careful as you cannot update an item.
                </li>
                <li>
                    The admin cannot update any personal information for any other user then themselves but they can completely delete their account.
                </li>
                <li>
                    To add items, go to the 'Items' page on the sidebar and add item.
                </li>
                <li>
                    To delete any user, go to 'Users' page using the sidebar and delete the user.
                </li>
                <li>
                    You can update any personal information by clicking on the 'Edit information' Button Above.
                </li>
            </ul>
        </div>
    </div>
  )
}

export default AdminHome