import Layout from "../../../components/Layout"
import React from "react"
import { useRouter } from 'next/router'
import {accountStore} from "../../../zustandStore"
import Link from 'next/link'
import CustomerSingleModal from '@/components/CustomerSingleModal'

interface Customer {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  phone: string
}

export default function CustomerIndex() {

  const [data, setData] = React.useState<Customer[]>([]);
  const [id, setId] = React.useState<number>(1);
  const [vis, setVis] = React.useState<boolean>(false);
  const {email} = accountStore();

  let router = useRouter();

  const handleVis = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const element = e.target as HTMLButtonElement;
  const customerId = element.getAttribute("data-id");

  // @ts-ignore
    const customerIdAsInt = parseInt(customerId)
    setId(customerIdAsInt)
    setVis(true)
  }
  
React.useEffect(() => {
    const fetchData = async () => {

     const url = `//${window.location.host}/api/customers`

      try {
        const res = await fetch(url,
        {
            method: "POST",
            mode: "cors",
            headers: new Headers({
              "Content-Type": "application/json"
            }),
            
            body: JSON.stringify({
            email: email
          })
          },
        );

        if (res.status == 403) {
          return router.push("/login");
        }
      
        const data = await res.json()

        setData(data);

      } catch (e: any) {
        console.log(`Error: ${e}`);
      }
    };
    fetchData()
  }, [email, router]);
    

    return (
      <Layout>
      <CustomerSingleModal data={data} id={id} vis={vis} setVis={setVis}/>
      <div className="py-10 flex flex-col items-center gap-4 w-full">
        <h1 className="lg:text-3xl text-xl font-bold">View Customers</h1>
          <Link href="/dashboard/customers/create" className="px-5 py-2 bg-stone-100 hover:bg-stone-200 transition-all mt-4">Create Customer</Link>
    {data ?
      <div className="mx-5 grid grid-cols-1 grid-rows-auto items-center w-4/5 gap-4">
      {data.map((cust) => (
        <div key={cust.id} className="px-10 py-4 bg-slate-500 grid grid-cols-7 grid-rows-1 items-center gap-2 rounded-md">
          <p className="text-lg col-span-2"> {cust.firstname} {cust.lastname} </p>
          <p className="col-span-2"> Email: {cust.email} </p>
          <p className="col-span-2"> Phone: {cust.phone} </p>
          <button data-id={cust.id} onClick={handleVis} className="px-5 py-2 bg-slate-300 hover:bg-stone-200 transition-all mt-4 rounded-md">View More</button>
        </div>
          )
      )}
  </div>  
    : null }

      </div>
      
          </Layout>
  )
}


