import Layout from "../components/Layout"
import React from "react"

export default function Home() {

  const [email, setEmail] = React.useState<string>("");
  const [pw, setPw] = React.useState<string>("");
  const [pwVis, setPwVis] = React.useState<boolean>(false);

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
            email: email,
            password: password
          }),
        })
      
      if (res.ok) {
        
  changeName(username);
      router.push("/dashboard");
      } else {
        console.log("Incorrect login details.");
      }
    } catch(e: any) {
      console.log(`Error: ${e}`)
    }
  }
  
    return (
<>
      <Layout>
            <form className="py-10 flex flex-col gap-4 justify-center items-center">
        <h1 className="lg:text-2xl text-xl text-center">Log In</h1>
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
          
          <button type="submit" value="Submit">Submit</button>
          </form>
    </Layout>
</>
  )
}

