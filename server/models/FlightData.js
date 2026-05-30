const mongoose = require('mongoose'); // מייבא את ספריית Mongoose, שמאפשרת לנו להגדיר מודלים (Schemas) עבור הנתונים שלנו ולתקשר עם בסיס הנתונים MongoDB בצורה נוחה ופשוטה יותר.

const FlightSchema = new mongoose.Schema({ // יוצר סכימה חדשה בשם FlightSchema, שמגדירה את המבנה של מסמך הטיסה בבסיס הנתונים. הסכימה כוללת שלושה שדות: altitude, his ו-adi, שכל אחד מהם הוא מספר (Number) ונדרש (required: true).
  altitude: { type: Number, required: true }, // שדה שמייצג את הגובה של הטיסה, מסוג מספר ונדרש.
  his: { type: Number, required: true }, // שדה שמייצג את כיוון הטיסה (Heading in degrees), מסוג מספר ונדרש.
  adi: { type: Number, required: true }  // שדה שמייצג את זווית הטיסה (Attitude Indicator), מסוג מספר ונדרש.
});

module.exports = mongoose.model('FlightData', FlightSchema); // מייצא את המודל שנוצר על בסיס הסכימה FlightSchema, כך שניתן יהיה להשתמש בו בקבצים אחרים של השרת כדי ליצור, לקרוא, לעדכן או למחוק נתוני טיסה בבסיס הנתונים. המודל נקרא 'FlightData', והוא ישמש כנקודת גישה לנתוני הטיסה בבסיס הנתונים MongoDB.