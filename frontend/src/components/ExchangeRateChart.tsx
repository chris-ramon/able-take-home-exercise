import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './ExchangeRateChart.css';

export function ExchangeRateChart({ title, chartData }) {
  return (
    <div className='exchangeRateChart'>
      <h2>{title}</h2>
      <AreaChart
        style={{
          width: '100%',
          maxWidth: '700px',
          maxHeight: '70vh',
          aspectRatio: 1.618,
        }}
        responsive
        data={chartData}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <YAxis width='auto' />
        <Tooltip />
        <Area type='monotone' dataKey='price' stroke='#8884d8' fill='#8884d8' />
      </AreaChart>
    </div>
  );
}
