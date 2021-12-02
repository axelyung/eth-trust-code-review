import React from 'react';
import './App.css';
import Table from './components/Table';
import useTrades from './hooks/trades';

const App = function () {
  const trades = useTrades();
  return (
    <div className="App container mx-auto py-2">
      <h1 className="text-xl font-bold">Trades Stream</h1>
      <h1 className="italic mb-3">
        Last 10 ETH-USD trades aggregated from SFOX
      </h1>
      <Table trades={trades} />
    </div>
  );
};

export default App;
