import Layout from "@/components/Layout"
import Link from 'next/link'

export default function Home() {
  return (
  <>
      <Layout>
              <section className="py-10 flex flex-col justify-center items-center w-full">
        <h1 className="text-xl lg:text-3xl text-center">Pricing</h1>
          <div className="grid grid-cols-3 grid-rows-1 gap-10 mx-10 py-10 w-4/5 justify-items-center">
            <div className="col-span-1 w-2/3 grid grid-cols-1 grid-rows-10 justify-center gap-2 justify-items-center text-center bg-sky-200 py-10 rounded-md">
              
              <p className="lg:text-3xl text-xl row-span-2">Basic</p>
              <ul className="row-span-8 text-lg">
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
          </ul>
              <p className="text-xl">This is you!</p>
              </div>
            <div className="col-span-1 w-2/3 grid grid-cols-1 grid-rows-10 justify-center gap-2 justify-items-center text-center bg-sky-200 py-10 rounded-md">
              
              <p className="lg:text-3xl text-xl row-span-2">Premium</p>
              <ul className="row-span-8 text-lg">
              <li>Everything in Basic!</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Only £11.99 a month!</li>
          </ul>
                  <Link href="/dashboard/upgrade/checkout" className="bg-stone-200 w-max px-10 py-4 self-center row-span-1 hover:bg-stone-100 transition-all">Pay</Link>
              </div>

            <div className="col-span-1 w-2/3 grid grid-cols-1 grid-rows-10 justify-center gap-2 justify-items-center text-center bg-sky-200 py-10 rounded-md">
              
              <p className="lg:text-3xl text-xl row-span-2">Corporate</p>
              <ul className="row-span-8 text-lg">
                <li>Everything in Premium!</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Lorem ipsum</li>
              <li>Only £11.99 a month!</li>
          </ul>
                  <Link href="/dashboard/upgrade/checkout" className="bg-stone-200 w-max px-10 py-4 self-center row-span-1 hover:bg-stone-100 transition-all">Pay</Link>
              </div>

      </div>
        </section>

    </Layout>
  </>
  )
}
