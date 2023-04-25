import Layout from "@/components/Layout"
import React from "react"
import {useRouter} from 'next/router'

export default function PaymentSuccess() {

  return (
    <>
      <Layout>
        <h1 className="text-2xl">Payment has failed :(</h1>
    </Layout>
  </>
  )
}


