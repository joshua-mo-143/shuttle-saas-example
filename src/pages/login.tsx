import Layout from "../components/Layout"
import React from "react"
import {useRouter} from 'next/router'
import {accountStore} from "../zustandStore"
import Link from 'next/link'

export default function Home() {

  const [loginEmail, setLoginEmail] = React.useState<string>("");
  const [pw, setPw] = React.useState<string>("");
  const [pwVis, setPwVis] = React.useState<boolean>(false);

  const {email, changeEmail} = accountStore();

  let router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

  const url = `//${window.location.host}/api/auth/login`

    try {
     let res =  await fetch(url, 
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginEmail,
            password: pw
          }),
        })
      
      if (res.ok) {
        
  changeEmail(loginEmail);
      router.push("/dashboard");
      } else {
        console.log("Incorrect login details.");
      }
    } catch(e: any) {
      console.log(`Error: ${e}`)
    }
  }

  const togglePassword = (e: React.SyntheticEvent) => {
    e.preventDefault()

    setPwVis(!pwVis)
  }
  
    return (
<>
      <Layout>
            <form className="h-screen w-full flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit}>
          
        <h1 className="lg:text-2xl text-xl text-center">Log In</h1>
          <fieldset className="lg:w-1/5 w-full lg:h-1/4 h-full grid grid-cols-1 gap-4 grid-rows-auto items-center justify-center self-center">
                        
          <label htmlFor="email" className="grid grid-cols-7 grid-rows-1 items-center justify-center gap-8">
            <span className="col-span-2 text-right">Email:</span>
            <input type="email" name="email" className="px-5 py-2 shadow-md rounded-md bg-stone-100 col-span-4" value={loginEmail} onInput={(e) => setLoginEmail((e.target as HTMLInputElement).value)}></input>
      </label>

          <label htmlFor="password" className="grid grid-cols-7 grid-rows-1 items-center justify-center gap-8">
            <span className="col-span-2 text-right">Password:</span>
          <input type={pwVis ? "text" : "password"} name="password" className="px-5 py-2 shadow-md rounded-md bg-stone-100 col-span-4" value={pw} onInput={(e) => setPw((e.target as HTMLInputElement).value)}></input>

            <button onClick={(e) => togglePassword(e)} className="col-span-1">
{pwVis ? <p>Hide</p> : <p>Show</p>}
            </button>
      </label>
            
          <button type="submit" value="Submit" className="rounded-md shadow-md bg-stone-200 hover:bg-stone-100 transition-all px-5 py-2">Submit</button>
          <Link href="/register" className="text-center rounded-md shadow-md bg-stone-200 hover:bg-stone-100 transition-all px-5 py-2">I am new here</Link>
            </fieldset>
          </form>
    </Layout>
</>
  )
}

