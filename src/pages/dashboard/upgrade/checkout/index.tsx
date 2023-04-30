import Layout from "@/components/Layout"
import React from "react"
import {useRouter} from 'next/router'

export default function CreateCustomer() {

  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [card, setCard] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");
  const [month, setMonth] = React.useState<string>("");
  const [cvc, setCvc] = React.useState<string>("");


let router = useRouter();
    

    const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    
    const url = `//${window.location.host}/api/payments/pay`

    try {
      let res = await fetch(url, 
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            card: card,
            expyear: parseInt(year),
            expmonth: parseInt(month),
            cvc: cvc
          }),
        })

      if (res.ok) {
        router.push("/dashboard/upgrade/checkout/success");
      }
      
    } catch(e: any) {
      console.log(`Error: ${e}`)
    }
  }
  
  return (
    <>
      <Layout>
        <div className="grid grid-cols-2 grid-rows-1 h-screen w-full">
          <div className="py-10 flex flex-col gap-4 justify-center items-center">
          <h1 className="text-3xl"> Checkout </h1>
            <div className="text-left flex flex-col justify-center items-center gap-2">            
              <p className="text-lg">You are buying:</p>
            <hr className="border border-black w-40"/>
            <p> Paid Membership - £11.99</p>
        
</div>
          </div>
            <form className="py-10 flex flex-col gap-4 justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="lg:text-2xl text-xl text-center">Checkout</h1>
          <label htmlFor="name">
            <span>Name: </span>
            <input type="text" name="name" required  className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={name} onInput={(e) => setName((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="email">
            <span>Payment e-mail: </span>
            <input type="email" name="email" required  className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="card">
            <span>Card number: </span>
            <input type="text" name="card" required  className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" maxLength={16} minLength={16} value={card} onInput={(e) => setCard((e.target as HTMLInputElement).value)}></input>
      </label>
          <label htmlFor="exp_year">
            <span>Expiry year: </span>
            <select className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" id="year" name="exp_year" required  onChange={(e) => setYear((e.target as HTMLSelectElement).value)}>
    <option value="">Please select</option>
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <option value="2025">2025</option>
    <option value="2026">2026</option>
    <option value="2027">2027</option>
    <option value="2028">2028</option>
    <option value="2029">2029</option>
    <option value="2030">2030</option>
    <option value="2031">2031</option>
    <option value="2032">2032</option>
    <option value="2033">2033</option>
    <option value="2034">2034</option>
    <option value="2035">2035</option>
    <option value="2036">2036</option>
    <option value="2037">2037</option>
    <option value="2038">2038</option>
    <option value="2039">2039</option>
    <option value="2040">2040</option>
    <option value="2041">2041</option>
    <option value="2042">2042</option>
    <option value="2043">2043</option>
</select>
      </label>
          <label htmlFor="exp_month">
            <span>Expiry month: </span>
          <select name="exp_month" required  className="shadow-md rounded-md bg-stone-100 px-5 py-2" value={month} onChange={(e) => setMonth((e.target as HTMLSelectElement).value)}>
              <option value="">month</option>
    <option value="1">January</option>
    <option value="2">February</option>
    <option value="3">March</option>
    <option value="4">April</option>
    <option value="5">May</option>
    <option value="6">June</option>
    <option value="7">July</option>
    <option value="8">August</option>
    <option value="9">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option>
            </select>
      </label>
                    <label htmlFor="cvc">
            <span>Expiry year: </span>
            <input type="password" name="cvc" required  maxLength={3} className="px-5 py-2 shadow-md rounded-md bg-stone-100 px-5 py-2" value={cvc} onInput={(e) => setCvc((e.target as HTMLInputElement).value)}></input>
        
      </label>

          <button type="submit">Submit</button>
          </form>
    </div>
    </Layout>
  </>
  )
}


