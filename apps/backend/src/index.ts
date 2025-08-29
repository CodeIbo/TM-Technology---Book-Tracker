import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.disable('x-powered-by');

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`API on http://localhost:${port}`));
