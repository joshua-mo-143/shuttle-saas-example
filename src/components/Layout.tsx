import Navbar from "./navbar"
import React from "react"
import Head from "next/head"

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

export default function Layout({children}: Props) {
  
  return (
    <div className="min-h-screen flex-col items-center">
      <Navbar/>
      {children}
  </div>
  )
}