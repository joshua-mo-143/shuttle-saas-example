import Image from 'next/image'
import Layout from "../components/Layout"
export default function Home() {
  return (
  <>
      <Layout>
              <section className="my-10 flex flex-col justify-center w-full">
        <h1 className="text-2xl lg:text-5xl text-center">Pricing</h1>
          <div className="grid grid-cols-3 grid-rows-1 gap-10 mx-10 py-10">
            <div className="col-span-1 flex flex-col justify-center items-center text-center">
              <p className="lg:text-3xl text-xl">Basic</p>
              <p>Lorem ipsum</p>
                            <button className="bg-sky-200 w-40">Get Started</button>

              </div>
                        <div className="col-span-1 flex flex-col justify-center items-center text-center">
                          <p className="lg:text-3xl text-xl">Premium</p>

                          <p>Everything in Basic!</p>

              <p>Lorem ipsum</p>
              <button className="bg-sky-200 w-40">Get Started</button>
              </div>
                        <div className="col-span-1 flex flex-col justify-center items-center text-center">

              <p className="lg:text-3xl text-xl">Corporate</p>
                        <p>Everything in Premium!</p>

              <p>Lorem ipsum</p>
                            <button className="bg-sky-200 w-40">Get Started</button>

              </div>

      </div>
        </section>

    </Layout>
  </>
  )
}
