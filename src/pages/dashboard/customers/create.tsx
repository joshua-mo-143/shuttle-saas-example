import Layout from "../components/Layout"
import React from "react"

export default function Register() {

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
            email: email,
            password: password
          }),
        })

      router.push("/login");
      
    } catch(e: any) {
      console.log(`Error: ${e}`)
    }
  }
  
  return (
      <Layout>
            <form className="py-10 flex flex-col gap-4 justify-center items-center">
        <h1 className="lg:text-2xl text-xl text-center">Register</h1>
          <label htmlFor="email">
            <span>Email: </span>
            <input type="email" name="email" className="px-5 py-2" value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="password">
            <span>Password: </span>
          <input type={pwVis ? "text" : "password"} name="password" className="px-5 py-2" value={pw} onInput={(e) => setPw((e.target as HTMLInputElement).value)}></input>
            <button onClick={() => setPwVis(!pwVis)}>
{pwVis ? "Password is visible" : "Password is invisible"}
            </button>
      </label>
          
          <label htmlFor="confirm">
            <span>Confirm password: </span>
          <input type={pwVis ? "text" : "password"} name="confirm" className="px-5 py-2" value={pwConfirm} onInput={(e) => setPwConfirm((e.target as HTMLInputElement).value)}></input>
            <button onClick={(e) => setPwVis(!pwVis)}>
{pwVis ? "Password is visible" : "Password is invisible"}
            </button>
      </label>
          
          <button type="submit">Submit</button>
          </form>
    </Layout>
  )
}


