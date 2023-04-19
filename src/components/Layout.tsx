import Navbar from "./navbar"
import React from "react"
import Head from "next/head"
type Props = {
  children: React.ReactNode | React.ReactNode[]
}

export default function Layout({children}: Props) {
  
  return (
    <main className="min-h-screen flex-col items-center bg-stone-200">
    <Navbar/>
      {children}
  </main>
  )
}