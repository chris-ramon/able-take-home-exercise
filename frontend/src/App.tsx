import { useRef, useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import { ExchangeRateChart } from './components/ExchangeRateChart';

function App() {
  const ws = useRef(null);
  const [ethUsdcChartData, setEthUsdcChartData] = useState([]);

  useEffect(() => {
    ws.current = io('http://localhost:3000');

    ws.current.on('rates', (data) => {
      const { data: ratesData } = data?.payload || {};

      for (const rate of ratesData) {
        if (rate.s !== 'BINANCE:ETHUSDC') {
          continue;
        }

        const timestamp = rate.t;
        const price = rate.p;

        setEthUsdcChartData((prevData) => [
          ...prevData,
          { time: new Date(timestamp).toLocaleTimeString(), price },
        ]);
      }
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
      <ExchangeRateChart chartData={ethUsdcChartData} />
    </>
  );
}

export default App;
