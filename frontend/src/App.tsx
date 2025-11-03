import { useRef, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './App.css'
import { io } from "socket.io-client";

function App() {
  const ws = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log(">>>>>>>>>> here")
    ws.current = io('http://localhost:3000');

    ws.current.on('rates', (data) => {
      const { data: ratesData } = data?.payload || {};

      for(const rate of ratesData) {
        if(rate.s !== 'COINBASE:BTC-USD') {
          continue
        }

        const timestamp = rate.t;
        const price = rate.p;

        setChartData((prevData) => [
          ...prevData,
          { time: new Date(timestamp).toLocaleTimeString(), price }
        ]);
      }

      console.log(chartData);
    });

  	return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };

  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      <h2>ETH → USDC</h2>
      <AreaChart
        style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
        responsive
        data={chartData}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis width="auto" />
        <Tooltip />
        <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </>
  )
}

export default App
