import Layout from "../../../components/Layout"
import React from "react"
import {useRouter} from 'next/router'
import {accountStore} from '@/zustandStore'

type Custname = {
  id: number,
  customer_name: string
}

export default function CreateDeal() {

  const [estimate, setEstimate] = React.useState<string>("");
  const [custId, setCustId] = React.useState<string>("");
  const [custnames, setCustnames] = React.useState<Custname[]>([]);
  const {email} = accountStore()

let router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
     const url = `//${window.location.host}/api/deals/create`

      try {
        const res = await fetch(url,
        {
            method: "POST",
            mode: "cors",
            headers: new Headers({
              "Content-Type": "application/json"
            }),
            
            body: JSON.stringify({
              estimatedworth: parseInt(estimate),
              cust_id: parseInt(custId),
              useremail: email

          })
          },
        );

        if (res.status == 403) {
          return router.push("/login");
        }

      router.push("/dashboard/deals")
      
      } catch (e: any) {
        console.log(`Error: ${e}`);
      }
    };
  
  React.useEffect(() => {
    const fetchData = async () => {

     const url = `//${window.location.host}/api/customers/names`

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

        setCustnames(data);

      } catch (e: any) {
        console.log(`Error: ${e}`);
      }
    };
    fetchData()
  }, []);
    
      
  return (
    <>
      <Layout>
            <form className="py-10 flex flex-col gap-4 justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="lg:text-2xl text-xl text-center">Create Deal</h1>
          <label htmlFor="estimated_worth">
            <span>Total to be invoiced: </span>
            <input type="text" name="estimated_worth" className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={estimate} onInput={(e) => setEstimate((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="custId">
            <span>Customer: </span>
          <select value={custId} onChange={(e) => setCustId((e.target as HTMLSelectElement).value)} className="px-5 py-2 shadow-md rounde-dmd bg-stone px-5 py-2">
              <option value=""></option>
            {custnames ? custnames.map((cust) => (
              <option value={cust.id} key={cust.id}>{cust.customer_name}</option>
            )) : null}
            </select>
                  </label>
          <button type="submit">Submit</button>
          </form>
    </Layout>
  </>
  )
}


