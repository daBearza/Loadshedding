import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
require('dotenv').config();

const app = express();
const port = 3000;
const API_URL = "https://developer.sepush.co.za/business/2.0/"
const api_key = process.env.API_KEY;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});