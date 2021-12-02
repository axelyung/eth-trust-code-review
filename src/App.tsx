import React, { useEffect, useState } from 'react';
import './App.css';

const wsURI = `wss://ws.sfox.com/ws`;

const ws = new WebSocket(wsURI);

interface Trade {
  id: string;
  exchange: string;
  price: number;
  quantity: number;
}

const App = function () {
  const [trades, setTrades] = useState<Trade[]>([]);
  const onMessage = ({ data }: MessageEvent) => {
    const { id, exchange, price, quantity } = JSON.parse(data).payload;
    console.log(JSON.parse(data));
    setTrades((ts) => [{ id, exchange, price, quantity }, ...ts.slice(0, 99)]);
    console.log({ id, exchange });
  };
  useEffect(() => {
    console.log(`adding event listener`);
    ws.addEventListener(`message`, onMessage);
    ws.addEventListener(`open`, () => {
      console.log(`subscribing`);
      const subscribeMsg = {
        type: `subscribe`,
        feeds: [`trades.sfox.ethusd`],
      };
      ws.send(JSON.stringify(subscribeMsg));
    });

    return () => {
      console.log(`removing event listener`);
      ws.removeEventListener(`message`, onMessage);
      console.log(`closing connection`);
      ws.close();
    };
  }, []);
  return (
    <div className="App container mx-auto">
      <div>trades ({trades.length})</div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Exchange
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                        {t.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{t.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Admin
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" />
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
