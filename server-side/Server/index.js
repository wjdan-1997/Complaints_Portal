
const express = require('express');
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const modelRouter = require('../routes/router')
const app = express();
dotenv.config({ path: '.env' })
const PORT = process.env.PORT;

// connect to mongodb

mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true },(err)=>{
    if (err){
       return console.log("Wejdan Error in connction",err);
    }
    console.log("Wejdan mongodb connected ");
})    

// setup server
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin:'http://localhost:3005'
}))
app.use(bodyParser.json())
app.use('/', modelRouter)

app.listen(PORT, () => {
    console.log(`complaint management portal listen on port!${PORT}`);
});
