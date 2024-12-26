// import connectDb from "./db/index.js";

const { connectDb } = require("./db/db.js");
const { app } = require("./app.js");

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log("MONGODB CONNECTION FAILED. ", err));
