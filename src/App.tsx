import React from 'react';
import './App.css';
import useTrades from './hooks/trades';

const App = function () {
  const trades = useTrades();
  return (
    <div className="App container mx-auto py-2">
      <h1 className="text-xl font-bold">Trades Stream</h1>
      <h1 className="italic mb-3">
        Last 10 ETH-USD trades aggregated from SFOX
      </h1>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Exchange
                    </th>
                    <th
                      scope="col"
                      className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="w-1/3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {trades.map((t) => (
                    <tr key={t.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {t.exchange}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {t.quantity.toLocaleString(undefined, {
                          maximumFractionDigits: 8,
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {t.price.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
