import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [greetMessage, setGreetMessage] = useState('');
  useEffect(() => {
    (async () => {
      const res: any = await(await fetch('/api/v1/greet')).json();
      setGreetMessage(res.data?.message);
    })();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{greetMessage ? greetMessage : 'Hello'!}</h1>
      </header>
    </div>
  );
}

export default App;
