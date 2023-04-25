import Layout from "../components/Layout"
import React from "react"
import {useRouter} from 'next/router'
import {accountStore} from "../zustandStore"

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
            <form className="py-10 flex flex-col gap-4 justify-center items-center" onSubmit={handleSubmit}>
        <h1 className="lg:text-2xl text-xl text-center">Log In</h1>
          <label htmlFor="email" className="flex flex-row gap-4 items-center">
            <span>Email: </span>
            <input type="email" name="email" className="px-5 py-2 shadow-md rounded-md bg-stone-100" value={loginEmail} onInput={(e) => setLoginEmail((e.target as HTMLInputElement).value)}></input>
      </label>

          <label htmlFor="password" className="flex flex-row gap-4 items-center">
            <span>Password: </span>
          <input type={pwVis ? "text" : "password"} name="password" className="px-5 py-2 shadow-md rounded-md bg-stone-100" value={pw} onInput={(e) => setPw((e.target as HTMLInputElement).value)}></input>

            <button onClick={(e) => togglePassword(e)}>
{pwVis ? <p>Hide</p> : <p>Show</p>}
            </button>
      </label>
          
          <button type="submit" value="Submit">Submit</button>
          </form>
    </Layout>
</>
  )
}

