import React from "react"
import Link from 'next/link'
import {accountStore} from "@/zustandStore"
import {useRouter} from 'next/router'

export default function Navbar() {

  const {email, changeEmail} = accountStore();
  const router = useRouter()

  const handleLogout = async () => {

    const url = `//${window.location.host}/api/auth/logout`;
    
    const res = await fetch(url);

    if (res.ok) {
    changeEmail("");
    router.push("/");
    }
  }

  return (
  <nav className="absolute w-screen h-10 flex flex-row items-center">
      <ul className="m-5 flex gap-5 flex flex-row justify-end">
    { email == "" ?
      <>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/login">Log In</Link></li>
        <li><Link href="/register">Register</Link></li>
      </> : 
      <>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/upgrade">Upgrade</Link></li>
                  <li>Welcome back, {email}!</li>

        <li><button onClick={handleLogout}>Log Out</button></li>
      </>}
    </ul>
  </nav>
  )
}