import React from "react"
import Link from 'next/link'
import {accountStore} from "@/zustandStore"

export default function Navbar() {

  const {email} = accountStore();

  return (
  <nav className="w-screen h-10 bg-stone-400/50 flex flex-row items-center">
      <ul className="m-5 flex gap-5 flex flex-row justify-end">
    { email == "" ?
      <>
        <li><Link href="/">Logo</Link></li>
        <li><Link href="/login">Log In</Link></li>
        <li><Link href="/register">Register</Link></li>
      </> : 
      <>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/customers">Customers</Link></li>
        <li><Link href="/dashboard/deals">Deals</Link></li>
        <li><Link href="/dashboard/upgrade">Upgrade</Link></li>
                  <li>Welcome back, {email}!</li>

        <li><Link href="/logout">Log Out</Link></li>
      </>}
    </ul>
  </nav>
  )
}