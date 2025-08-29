import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import apiRouter from '@/api/router';
import corsOptions from '@/config/cors-options';

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.disable('x-powered-by');

app.use('/api', apiRouter);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`API on http://localhost:${port}`));
