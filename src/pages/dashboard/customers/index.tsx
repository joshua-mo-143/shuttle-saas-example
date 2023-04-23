import Layout from "../../../components/Layout"
import React from "react"
import { useRouter } from 'next/router'
import {accountStore} from "../../../zustandStore"
import Link from 'next/link'

interface Customer {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  phone: string
}

export default function CustomerIndex() {

  const [data, setData] = React.useState<Customer[]>([]);
  const [id, setId] = React.useState<number>();
  const {email} = accountStore();

  let router = useRouter();

 const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const element = e.target as HTMLButtonElement;
    const id = element.getAttribute("data-id");

    const url = `//${window.location.host}/api/customers/${id}`

    try {
      
const res = await fetch(url, {
      mode: 'cors',
      method: 'DELETE'
    });

    window.location.reload()
      
    } catch (e: any) {
      console.log(`Error: ${e}`)
    }
    
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
      <div className="py-10 flex flex-col items-center gap-4 bg-sky-200">
        <h1 className="lg:text-3xl text-xl">View Customers</h1>
    {data ?
      <div className="flex flex-col items-center gap-4">
      {data.map((cust) => (
        <div key={cust.id} className="px-10 py-4 bg-stone-200">
          <p> {cust.firstname} {cust.lastname} </p>
          <p> Email: {cust.email} </p>
          <p> Phone: {cust.phone} </p>
          <Link href={`/dashboard/customers/${cust.id}`} className="px-5 py-2 bg-stone-100 hover:bg-stone-200 transition-all">View More</Link>
        </div>)
      )}
  </div>  
    : null }

<Link href="/dashboard/customers/create">Create Customer</Link>
      </div>
      
          </Layout>
  )
}


