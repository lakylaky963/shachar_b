const express = require('express'); // מייבא את ספריית Express, המשמשת כבסיס לבניית השרת, ניהול נתיבים (Routes) ופונקציות ביניים (Middleware).
const { createFlightData, getLatestFlightData } = require('../controllers/flightController'); // מייבא את הפונקציות createFlightData ו-getLatestFlightData מתוך קובץ ה-controller של הטיסות, שמכיל את הלוגיקה לטיפול בבקשות הקשורות לטיסות (כמו יצירת נתוני טיסה חדשים או קבלת הנתונים העדכניים ביותר).

const router = express.Router(); // יוצר מופע של Express Router, שמאפשר להגדיר נתיבים (Routes) בצורה מודולרית ונקייה יותר. במקום להגדיר את כל הנתיבים בקובץ הראשי של השרת, אנחנו יכולים להגדיר אותם כאן בקובץ נפרד ולהשתמש בהם בשרת הראשי.

router.post('/api/flightData', createFlightData); // מגדיר נתיב POST לכתובת /api/flightData, כך שכאשר מגיעה בקשה מסוג POST לכתובת זו, הפונקציה createFlightData תופעל ותטפל בבקשה. זה משמש ליצירת נתוני טיסה חדשים בבסיס הנתונים.
router.get('/api/flightData', getLatestFlightData); // מגדיר נתיב GET לכתובת /api/flightData, כך שכאשר מגיעה בקשה מסוג GET לכתובת זו, הפונקציה getLatestFlightData תופעל ותטפל בבקשה. זה משמש לקבלת הנתונים העדכניים ביותר של הטיסה מתוך בסיס הנתונים.

module.exports = router; // מייצא את ה-router שנוצר, כך שניתן יהיה לייבא אותו ולהשתמש בו בקובץ הראשי של השרת (server.js). זה מאפשר לארגן את הקוד בצורה מודולרית ונקייה יותר, כאשר כל הפונקציות והנתיבים הקשורים לטיסות נמצאים בקובץ נפרד.
