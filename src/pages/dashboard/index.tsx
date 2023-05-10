import Layout from '../../components/Layout';
import React from 'react';
import { useRouter } from 'next/router';
import { accountStore } from '@/zustandStore';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface dashboardData {
  sales_deals_info: salesDealsInfo;
  sales_per_day_info: salesPerDayInfo;
}

interface salesDealsInfo {
  open: number;
  ready: number;
  awaitingresponse: number;
  closed: number;
  total_amt_closed: number;
}

interface salesPerDayInfo {
  date: String;
  sales_total: number;
}

export default function Dashboard() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const chartdata = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [100, 200, 300, 400, 500, 600, 700],
        backgroundColor: '#94a3b8',
        color: '#ffffff',
      },
    ],
  };
  const [data, setData] = React.useState<dashboardData>();
  const { email } = accountStore();
  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      const url = `//${window.location.host}/api/dashboard`;

      try {
        const res = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),

          body: JSON.stringify({
            email: email,
          }),
        });

        if (res.status == 403) {
          return router.push('/login');
        }

        const data = await res.json();

        setData(data);
      } catch (e: any) {
        console.log(`Error: ${e}`);
      }
    };
    fetchData();
  }, [email, router]);

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-8 pt-10 justify-center items-center pb-10">
          <h1 className="text-xl lg:text-3xl">Dashboard</h1>

          {data ? (
            <div className="grid grid-cols-4 grid-rows-auto justify-center items-center gap-10">
              <div className="flex flex-col justify-center items-center shadow-md bg-slate-500 hover:bg-slate-300 rounded-md transition-all px-10 py-4">
                <h2 className="text-2xl">Closed this week:</h2>
                <p>£0.00</p>
              </div>
              <div className="flex flex-col justify-center items-center shadow-md bg-slate-500 hover:bg-slate-300 rounded-md transition-all px-10 py-4">
                <h2 className="text-2xl">Closed this month:</h2>
                <p>£0.00</p>
              </div>
              <div className="flex flex-col justify-center items-center shadow-md bg-slate-500 hover:bg-slate-300 rounded-md transition-all px-10 py-4">
                <h2 className="text-2xl">Leads</h2>
                <p>1</p>
              </div>
              <div className="flex flex-col justify-center items-center shadow-md bg-slate-500 hover:bg-slate-300 rounded-md transition-all px-10 py-4">
                <h2 className="text-2xl">Open Sales Deals</h2>
                <p>1</p>
              </div>
              <div className="col-span-4 row-span-4 flex flex-col items-center gap-10 bg-slate-500 rounded-md px-10 py-4">
                <h2 className="text-2xl text-center">Top 3 Clients</h2>
                <div className="grid grid-rows-3 grid-cols-1 justify-center items-center w-[100%]">
                  <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-row justify-around gap-20">
                    <p className="text-2xl"> Joe Johnson </p>
                    <p className="text-2xl">Total sold: £100532532532.00</p>
                  </div>
                  <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-row justify-around gap-20">
                    <p className="text-2xl"> Joe Johnson </p>
                    <p className="text-2xl">Total sold: £100532532532.00</p>
                  </div>
                  <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-row justify-around gap-20">
                    <p className="text-2xl"> Joe Johnson </p>
                    <p className="text-2xl">Total sold: £100532532532.00</p>
                  </div>
                </div>
              </div>
              <div className="col-span-3 row-span-4 bg-slate-500 px-5 py-2 rounded-md">
                <h1 className="text-3xl text-center">Sales - Last 7 Days </h1>
                <Bar options={options} data={chartdata} />
              </div>
              <div className="col-span-1 row-span-4 bg-slate-500 rounded-md shadow-md py-10 px-4 h-max">
                <h2 className="text-center text-2xl">Recent Sales</h2>
                <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-col">
                  <p className=""> Joe Johnson </p>
                  <p className="">Amount invoiced: £100532532532.00</p>
                </div>
                <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-col">
                  <p className=""> Joe Johnson </p>
                  <p className="">Amount invoiced: £100532532532.00</p>
                </div>
                <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-col">
                  <p className=""> Joe Johnson </p>
                  <p className="">Amount invoiced: £100532532532.00</p>
                </div>
                <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-col">
                  <p className=""> Joe Johnson </p>
                  <p className="">Amount invoiced: £100532532532.00</p>
                </div>
                <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-col">
                  <p className=""> Joe Johnson </p>
                  <p className="">Amount invoiced: £100532532532.00</p>
                </div>
                <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-col">
                  <p className=""> Joe Johnson </p>
                  <p className="">Amount invoiced: £100532532532.00</p>
                </div>
                <div className="px-5 py-2 w-[100%] col-span-1 bg-slate-500 hover:bg-slate-300 rounded-md transition-all flex flex-col">
                  <p className=""> Joe Johnson </p>
                  <p className="">Amount invoiced: £100532532532.00</p>
                </div>
              </div>
            </div>
          ) : (
            <p>It looks like something went wrong when retrieving data :(</p>
          )}
        </div>
      </Layout>
    </>
  );
}
