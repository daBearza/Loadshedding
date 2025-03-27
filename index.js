import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const port = process.env.PORT;
const API_URL = "https://developer.sepush.co.za/business/2.0/";
const testParam = "&test=current";
// const testParam = "&test=future";
const api_key = process.env.API_KEY;
const location = process.env.LOCATION_ZONE;
const lat = process.env.LAT;
const lon = process.env.LON;

let loadSheddingData = null;
let stage = null;
let schedule = null
let scheduleDate = null;
let scheduleDay = null;

app.use(express.static("public"));

const fetchLoadSheddingStage = async () => {
    try {
        const response = await axios.get(API_URL + location + testParam, {
            headers: { 'token': api_key}
        });
        loadSheddingData = response.data;
        // lastDate = new Date();
        console.log('enents: ' + loadSheddingData.events[0].note);
        const event = response.data.events[0].note;
        // const event = null;

        console.log('event: ' + event);
        if(event !== null){
            stage = event.match(/\d+/);
            console.log('Hit this spot -->')
        } else {
            stage = 0;
        }
        scheduleDay = loadSheddingData.schedule.days[0].name;
        scheduleDate = loadSheddingData.schedule.days[0].date;
        schedule = loadSheddingData.schedule.days[0].stages
        console.log('stage: ' + stage);
        console.log('name: ' + scheduleDay);
        console.log('date: ' + scheduleDate);
        console.log('schedule: ' + schedule[stage -1]);
        // console.log('Updated load shedding data: ', loadSheddingData);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};
fetchLoadSheddingStage();


setInterval(fetchLoadSheddingStage, 30 * 60 * 1000);

app.get("/", async (req,res) => {
    try{
        console.log('--> ' + loadSheddingData);
        res.render("index.ejs")
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});