import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({ altitude: 0, his: 0, adi: 0 });
  const [viewMode, setViewMode] = useState('text'); 

  const sendData = async () => {
    await fetch('http://localhost:5000/api/flightdata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    alert('Data Sent!');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>מוניטור מכווני טיסה</h1>
      
      <button onClick={() => setViewMode('text')}>TEXT</button>
      <button onClick={() => setViewMode('visual')}>VISUAL</button>

      <div style={{ marginTop: '20px', border: '1px solid black', padding: '10px' }}>
        <input type="number" placeholder="Altitude" onChange={(e) => setData({...data, altitude: e.target.value})} />
        <input type="number" placeholder="HIS" onChange={(e) => setData({...data, his: e.target.value})} />
        <input type="number" placeholder="ADI" onChange={(e) => setData({...data, adi: e.target.value})} />
        <button onClick={sendData}>SEND</button>
      </div>

      {viewMode === 'text' ? (
        <div>
          <p>Altitude: {data.altitude}</p>
          <p>HIS: {data.his}</p>
          <p>ADI: {data.adi}</p>
        </div>
      ) : (
        <div>
          {

          }
          <h2>Visual Gauges Area</h2>
        </div>
      )}
    </div>
  );
}

export default App;