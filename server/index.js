import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import clientRoutes from './routes/clientRoutes.js';
import salesRoutes from './routes/salesRoutes.js';
import managementRoutes from './routes/managementRoutes.js';
import generalRoutes from './routes/generalRoutes.js';

// configuratioon
dotenv.config();

const app = express();

app.use(express.json());

app.use(helmet());
// make cross origin sharign request
app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin',
  })
);

app.use(morgan('common'));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

// ROUTES

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

// mangoose setup

const PORT = process.env.PORT || 9000;

// removing console error message from console
mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
  })
  .catch((err) => {
    console.log(err, 'error');
  });
