const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongoose connection successfull!")
}).catch((err) => {
    console.log(err.message)
});

