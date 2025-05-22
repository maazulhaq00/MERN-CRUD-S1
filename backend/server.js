// imports
// const express = require("express");
import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './config/connectToDb.js';
import productRouter from './routers/productRouter.js';
import categoryRouter from './routers/categoryRouter.js';
import cors from 'cors';

dotenv.config()


// create express app
const app = express();
app.use(express.json())
app.use(cors());

connectToDb();

app.use('/products', productRouter)
app.use('/categories', categoryRouter)

// start app / server
app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})


/*

npm init --y
npm install express
npm run dev
npm install dotenv

*/