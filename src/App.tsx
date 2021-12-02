import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const wsURI = `wss://ws.sfox.com/ws`;

const ws = new WebSocket(wsURI);

const onMessage = ({ data }: MessageEvent) => {
  const d = JSON.parse(data);
  console.log(d);
};

const App = function () {
  useEffect(() => {
    console.log(`adding event listener`);
    ws.addEventListener(`message`, onMessage);
    ws.addEventListener(`open`, () => {
      console.log(`subscribing`);
      const subscribeMsg = {
        type: `subscribe`,
        feeds: [`ticker.sfox.btcusd`],
      };
      ws.send(JSON.stringify(subscribeMsg));
    });

    return () => {
      console.log(`removing event listener`);
      ws.removeEventListener(`message`, onMessage);
      console.log(`closing connection`);
      ws.close();
    };
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
