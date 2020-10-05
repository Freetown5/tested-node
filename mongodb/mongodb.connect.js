require('dotenv').config();
const mongoose = require("mongoose");

async function connect(){
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.API_USERNAME}:${process.env.API_KEY}@cluster0.lfwrb.mongodb.net/${process.env.API_APPNAME}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err);
    }
}

module.exports = { connect }