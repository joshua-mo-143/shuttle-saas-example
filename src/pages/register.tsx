import Layout from "../components/Layout"
import React from "react"
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function Register() {
  
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [pw, setPw] = React.useState<string>("");
  const [pwConfirm, setPwConfirm] = React.useState<string>("");
  const [pwVis, setPwVis] = React.useState<boolean>(false);

let router = useRouter();
    
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    
    const url = `//${window.location.host}/api/auth/register`

    try {
      await fetch(url, 
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: pw
          }),
        })

      router.push("/login");
      
    } catch(e: any) {
      console.log(`Error: ${e}`)
    }
  }

    const togglePassword = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setPwVis(!pwVis)
  }

  
  return (
      <Layout>
            <form className="h-screen overflow-hidden flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
        <h1 className="lg:text-2xl text-xl text-center">Register</h1>
        <fieldset className="grid grid-rows-auto grid-cols-1 justify-center items-center gap-4">
        <label htmlFor="name" className="grid grid-cols-7 grid-rows-1 gap-4 items-center">
            <span className="text-right col-span-2">Name: </span>
            <input type="text" name="name" className="px-5 py-2 shadow-md rounded-md bg-stone-100 col-span-4" required value={name} onInput={(e) => setName((e.target as HTMLInputElement).value)}></input>
      </label>

          <label htmlFor="email" className="grid grid-cols-7 grid-rows-1 gap-4 items-center">
            <span className="text-right col-span-2">Email: </span>
            <input type="email" name="email" className="px-5 py-2 shadow-md rounded-md bg-stone-100 col-span-4" required value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="password" className="grid grid-cols-7 grid-rows-1 gap-4 items-center">
            <span className="text-right col-span-2">Password: </span>
          <input type={pwVis ? "text" : "password"} name="password" className="px-5 py-2 shadow-md rounded-md bg-stone-100 col-span-4" required value={pw} onInput={(e) => setPw((e.target as HTMLInputElement).value)}></input>
            <button onClick={(e) => togglePassword(e)} className="col-span-1">
{pwVis ? <p>Hide</p> : <p>Show</p>}
            </button>
      </label>
          
          <label htmlFor="confirm" className="grid grid-cols-7 grid-rows-1 gap-4 items-center">
            <span className="text-right col-span-2">Confirm:</span>
          <input type={pwVis ? "text" : "password"} name="confirm" className="px-5 py-2 shadow-md rounded-md bg-stone-100 col-span-4" required value={pwConfirm} onInput={(e) => setPwConfirm((e.target as HTMLInputElement).value)}></input>
            <button onClick={(e) => togglePassword(e)} className="col-span-1">
{pwVis ? <p>Hide</p> : <p>Show</p>}
            </button>
      </label>
          
          <button type="submit" className="rounded-md shadow-md bg-stone-200 text-center hover:bg-stone-100 transition-all px-5 py-2">Submit</button>
          <Link href="/login" className="rounded-md shadow-md bg-stone-200 text-center hover:bg-stone-100 transition-all px-5 py-2">I have an account</Link>
      </fieldset>
          </form>
    </Layout>
  )
}


