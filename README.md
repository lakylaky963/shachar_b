# מוניטור מכווני טיסה

פרויקט פשוט ב-React ו-Node.js שמציג נתוני טיסה בדפדפן ושומר אותם בשרת.

## על מה זה

האפליקציה מקבלת שלושה ערכי טיסה מהמשתמש:

- `Altitude` – גובה בין `0` ל-`3000`
- `HIS` – כיוון במעלות בין `0` ל-`360`
- `ADI` – זווית מצב בין `-100` ל-`100`

הנתונים מוצגים בממשק React ונשלחים לשרת Express. השרת בודק את התקינות ושומר את הנתונים ב-MongoDB.

## למה זה שימושי

זו תשתית פשוטה שמראה איך לחבר:

- ממשק משתמש ב-React
- שרת API ב-Express
- בסיס נתונים MongoDB

## איך מריצים

במסוף הראשי של הפרויקט:

```powershell
npm run install-all
npm run dev
```

זה מפעיל שני דברים יחד:

- לקוח: `http://localhost:3000`
- שרת: `http://localhost:5000`

אם רוצים להריץ כל צד לבד:

```powershell
npm --prefix server start
npm --prefix flight-monitor-client start
```

## קבצים עיקריים

### `flight-monitor-client/src/App.js`

כאן קורה כל מה שקשור ללקוח:

- שמירת קלט המשתמש
- בדיקת טווחים
- קריאה ל-API
- הצגה של ערכי הטיסה

### `server/server.js`

פותח את השרת ומחבר:

- Express
- CORS
- JSON body parser
- מסד נתונים
- נתיבי API מהקובץ `flightRoutes.js`

### `server/routes/flightRoutes.js`

מגדיר את נקודות הקצה:

```js
router.post('/api/flightData', createFlightData);
router.get('/api/flightData', getLatestFlightData);
```

### `server/controllers/flightController.js`

מטפל בבקשות:

- `POST` ליצירת נתון חדש
- `GET` לקבלת הנתון האחרון

### `server/models/FlightData.js`

מגדיר את מסמך הטיסה ב-MongoDB עם השדות:

- `altitude`
- `his`
- `adi`

## קובץ סביבה

בתיקיית `server` יש `env.example.txt`.

מה לעשות:

1. לשכפל את הקובץ ל-`.env`
2. להוסיף את כתובת ה-MongoDB
3. לוודא שהפורט הוא `5000`

## בדיקות מהירות

### בדקו אם השרת עובד

```http
GET http://localhost:5000
```

### קבלת הנתון האחרון

```http
GET http://localhost:5000/api/flightData
```

### שליחת נתון חדש

```http
POST http://localhost:5000/api/flightData
```

דוגמה ל-json:

```json
{
  "altitude": 1000,
  "his": 90,
  "adi": 10
}
```

## בעיות נפוצות

- אם הלקוח מקבל `404` על `/api/flightData`, תוודא שהשרת רץ על `5000`
- אם השרת לא עולה, תבדוק את קובץ `server/.env`
- אם MongoDB לא מתחבר, תוודא שהוא רץ ושה-URI תקין

## למה זה חשוב

הפרויקט הזה נותן בסיס טוב לפרויקט Full Stack שבו:

- הפרונטאנד שולח נתונים לשרת
- השרת מאמת ושומר אותם
- אפשר להרחיב בקלות פונקציות נוספות בעתיד
