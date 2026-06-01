// מייבא את ספריית React ואת ה-hook useState מתוך הספרייה. React מאפשרת לנו ליצור רכיבים (Components) שמייצגים חלקים שונים של הממשק, ולנהל את מצב האפליקציה בצורה יעילה באמצעות hooks כמו useState ו-useEffect. ה-hook useState מאפשר לנו להוסיף מצב (state) לרכיב פונקציונלי, כך שנוכל לעקוב אחרי ערכים שמשתנים במהלך חיי הרכיב ולהפעיל רינדור מחדש כאשר הערכים האלה משתנים.
import React, { useEffect, useState } from 'react'; 
// מייבא את קובץ ה-CSS שמכיל את העיצובים והסגנונות של הרכיב App. קובץ זה יכול לכלול כללים לעיצוב הרכיבים, צבעים, גופנים, פריסות ועוד, כדי לשפר את המראה והחוויה של המשתמש כאשר הוא משתמש ברכיב App. על ידי ייבוא הקובץ הזה, כל הסגנונות המוגדרים בו יהיו זמינים לרכיב App ולכל רכיב אחר שנמצא תחתיו במבנה ההיררכי של הרכיבים.
import './App.css'; 

 // הגדרת הרכיב הראשי של האפליקציה בשם App. זהו רכיב פונקציונלי שמחזיר JSX, שהוא הסינטקס של React שמאפשר לנו לכתוב מבנה HTML בתוך JavaScript. בתוך הפונקציה הזו, אנחנו מגדירים את הלוגיקה והמבנה המרכזיים של האפליקציה שלנו, כולל ניהול מצב, טיפול באירועים, והצגת הממשק למשתמש.
