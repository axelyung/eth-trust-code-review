import { useEffect, useState } from 'react';

const wsURI = `wss://ws.sfox.com/ws`;

const ws = new WebSocket(wsURI);

export interface Trade {
  id: string;
  exchange: string;
  price: number;
  quantity: number;
}

function useTrades(): Trade[] {
  const [trades, setTrades] = useState<Trade[]>([]);

  const onMessage = ({ data }: MessageEvent) => {
    const { payload } = JSON.parse(data);
    if (!payload) return;

    const { id, exchange, price, quantity } = payload;
    if (!id) return; // implies init sucess message

    setTrades((ts) => [
      { id, exchange, price: +price, quantity: +quantity },
      ...ts.slice(0, 9),
    ]);
  };

  useEffect(() => {
    console.log(`adding event listener`);
    ws.addEventListener(`message`, onMessage);

    // on socket open subscribe to ethusd channel
    ws.addEventListener(`open`, () => {
      console.log(`subscribing`);
      const subscribeMsg = {
        type: `subscribe`,
        feeds: [`trades.sfox.ethusd`],
      };
      ws.send(JSON.stringify(subscribeMsg));
    });

    // remove event listener and close connection on unmount
    return () => {
      console.log(`removing event listener`);
      ws.removeEventListener(`message`, onMessage);
      console.log(`closing connection`);
      ws.close();
    };
  }, []);
  return trades;
}

export default useTrades;
