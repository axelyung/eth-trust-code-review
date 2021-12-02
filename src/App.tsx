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
    setTrades((ts) => [...ts, { id, exchange, price, quantity }]);
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
    <div className="App">
      <div>trades ({trades.length})</div>
      {trades.map((t) => (
        <div key={t.id}>
          {t.id} - {t.exchange} - {t.quantity} - {t.price}
        </div>
      ))}
    </div>
  );
};

export default App;
