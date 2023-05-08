import Layout from "../../../components/Layout"
import React from "react"
import { useRouter } from 'next/router'
import {accountStore} from "../../../zustandStore"
import Link from 'next/link'

interface Deal {
  id: number,
  estimate_worth: number,
  actual_worth: number,
  status: string,
  closed: string,
  customer_id: number,

}

export default function DealIndex() {

  const [data, setData] = React.useState<Deal[]>([]);
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

     const url = `//${window.location.host}/api/deals`

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
      <div className="py-10 flex flex-col items-center gap-4">
        <h1 className="lg:text-3xl text-xl">View Deals</h1>
          <Link href="/dashboard/deals/create" className="px-5 py-2 bg-stone-100 hover:bg-stone-200 transition-all mt-4">Create Deal</Link>
    {data ?
      <div className="grid grid-cols-5 grid-rows-auto items-center gap-4">
      {data.map((cust) => (
        <div key={cust.id} className="px-10 py-4 bg-stone-200 flex flex-col gap-2">
          <p className="text-lg"> Hello world! </p>
          <p> Email:  </p>
          <p> Phone:  </p>
        </div>)
      )}
  </div>  
    : null }

      </div>
      
          </Layout>
  )
}


