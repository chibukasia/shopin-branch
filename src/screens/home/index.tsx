"use client"
import { authRedirect } from "@/utils/auth"
import axiosClient from "@/utils/axios-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Home = () => {
    const router = useRouter()

    useEffect(() =>{
        axiosClient.get('/login/me').then(() => {}).catch((error) => {
          authRedirect(router, error)
        })
      },[router])
    return(
        <div>
            <p>Home</p>
        </div>
    )
}

export default Home