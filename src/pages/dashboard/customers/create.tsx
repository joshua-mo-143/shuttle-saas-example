import Layout from "../../../components/Layout"
import React from "react"
import {useRouter} from 'next/router'
import {accountStore} from '@/zustandStore'

export default function CreateCustomer() {

  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [custEmail, setCustEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [priority, setPriority] = React.useState<string>("1");

  const {email} = accountStore();

let router = useRouter();
  
    const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    
    const url = `//${window.location.host}/api/customers/create`

    try {
      let res = await fetch(url, 
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: custEmail,
            phone: phone,
            priority: Number(priority),
            userEmail: email
          }),
        })

      if (res.ok) {
        router.push("/dashboard/customers");
      }
      
    } catch(e: any) {
      console.log(`Error: ${e}`)
    }
  }
  
  return (
    <>
      <Layout>
            <form className="py-10 flex flex-col gap-4 justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="lg:text-2xl text-xl text-center">Create Customer</h1>
          <label htmlFor="firstname">
            <span>First name: </span>
            <input type="text" name="first_name" className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={firstName} onInput={(e) => setFirstName((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="lastname">
            <span>Last name: </span>
            <input type="text" name="last_name" className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={lastName} onInput={(e) => setLastName((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="email">
            <span>Email address: </span>
            <input type="email" name="email" className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={custEmail} onInput={(e) => setCustEmail((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="phone">
            <span>Mobile number: </span>
            <input type="text" name="phone" className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={phone} onInput={(e) => setPhone((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="priority">
            <span>Priority: </span>
          <select name="priority" className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={priority} onChange={(e) => setPriority((e.target as HTMLSelectElement).value)}>
            <option value="1">Very Low</option>
            <option value="2">Low</option>
            <option value="3">Medium</option>
            <option value="4">High</option>
            <option value="5">Very High</option>
            </select>
      </label>
          <button type="submit">Submit</button>
          </form>
    </Layout>
  </>
  )
}


