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
  customer_name: String
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

  const handleStatus = async (e: React.SyntheticEvent) => {
  e.preventDefault()

  let element = e.target as HTMLSelectElement;

  let id = element.getAttribute("data-id");
  let status = element.value;
    
    const url = `//${window.location.host}/api/deals/${id}`
    
    try {
      const res = await fetch(url,
      {
        method: "PUT",
        mode: "cors",
        headers: new Headers({
            "Content-Type": "application/json"
          }),
        body: JSON.stringify({
            new_value: status,
            email: email,
          })
      });

      if (res.ok) {
        element.value = status;
      }
    } catch(e: any) {
      console.log(e.message)
    }
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
        <h1 className="lg:text-3xl text-xl font-bold">View Deals</h1>
          <Link href="/dashboard/deals/create" className="px-5 py-2 bg-stone-100 hover:bg-stone-200 transition-all mt-4">Create Deal</Link>
    {data ?
        <>
      {data.map((deal) => (
        <div key={deal.id} className="px-10 py-4 bg-slate-500 grid grid-cols-7 grid-rows-1 items-center gap-2 rounded-md">
          <p className="text-lg col-span-2"> {deal.customer_name} </p>
          <p className="col-span-2"> Sale amount: £{deal.estimate_worth}.00 </p>
          <div className="col-span-2">
                 <span> Status: </span>
                 
                <select className="text-center bg-slate-500 rounded-md" data-id={deal.id} value={deal.status} onChange={(e: React.SyntheticEvent) => handleStatus(e)}>
                  <option value="open">Open</option>
                  <option value="awaitingresponse">Awaiting Response</option>
                  <option value="ready">Ready to close</option>
                  <option value="closed">Closed</option>
                  </select>
                 </div>
        </div>
        )
      )}
    </>
    : null }

      </div>
      
          </Layout>
  )
}


