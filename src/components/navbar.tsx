import React from "react"
import Link from 'next/link'

export default function Navbar() {

  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  return (
  <nav className="w-screen h-10 bg-sky-200/50 flex flex-row items-center">
      <ul className="m-5 flex gap-5 flex flex-row justify-end">
        {!loggedIn ?
      <>
        <li><Link href="/">Logo</Link></li>
        <li><Link href="#about">About</Link></li>
        <li><Link href="#pricing">Pricing</Link></li>
        <li><Link href="#contact">Contact</Link></li>
    </> : 
      <>
        <li><Link href="/dashboard/customers">Customers</Link></li>
        <li><Link href="/dashboard/deals">Deals</Link></li>
        <li><Link href="/upgrade">Upgrade</Link></li>

</>}
        <li>{loggedIn ? <Link href="/logout">Log Out</Link> : <Link href="/login">Log In</Link>}</li>
    </ul>
  </nav>
  )
}