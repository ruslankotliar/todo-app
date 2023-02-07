import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import AppRouter from './routes';
import connectDB from './config/database';
import { errorHandler } from './middlewares/index';

const app = express();
const router = new AppRouter(app);
// Connect to MongoDB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.use(errorHandler);

router.init();

const port = app.get('port');
// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;
