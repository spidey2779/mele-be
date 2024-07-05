const mongoose = require("mongoose");
require('dotenv').config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DBCONNECT);
        console.log("Database connected ✅");
    } catch (error) {
        console.error("ERROR in connecting!", error);
    }
};

module.exports = connectToDB;
