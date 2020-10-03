const mongoose = require("mongose");

async function connect(){
    await mongoose.connect(`mongodb+srv://${process.env.API_USERNAME}:${process.env.API_KEY}@cluster0.lfwrb.mongodb.net/${process.env.APINAME}?retryWrites=true&w=majority`)
}