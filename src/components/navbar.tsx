import React from "react"
import Link from 'next/link'
import {accountStore} from "@/zustandStore"
import {useRouter} from 'next/router'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {

  const {email, changeEmail} = accountStore();
  const [logoutVis, setLogoutVis] = React.useState<boolean>(false);
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
  <>
    { email == "" ?
  <nav className="absolute z-10 top-0 w-screen h-4 flex flex-row ">
      <ul className="m-5 flex gap-5 flex flex-row">
    
        <li><Link href="/">Home</Link></li>
        <li><Link href="/login">Log In</Link></li>
        <li><Link href="/register">Register</Link></li>

    </ul>
  </nav>
      : 
      <>
          <nav className="w-[15%] text-stone-100 min-h-screen flex flex-row items-top bg-blue-950">
      <ul className="m-5 flex gap-5 flex flex-col">
            <li>
              
          <h1 className="py-10">Logo</h1>
              </li>
                  <li>{email}</li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/customers">Customers</Link></li>
        <li><Link href="/dashboard/deals">Deals</Link></li>

        <li><Link href="/dashboard/upgrade">Upgrade</Link></li>
            <li><button onClick={handleLogout}>Log Out</button></li>
            </ul>
</nav>
      </>
}
   </> 
  )

}