import Layout from "../components/Layout"
import React from "react"
import { useRouter } from 'next/router'

export default function Register() {

const [data, setData] = React.useState<[]>([]);
  const [id, setId] = React.useState<number>();
  
 const handleDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const element = e.target as HTMLButtonElement;
    const id = element.getAttribute("data-id");

    const url = `//${window.location.host}/api/notes/${id}`

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

     const url = `//${window.location.host}/api/notes`

      try {
        const res = await fetch(url,
        {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: new Headers({
              "Access-Control-Allow-Credentials": "true"
            }),
          });

        if (res.status == 403) {
          return router.push("/");
        }
      
        const data = await res.json()

        setData(data);

      } catch (e: any) {
        console.log(`Error: ${e}`);
      }
    };
    fetchData()
  }, []);
    

    return (
      <Layout>
      <p> Hello world! </p>
    </Layout>
  )
}


