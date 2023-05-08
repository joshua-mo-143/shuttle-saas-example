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
  <nav className="absolute top-0 w-screen h-4 flex flex-row ">
      <ul className="m-5 flex gap-5 flex flex-row">
    { email == "" ?
      <>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/login">Log In</Link></li>
        <li><Link href="/register">Register</Link></li>
      </> : 
      <>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/customers">Customers</Link></li>
        <li><Link href="/dashboard/deals">Deals</Link></li>

        <li><Link href="/dashboard/upgrade">Upgrade</Link></li>
                  <li>
            <div onMouseEnter={() => setLogoutVis(true)} className="" onMouseLeave={() => setLogoutVis(false)}>
          
              <div className="flex flex-row gap-2 items-center">
                <span>{email}</span>
                 {logoutVis ? <FontAwesomeIcon icon={faChevronUp} className="text-xs"/> : <FontAwesomeIcon icon={faChevronDown} className="text-xs"/>}
                </div>
              <button className={logoutVis ? "text-right w-4/5" : "w-full text-center invisible"}onClick={handleLogout}>Log Out</button>
              </div>
            </li>

      </>}
    </ul>
  </nav>
  )
}