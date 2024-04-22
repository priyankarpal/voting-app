import bodyParser from 'body-parser';
import express from 'express';
import connectDb from './src/db/connection.js';
import { default as candidateRoutes, default as userRoutes } from './src/routes/routes.js';

const app=express();

// connect mongo
connectDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(process.env.PORT, () =>
  console.log(`server is running on ${process.env.PORT} `)
);
