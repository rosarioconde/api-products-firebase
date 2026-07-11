import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productsRouter from './src/routes/products.routes.js';
import authRouter from './src/routes/auth.routes.js';
import { errorHandler, notFoundHandler } from './src/middlewares/error.middleware.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.json({ message: 'API REST de productos funcionando' });
});

app.use('/api/products', productsRouter);
app.use('/auth', authRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

export default app;
