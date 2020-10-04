const mongoose = require("mongoose");

async function connect(){
    console.log(process.env.API_USERNAME);
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.API_USERNAME}:${process.env.API_KEY}@cluster0.lfwrb.mongodb.net/${process.env.APINAME}?retryWrites=true&w=majority`,
            { useNewUrlParser: true }
        );
    } catch (err) {
        console.error("Error connecting to mongodb");
        console.error(err);
    }
}

module.exports = { connect }