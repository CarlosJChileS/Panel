import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const POLLUTANT_KEYS = {
  'PM2.5': 'pm2_5',
  'PM10': 'pm10',
  'NO₂': 'no2',
  'O₃': 'o3',
  'CO': 'co',
};

export default function AirQualityChart({ data, pollutant }) {
  const key = POLLUTANT_KEYS[pollutant] || 'pm2_5';
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={key} stroke="#8884d8" name={pollutant} />
      </LineChart>
    </ResponsiveContainer>
  );
}
