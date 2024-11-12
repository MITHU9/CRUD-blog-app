const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Connect to the database
mongoose
  .connect(
    "mongodb+srv://kmmithu2015:Ge3F4QJYODi8A3fO@cluster0.8k5ey.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database");
    console.log(error);
  });
