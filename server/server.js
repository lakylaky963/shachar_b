require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const flightRoutes = require('./routes/flightRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // מאפשר לבקשת הדפדפן להגיע לשרת בלי בעיית CORS
app.use(express.json()); // קורא את גוף הבקשות כ-JSON
app.use('/', flightRoutes); // כל הנתיבים של טיסות מוגדרים ב-flightRoutes
app.get('/', (_req, res) => res.send('Node.js server is working'));

async function startServer() {
  // קודם מחברים למסד, אחר כך מאזינים לפורט
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
