# מוניטור מכווני טיסה

פרויקט Full Stack פשוט שמציג נתוני טיסה בדפדפן ושומר אותם בשרת.

## מה הפרויקט עושה?

המשתמש מכניס שלושה נתונים:

- `Altitude` - גובה, בין `0` ל-`3000`.
- `HIS` - כיוון במעלות, בין `0` ל-`360`.
- `ADI` - זווית/מצב המטוס, בין `-100` ל-`100`.

React מציג את הנתונים במסך ושולח אותם לשרת.
השרת בודק שהנתונים תקינים ושומר אותם ב-MongoDB.

## התקנה ראשונה

אם זו פעם ראשונה שמריצים את הפרויקט:

```powershell
npm run install-all
```

## איך מריצים?

בתוך התיקייה-server יש קובץ `env.example.txt` מומלץ להפוך אותו ל-`.env` ובתוכו יש את הפורטים והקישור לDB

מתוך התיקייה הראשית של הפרויקט:

```powershell
npm run dev
```

זה מריץ ביחד:

- צד לקוח: `http://localhost:3000`
- צד שרת: `http://localhost:5000`

צריך להשאיר את ה-terminal פתוח בזמן שמשתמשים באפליקציה.

## מבנה הפרויקט

```text
shachar_b
+-- package.json
+-- package-lock.json
+-- README.md
+-- flight-monitor-client
|   +-- package.json
|   +-- package-lock.json
|   +-- public
|   |   +-- index.html
|   +-- src
|       +-- index.js
|       +-- index.css
|       +-- App.js
|       +-- App.css
+-- server
    +-- package.json
    +-- package-lock.json
    +-- server.js
    +-- config
    |   +-- db.js
    +-- models
    |   +-- FlightData.js
    +-- routes
    |   +-- flightRoutes.js
    +-- controllers
        +-- flightController.js
```

## קבצים חשובים

### `flight-monitor-client/src/App.js`

הקובץ הראשי של React.

הוא אחראי על:

- שמירת הנתונים שהמשתמש מקליד.
- בדיקה שהערכים בטווח הנכון.
- שליחת הנתונים לשרת.
- הצגת הנתונים כטקסט או בצורה ויזואלית.

### `flight-monitor-client/src/App.css`

קובץ העיצוב של המסך.

### `server/server.js`

הקובץ שמפעיל את השרת.

הוא אחראי על:

- יצירת שרת Express.
- חיבור ל-MongoDB.
- הפעלת ה-routes.
- פתיחת השרת על פורט `5000`.

### `server/routes/flightRoutes.js`

מגדיר את כתובות ה-API:

```js
router.post('/api/flightData', createFlightData);
router.get('/api/flightData', getLatestFlightData);
```

### `server/controllers/flightController.js`

מכיל את הפעולות שהשרת עושה:

- שמירת נתון חדש.
- החזרת הנתון האחרון.
- בדיקה שהנתונים תקינים.

### `server/models/FlightData.js`

מגדיר איך הנתון נשמר ב-MongoDB:

```js
altitude: Number
his: Number
adi: Number
```

## API

### בדיקה שהשרת עובד

```http
GET http://localhost:5000
```

מחזיר:

```text
Node.js server is working
```

### שליחת נתונים לשרת

```http
POST http://localhost:5000/api/flightData
```

דוגמה:

```json
{
  "altitude": 1000,
  "his": 90,
  "adi": 10
}
```

### קבלת הנתון האחרון

```http
GET http://localhost:5000/api/flightData
```

## תקלות נפוצות

### ERR_CONNECTION_REFUSED

המשמעות היא שה-frontend עובד, אבל השרת לא רץ.

פתרון:

```powershell
npm run dev
```

### MongoDB לא מתחבר

צריך לוודא ש-MongoDB רץ במחשב.

ברירת המחדל היא:

```text
mongodb://localhost:27017/flightMonitor
```

אפשר לשים קובץ `.env` בתוך תיקיית `server`:

```env
MONGO_URI=mongodb://localhost:27017/flightMonitor
PORT=5000
```

## הסבר קצר בעל פה

אפשר להסביר את הפרויקט כך:

> בניתי אפליקציה פשוטה של React ו-Node.js. המשתמש מכניס נתוני טיסה בטופס. React שומר את הערכים עם `useState`, בודק שהם תקינים, ואז שולח אותם לשרת עם `fetch`. השרת מקבל את הנתונים דרך Express, בודק אותם שוב, ושומר אותם ב-MongoDB בעזרת Mongoose.

## פקודות

```powershell
npm run dev
```

מריץ את כל הפרויקט.

```powershell
npm run client
```

מריץ רק את React.

```powershell
npm run server
```

מריץ רק את השרת.

```powershell
npm --prefix flight-monitor-client run build
```

בודק שה-frontend נבנה בלי שגיאות.
