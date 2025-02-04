'use client'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
  import { MdLogout } from "react-icons/md";
const ProfileCard = () => {
    const onLogout = () =>{
        localStorage.removeItem('token')
    }
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>alert('Profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>alert('Settings')}>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout} className="gap-3">Logout <MdLogout />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
    )
}

export default ProfileCard