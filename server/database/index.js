const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectToDatabase = () => {
  try {
    const { DB_URI } = process.env;
    mongoose.connect(`${DB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((data)=>{console.log(`Mongodb connected with server: ${data.connection.host}`)})
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectToDatabase;

