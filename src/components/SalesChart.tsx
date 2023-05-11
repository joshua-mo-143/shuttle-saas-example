import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

function SalesChart() {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        stepSize: 100,
        max: 500,
        ticks: {
          stepSize: 100,
        },
      },
    },
    plugins: {
      title: {
        display: false,
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const chartdata = {
    labels,
    datasets: [
      {
        label: 'Sales - Last 7 Months',
        data: [100, 300, 200, 100, 200, 400, 300],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="w-full h-96 shadow-md p-6 mb-10 rounded-md">
      <Line options={options} data={chartdata} />
    </div>
  );
}

export default SalesChart;
