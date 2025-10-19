import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

app.get('/', (req, res) => {
    res.send('Hello, Geeks!');
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});