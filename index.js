import app from './app.js';
import { PORT } from './config/index.js';
import connectDB from './db.js';

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});