function App() {  const [data, setData] = useState({altitude: '', his: '', adi: ''});
  const [viewMode, setViewMode] = useState('text');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [formOpen, setFormOpen] = useState(false);

  const altitudeNumber = parseFloat(data.altitude) || 0; // מנסה להמיר את הערך של data.altitude למספר עשרוני באמצעות parseFloat. אם הערך לא ניתן להמרה (למשל, אם הוא ריק או מכיל תווים שאינם מספריים), אז parseFloat יחזיר NaN, והביטוי כולו יחזיר 0 בגלל השימוש באופרטור ||. זה מבטיח ש-altitudeNumber יהיה תמיד מספר תקין, גם אם המשתמש לא הזין ערך או הזין ערך לא חוקי.
  const hisNumber = parseFloat(data.his) || 0; // מנסה להמיר את הערך של data.his למספר עשרוני באמצעות parseFloat. אם הערך לא ניתן להמרה (למשל, אם הוא ריק או מכיל תווים שאינם מספריים), אז parseFloat יחזיר NaN, והביטוי כולו יחזיר 0 בגלל השימוש באופרטור ||. זה מבטיח ש-hisNumber יהיה תמיד מספר תקין, גם אם המשתמש לא הזין ערך או הזין ערך לא חוקי.
  const adiNumber = parseFloat(data.adi) || 0; // מנסה להמיר את הערך של data.adi למספר עשרוני באמצעות parseFloat. אם הערך לא ניתן להמרה (למשל, אם הוא ריק או מכיל תווים שאינם מספריים), אז parseFloat יחזיר NaN, והביטוי כולו יחזיר 0 בגלל השימוש באופרטור ||. זה מבטיח ש-adiNumber יהיה תמיד מספר תקין, גם אם המשתמש לא הזין ערך או הזין ערך לא חוקי.

  const altitudePercent = Math.min((altitudeNumber / 3000) * 100, 100); // מחשב את האחוז של הגובה (altitude) מתוך 3000 על ידי חלוקת altitudeNumber ב-3000 והכפלת התוצאה ב-100. לאחר מכן, הוא משתמש בפונקציה Math.min כדי לוודא שהתוצאה לא תעלה על 100, כך שאם altitudeNumber גדול מ-3000, altitudePercent יהיה 100 ולא יותר. זה מאפשר לנו להציג את הגובה באחוזים בצורה נכונה גם כאשר הערך גבוה מהטווח המוגדר.
  const adiMove = Math.max(Math.min(adiNumber, 100), -100) / 2; // מחשב את התזוזה של ה-ADI על ידי הגבלת adiNumber לטווח בין -100 ל-100 באמצעות שימוש משולב ב-Math.min ו-Math.max, ואז מחלק את התוצאה ב-2 כדי לקבל את התזוזה הסופית. זה מבטיח ש-adiMove יהיה תמיד בטווח של -50 עד 50, מה שמתאים להצגה ויזואלית של ה-ADI בממשק המשתמש.

  const handleInputChange = (field, value) => { // פונקציה שמטפלת בשינויי הקלט של המשתמש. היא מקבלת את שם השדה (field) והערך החדש (value) שהמשתמש הזין, ואז מעדכנת את מצב הנתונים (data) על ידי יצירת אובייקט חדש שמכיל את כל הערכים הקודמים של data יחד עם הערך החדש עבור השדה המתאים. זה מאפשר לנו לעקוב אחרי השינויים שהמשתמש עושה בשדות הקלט ולשמור אותם במצב של הרכיב.
    setData({ ...data, [field]: value }); // יוצר אובייקט חדש שמכיל את כל הערכים הקודמים של data באמצעות הפיזור (...data), ומעדכן את הערך של השדה המתאים (field) עם הערך החדש (value) שהמשתמש הזין. זה מאפשר לנו לשמור את כל הנתונים הקודמים ולהוסיף או לעדכן רק את השדה שהשתנה, מבלי לאבד את שאר הנתונים.
  };

  useEffect(() => { // משתמש ב-hook useEffect כדי לבצע פעולה מסוימת כאשר הרכיב נטען לראשונה. במקרה הזה, הוא קורא לפונקציה getLatestData כדי לקבל את הנתונים העדכניים ביותר של הטיסה מהשרת ברגע שהרכיב מוצג לראשונה למשתמש. זה מאפשר לנו להציג את הנתונים העדכניים ביותר כבר מההתחלה, מבלי שהמשתמש יצטרך לבצע פעולה כלשהי כדי לקבל אותם.
    getLatestData();
  }, []); // הסוגריים הריקים ([]) מציינים ש-effect הזה צריך לרוץ רק פעם אחת, כאשר הרכיב נטען לראשונה. אם היינו משאירים את הסוגריים ריקים, ה-effect היה רץ בכל פעם שהרכיב מתעדכן, מה שעלול לגרום ללולאה אינסופית של קריאות לשרת. על ידי שימוש בסוגריים ריקים, אנחנו מבטיחים שה-effect ירוץ רק פעם אחת ויקבל את הנתונים העדכניים ביותר בתחילת חיי הרכיב.

  const showMessage = (text, type) => { // פונקציה שמציגה הודעה למשתמש. היא מקבלת את הטקסט של ההודעה (text) ואת סוג ההודעה (type), ומעדכנת את מצב ההודעה (message) ואת סוג ההודעה (messageType) בהתאם לערכים שנשלחו. זה מאפשר לנו להציג הודעות שונות למשתמש, כמו הודעות הצלחה או שגיאה, בהתאם לסיטואציה ולתוצאה של הפעולות שהוא מבצע באפליקציה.
    setMessage(text);
    setMessageType(type);
  };

  const openForm = () => {
    setMessage('');
    setMessageType('');
    setFormOpen(true);
  };

  const closeForm = () => {
    if (!loading) setFormOpen(false);
  };

  const validateData = () => { // פונקציה שמוודאת שהנתונים שהמשתמש הזין תקינים. היא מנסה להמיר את הערכים של altitude, his ו-adi למספרים עשרוניים, ואז בודקת אם הם נמצאים בטווחים הגיוניים עבור טיסה. אם אחד מהערכים לא תקין (למשל, אם הוא לא מספר או אם הוא מחוץ לטווח), הפונקציה מציגה הודעת שגיאה מתאימה ומחזירה false. אם כל הערכים תקינים, היא מחזירה true, מה שמאפשר להמשיך בתהליך שליחת הנתונים לשרת.
    const { altitude, his, adi } = data;
    const alt = parseFloat(altitude);
    const h = parseFloat(his);
    const a = parseFloat(adi);

    if (isNaN(alt) || isNaN(h) || isNaN(a)) { // בודק אם אחד מהערכים לא ניתן להמרה למספר (NaN). אם כן, זה אומר שהמשתמש לא הזין ערך חוקי בשדה כלשהו, ולכן הפונקציה מציגה הודעת שגיאה שמבקשת מהמשתמש למלא את כל השדות כראוי ומחזירה false כדי למנוע המשך התהליך.
      showMessage('Please fill all fields', 'error');
      return false;
    }
    if (alt < 0 || alt > 3000) { // בודק אם הערך של הגובה (alt) הוא מחוץ לטווח של 0 עד 3000. אם כן, זה אומר שהמשתמש הזין ערך לא חוקי עבור הגובה, ולכן הפונקציה מציגה הודעת שגיאה שמציינת שהגובה חייב להיות בין 0 ל-3000 ומחזירה false כדי למנוע המשך התהליך.
      showMessage('Altitude must be between 0 and 3000', 'error');
      return false;
    }
    if (h < 0 || h > 360) { // בודק אם הערך של כיוון הטיסה (his) הוא מחוץ לטווח של 0 עד 360. אם כן, זה אומר שהמשתמש הזין ערך לא חוקי עבור כיוון הטיסה, ולכן הפונקציה מציגה הודעת שגיאה שמציינת שכיוון הטיסה חייב להיות בין 0 ל-360 ומחזירה false כדי למנוע המשך התהליך.
      showMessage('HIS must be between 0 and 360', 'error');
      return false;
    }
    if (a < -100 || a > 100) { // בודק אם הערך של זווית הטיסה (adi) הוא מחוץ לטווח של -100 עד 100. אם כן, זה אומר שהמשתמש הזין ערך לא חוקי עבור זווית הטיסה, ולכן הפונקציה מציגה הודעת שגיאה שמציינת ש-ADI חייב להיות בין -100 ל-100 ומחזירה false כדי למנוע המשך התהליך.
      showMessage('ADI must be between -100 and 100', 'error');
      return false;
    }
    return true;
  };

  const getLatestData = async () => { // פונקציה אסינכרונית שמטפלת בקבלת הנתונים העדכניים ביותר של הטיסה מהשרת. היא מנסה לשלוח בקשת GET לכתובת 'http://localhost:5000/api/flightData/latest' כדי לקבל את הנתונים העדכניים ביותר, ואז מעדכנת את מצב הנתונים (data) עם התגובה שהתקבלה. אם יש שגיאה במהלך הבקשה או אם השרת מחזיר תגובה לא תקינה, היא מציגה הודעת שגיאה מתאימה.
    try {
      const response = await fetch('http://localhost:5000/api/flightData');
      const latestData = await response.json();
      setData(latestData);
    } catch (error) {
      showMessage('failed to fetch latest data', 'error');
    }
  };

  const sendData = async () => { // פונקציה אסינכרונית שמטפלת בשליחת הנתונים שהמשתמש הזין לשרת. היא קודם כל בודקת אם הנתונים תקינים באמצעות הפונקציה validateData, ואם לא הם תקינים היא מחזירה מיד כדי למנוע המשך התהליך. אם הנתונים תקינים, היא מעדכנת את מצב הטעינה (loading) ל-true ומנקה את ההודעה הקודמת. לאחר מכן, היא מנסה לשלוח בקשת POST לכתובת 'http://localhost:5000/api/flightData' עם הנתונים בפורמט JSON. אם הבקשה מצליחה, היא מציגה הודעת הצלחה ומנקה את השדות. אם הבקשה נכשלת או שיש שגיאה בשרת, היא מציגה הודעת שגיאה מתאימה. בסופו של דבר, היא מעדכנת את מצב הטעינה ל-false כדי לאפשר למשתמש לבצע פעולות נוספות.
    if (!validateData()) return;

    setLoading(true);
    showMessage('', '');

    try { // מנסה לבצע את הקוד שבתוך הבלוק הזה, ואם יש שגיאה כלשהי במהלך הביצוע, הוא יתפוס את השגיאה ויטפל בה בבלוק ה-catch שמתחתיו. זה מאפשר לנו לנהל שגיאות בצורה מסודרת ולמנוע קריסות של האפליקציה כאשר משהו משתבש במהלך הביצוע של הקוד.
      const response = await fetch('http://localhost:5000/api/flightData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          altitude: altitudeNumber,
          his: hisNumber,
          adi: adiNumber
        })
      });

      if (response.ok) { // בודק אם הבקשה מצליחה (response.ok === true). אם כן, זה אומר שהנתונים נשלחו בהצלחה לשרת, ולכן הפונקציה מציגה הודעת הצלחה ומנקה את השדות.
        showMessage('Data sent successfully', 'success');
        setData({ altitude: '', his: '', adi: '' });
        setFormOpen(false);
      } else {
        showMessage('failed to send data', 'error');
      }
    } catch (error) {
      showMessage('ferver error: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return ( // מחזיר את ה-JSX שמייצג את מבנה הממשק של האפליקציה. ה-JSX כולל אלמנטים שונים כמו כותרות, שדות קלט, כפתורים, והצגת נתונים בצורה טקסטואלית או ויזואלית בהתאם למצב viewMode. הוא גם מציג הודעות למשתמש בהתאם לפעולות שהוא מבצע, ומאפשר לו להזין נתונים ולשלוח אותם לשרת.
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
              className={viewMode === 'text' ? 'active' : ''}
              onClick={() => setViewMode('text')}
            >
              Text
            </button>
            <button
              className={viewMode === 'visual' ? 'active' : ''}
              onClick={() => setViewMode('visual')}
            >
              Visual
            </button>
          </div>
        </div>

        {!formOpen && (
          <button
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
          <div
            onClick={closeForm}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              padding: '24px',
              background: 'rgba(15, 23, 42, 0.55)',
              backdropFilter: 'blur(4px)',
              zIndex: 20
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(760px, 100%)',
                padding: '24px',
                background: 'white',
                borderRadius: '14px',
                boxShadow: '0 28px 80px rgba(15, 23, 42, 0.3)'
              }}
            >
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
                  onClick={closeForm}
                  disabled={loading}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 0,
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '28px',
                    lineHeight: 1,
                    background: '#edf2f7',
                    color: '#172033',
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  ×
                </button>
              </div>

              <div className="input-section" style={{ gridTemplateColumns: '1fr 1fr 1fr auto' }}>
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

                <button className="send-button" onClick={sendData} disabled={loading}>
                  {loading ? 'Sending...' : 'Send Data'}
                </button>
              </div>
            </div>
          </div>
        )}

        {message && <div className={`message ${messageType}`}>{message}</div>}
      </section>

      {viewMode === 'text' ? ( // אם מצב התצוגה (viewMode) הוא 'text', אז מציגים את הנתונים בצורה טקסטואלית פשוטה. זה כולל כותרת "Current Values" ורשת של נתונים שמציגה את הערכים של הגובה (altitude), כיוון הטיסה (HIS), וזווית הטיסה (ADI) עם תוויות מתאימות. אם אחד מהערכים לא זמין, הוא יוצג כ-" - " כדי להראות שהנתון לא הוזן או לא זמין.  אם מצב התצוגה הוא 'visual', אז מציגים את הנתונים בצורה ויזואלית עם מדדים גרפיים שמייצגים את הגובה, כיוון הטיסה, וזווית הטיסה בצורה אינטואיטיבית יותר.
        <section className="panel data-display">
          <h2>Current Values</h2>
          <div className="data-grid">
            <div className="data-item">
              <span className="label">Altitude</span>
              <span className="value">{data.altitude || '-'} ft</span>  
            </div>
            <div className="data-item">
              <span className="label">HIS</span>
              <span className="value">{data.his || '-'} deg</span>
            </div>
            <div className="data-item">
              <span className="label">ADI</span>
              <span className="value">{data.adi || '-'} deg</span>
            </div>
          </div>
        </section>
      ) : ( // אם מצב התצוגה (viewMode) הוא 'visual', אז מציגים את הנתונים בצורה ויזואלית עם מדדים גרפיים שמייצגים את הגובה, כיוון הטיסה, וזווית הטיסה בצורה אינטואיטיבית יותר. זה כולל מד גובה שממלא בהתאם לאחוז הגובה מתוך 3000, מצפן שמסתובב בהתאם לכיוון הטיסה (HIS), ומד ADI שמציג את זווית הטיסה בצורה גרפית עם תזוזה ונטייה בהתאם לערכים שהמשתמש הזין.
        <section className="panel visual-area">
          <h2>Visual Gauges</h2>
          <div className="gauge-grid">
            <div className="gauge-card">
              <span className="gauge-title">Altitude</span>
              <div className="altitude-gauge">
                <div className="altitude-fill" style={{ height: `${altitudePercent}%` }} />
              </div>
              <strong>{data.altitude || '-'} ft</strong>
            </div>

            <div className="gauge-card">
              <span className="gauge-title">HIS</span>
              <div className="compass">
                <span>N</span>
                <div className="needle" style={{ transform: `rotate(${hisNumber}deg)` }} />
              </div>
              <strong>{data.his || '-'} deg</strong>
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
              <strong>{data.adi || '-'} deg</strong>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App; // מייצא את הרכיב App כדי שניתן יהיה לייבא אותו ולהשתמש בו בקבצים אחרים של האפליקציה. זה מאפשר לנו להשתמש ברכיב App כנקודת הכניסה הראשית של האפליקציה שלנו, ולהציג אותו בתוך ה-root element של ה-HTML כדי להראות את הממשק למשתמש.
