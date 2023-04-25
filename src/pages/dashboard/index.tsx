import Layout from "../../components/Layout"
import React from "react"
import {useRouter} from 'next/router'
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPerson, faHandshake} from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-8 pt-10 justify-center items-center">
          <h1 className="text-2xl">Dashboard</h1>
          <Link href="/dashboard/customers" className="flex flex-row gap-4 text-xl rounded-md bg-sky-200/50 hover:bg-sky-100/50 transition-all px-10 py-4 items-center justify-center">
            <p> Customers </p>

            <FontAwesomeIcon icon={faPerson}/>
            </Link>
          <Link href="/dashboard/Deals" className="flex flex-row gap-4 text-xl rounded-md bg-sky-200/50 hover:bg-sky-100/50 transition-all px-10 py-4 items-center justify-center">
            
            <p>Deals</p>
            <FontAwesomeIcon icon={faHandshake}/>
            </Link>
        </div>
    </Layout>
  </>
  )
}


