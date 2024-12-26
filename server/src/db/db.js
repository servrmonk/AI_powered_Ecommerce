const mongoose = require("mongoose");
const { DB_NAME } = require("../utils/constants");

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDb connected !! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("Mongodb connection error ", err);
    process.exit(1);
  }
};

module.exports = { connectDb };
