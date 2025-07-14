import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExtrasChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp" stroke="#ff7f0e" name="Temp. °C" />
        <Line type="monotone" dataKey="humidity" stroke="#1f77b4" name="Humedad %" />
        <Line type="monotone" dataKey="wind" stroke="#2ca02c" name="Viento m/s" />
      </LineChart>
    </ResponsiveContainer>
  );
}
