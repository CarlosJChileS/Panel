import React from 'react';
import Header from './Header';
import StatisticsModule from './StatisticsModule';
import '../Dashboard.css';

export default function Stats() {
  return (
    <div className="dashboard-bg">
      <Header />
      <main id="main-content">
        <StatisticsModule />
      </main>
    </div>
  );
}
