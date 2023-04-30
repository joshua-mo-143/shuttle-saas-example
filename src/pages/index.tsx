import Layout from "../components/Layout"
import React from 'react'

export default function Home() {

  return (
  <>
      <Layout>
          <section className="min-h-full py-20 w-full flex flex-col justify-center items-center gap-10">
            <h1 className="text-3xl font-bold">Next.js + Rust SaaS Template</h1>
            <div className="lg:w-1/2 grid grid-cols-2 auto-rows-fr justify-center items-center gap-10">
            <div className="col-span-1 row-span-1 shadow-md px-10 py-5 h-max rounded-md border border-red text-center">
              <h2 className="font-bold text-center text-xl">Deployed from Shuttle</h2>
              <p> Deployed via Shuttle, a Rust-native cloud dev platform. </p>
              <a href="https://www.shuttle.rs" target="_blank" className="text-blue-300 visited:text-blue-600 active:text-blue-400 transition-all">Learn more here</a>

            </div>
                        <div className="col-span-1 row-span-1 shadow-md px-10 py-5 h-max rounded-md border border-red text-center">
              <h2 className="font-bold text-center text-xl">Learn About Rust</h2>
              <p>Rust is a brilliant language for writing memory-safe, efficient software.</p>
                <a href="https://doc.rust-lang.org/book/" target="_blank" className="text-blue-300 visited:text-blue-600 active:text-blue-400 transition-all">Learn more here</a>
            </div>

            <div className="col-span-1 row-span-1 shadow-md px-10 py-5 h-max rounded-md border border-red text-center">
              <h2 className="font-bold text-center text-xl">Learn About Next.js</h2>
              <p>Next.js is a React-based meta-framework at the forefront of JavaScript.</p>
              <a href="https://nextjs.org/" target="_blank" className="text-blue-300 visited:text-blue-600 active:text-blue-400 transition-all">Learn more here</a>
            </div>

            <div className="col-span-1 row-span-1 shadow-md px-10 py-5 h-max rounded-md border border-red text-center">
              <h2 className="font-bold text-center text-xl h-max">Join the community</h2>
              <p>Join a thriving community with like-minded Rustaceans and web developers.</p>
              <a href="https://discord.com/invite/shuttle" target="_blank" className="text-blue-300 visited:text-blue-600 active:text-blue-400 transition-all">Learn more here</a>
            </div>

          </div>
    </section>
    </Layout>
  </>
  )
}
