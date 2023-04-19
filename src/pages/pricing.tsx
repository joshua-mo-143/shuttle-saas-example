import Image from 'next/image'
import Layout from "../components/Layout"
export default function Home() {
  return (
  <>
      <Layout>
        <section className="my-10 flex flex-row justify-around">
        <h1 className="text-2xl lg:text-5xl">Manage your customers quicker and easier, without the hassle.</h1>
        <p> Hello world! </p>
        </section>
              <section className="my-10">
        <h1 className="text-2xl lg:text-5xl">About</h1>
        <p>Zest CRM keeps ease of use in mind to let your manage your customers easily without information overload, while still providing powerful analytics that help you with your business. </p>
        </section>
        <section className="flex flex-col items-center gap-8">
            <p className="lg:text-3xl text-xl"> Subscribe to our mailing list and receive the latest updates. </p>
          <form className="flex flex-row justify-center gap-4">
            <input className="px-5 py-2"></input>
            <button type="submit">Submit</button>
      </form>
        </section>

    </Layout>
  </>
  )
}
