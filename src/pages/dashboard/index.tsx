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
          <h1 className="text-xl lg:text-3xl">Dashboard</h1>
          <p>You are logged in! </p>
                  </div>
    </Layout>
  </>
  )
}


