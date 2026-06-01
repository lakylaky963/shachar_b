import React, { useEffect, useState } from 'react';
import './App.css';

const initialData = { altitude: '', his: '', adi: '' }; // מתחילים עם טופס ריק
const API_URL = 'http://localhost:5000/api/flightData'; // השרת רץ על פורט 5000, לא 3000
const ALTITUDE_LIMIT = 3000;
const HIS_LIMIT = 360;
const ADI_LIMIT = 100;

const modalStyles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    padding: '24px',
    background: 'rgba(15, 23, 42, 0.55)',
    backdropFilter: 'blur(4px)',
    zIndex: 20
  },
  panel: {
    width: 'min(760px, 100%)',
    padding: '24px',
    background: 'white',
    borderRadius: '14px',
    boxShadow: '0 28px 80px rgba(15, 23, 42, 0.3)'
  },
  closeButton: {
    width: '40px',
    height: '40px',
    border: 0,
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '28px',
    lineHeight: 1,
    background: '#edf2f7',
    color: '#172033'
  },
  inputSection: {
    gridTemplateColumns: '1fr 1fr 1fr auto'
  }
};

function App() {
  const [data, setData] = useState(initialData);
  const [viewMode, setViewMode] = useState('text');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const altitudeNumber = parseFloat(data.altitude) || 0;
  const hisNumber = parseFloat(data.his) || 0;
  const adiNumber = parseFloat(data.adi) || 0;

  const altitudePercent = Math.min((altitudeNumber / ALTITUDE_LIMIT) * 100, 100);
  const adiMove = Math.max(Math.min(adiNumber, ADI_LIMIT), -ADI_LIMIT) / 2;

  useEffect(() => {
    // כשמירכיב נטען בפעם הראשונה, מושכים את נתוני הטיסה האחרונים
    getLatestData();
  }, []);

  const resetMessage = () => {
    setMessage('');
    setMessageType('');
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const openForm = () => {
    resetMessage();
    setFormOpen(true);
  };

  const closeForm = () => {
    if (!loading) {
      setFormOpen(false);
    }
  };

  const handleInputChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const validateData = () => {
    // בודק שהמשתמש הזין ערכים מספריים ומוגדרים בטווחים נכונים
    const alt = parseFloat(data.altitude);
    const his = parseFloat(data.his);
    const adi = parseFloat(data.adi);

    if ([alt, his, adi].some(Number.isNaN)) {
      showMessage('Please fill all fields', 'error');
      return false;
    }

    if (alt < 0 || alt > ALTITUDE_LIMIT) {
      showMessage(`Altitude must be between 0 and ${ALTITUDE_LIMIT}`, 'error');
      return false;
    }

    if (his < 0 || his > HIS_LIMIT) {
      showMessage(`HIS must be between 0 and ${HIS_LIMIT}`, 'error');
      return false;
    }

    if (adi < -ADI_LIMIT || adi > ADI_LIMIT) {
      showMessage(`ADI must be between -${ADI_LIMIT} and ${ADI_LIMIT}`, 'error');
      return false;
    }

    return true;
  };

  const getLatestData = async () => {
    // שולח קריאת GET לשרת ומעדכן את המסך עם הנתונים הנוכחיים
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const latestData = await response.json();
      setData(latestData);
    } catch (error) {
      showMessage('Failed to fetch latest data', 'error');
    }
  };

  const sendData = async () => {
    // שולח את הנתונים לשרת רק אחרי שבדקנו שהם נכונים
    if (!validateData()) {
      return;
    }

    setLoading(true);
    resetMessage();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          altitude: altitudeNumber,
          his: hisNumber,
          adi: adiNumber
        })
      });

      if (!response.ok) {
        showMessage('Failed to send data', 'error');
        return;
      }

      showMessage('Data sent successfully', 'success');
      setData(initialData);
      setFormOpen(false);
    } catch (error) {
      showMessage(`Server error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value) => value || '-';

  return (
    <main className="app">
      <section className="hero">
        <div>
          <p className="eyebrow">Flight Monitor</p>
          <h1>מוניטור מכווני טיסה</h1>
          <p className="intro">
            Simple dashboard for altitude, HIS heading and ADI attitude values.
          </p>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Enter Flight Data</h2>
          <div className="mode-buttons">
            <button
              type="button"
              className={viewMode === 'text' ? 'active' : ''}
              onClick={() => setViewMode('text')}
            >
              Text
            </button>
            <button
              type="button"
              className={viewMode === 'visual' ? 'active' : ''}
              onClick={() => setViewMode('visual')}
            >
              Visual
            </button>
          </div>
        </div>

        {!formOpen && (
          <button
            type="button"
            onClick={openForm}
            aria-label="Add flight data"
            style={{
              width: '64px',
              height: '64px',
              display: 'grid',
              placeItems: 'center',
              marginTop: '8px',
              color: 'white',
              background: '#1f6feb',
              border: 0,
              borderRadius: '50%',
              fontSize: '34px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 12px 24px rgba(31, 111, 235, 0.28)'
            }}
          >
            +
          </button>
        )}

        {formOpen && (
          <div style={modalStyles.backdrop} onClick={closeForm}>
            <div style={modalStyles.panel} onClick={(e) => e.stopPropagation()}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  marginBottom: '18px'
                }}
              >
                <h2>Enter Flight Data</h2>
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={loading}
                  style={{
                    ...modalStyles.closeButton,
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  ×
                </button>
              </div>

              <div className="input-section" style={modalStyles.inputSection}>
                <label>
                  Altitude
                  <input
                    type="number"
                    placeholder="0 - 3000 ft"
                    value={data.altitude}
                    onChange={(e) => handleInputChange('altitude', e.target.value)}
                    disabled={loading}
                  />
                </label>

                <label>
                  HIS
                  <input
                    type="number"
                    placeholder="0 - 360 degrees"
                    value={data.his}
                    onChange={(e) => handleInputChange('his', e.target.value)}
                    disabled={loading}
                  />
                </label>

                <label>
                  ADI
                  <input
                    type="number"
                    placeholder="-100 - 100 degrees"
                    value={data.adi}
                    onChange={(e) => handleInputChange('adi', e.target.value)}
                    disabled={loading}
                  />
                </label>

                <button className="send-button" type="button" onClick={sendData} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Data'}
                </button>
              </div>
            </div>
          </div>
        )}

        {message && <div className={`message ${messageType}`}>{message}</div>}
      </section>

      {viewMode === 'text' ? (
        <section className="panel data-display">
          <h2>Current Values</h2>
          <div className="data-grid">
            <div className="data-item">
              <span className="label">Altitude</span>
              <span className="value">{formatValue(data.altitude)} ft</span>
            </div>
            <div className="data-item">
              <span className="label">HIS</span>
              <span className="value">{formatValue(data.his)} deg</span>
            </div>
            <div className="data-item">
              <span className="label">ADI</span>
              <span className="value">{formatValue(data.adi)} deg</span>
            </div>
          </div>
        </section>
      ) : (
        <section className="panel visual-area">
          <h2>Visual Gauges</h2>
          <div className="gauge-grid">
            <div className="gauge-card">
              <span className="gauge-title">Altitude</span>
              <div className="altitude-gauge">
                <div className="altitude-fill" style={{ height: `${altitudePercent}%` }} />
              </div>
              <strong>{formatValue(data.altitude)} ft</strong>
            </div>

            <div className="gauge-card">
              <span className="gauge-title">HIS</span>
              <div className="compass">
                <span>N</span>
                <div className="needle" style={{ transform: `rotate(${hisNumber}deg)` }} />
              </div>
              <strong>{formatValue(data.his)} deg</strong>
            </div>

            <div className="gauge-card">
              <span className="gauge-title">ADI</span>
              <div className="adi-gauge">
                <div
                  className="horizon"
                  style={{
                    transform: `translateY(${adiMove}px) rotate(${adiNumber / 8}deg)`
                  }}
                />
                <div className="aircraft-line" />
              </div>
              <strong>{formatValue(data.adi)} deg</strong>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
