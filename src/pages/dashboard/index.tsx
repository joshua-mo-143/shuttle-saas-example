import Layout from "../../components/Layout"
import React from "react"
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Dashboard() {

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Link href="/dashboard/customers">Customers</Link>
          <Link href="/dashboard/Deals">Deals</Link>
        </div>
    </Layout>
  </>
  )
}


