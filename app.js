const express = require("express"),
const mongoose = require("mongoose"),
const User = require("./models/User");
const app = express();
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/mongoose-hooks",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err, success) => {
    if (err) console.log(err.message);
    console.log("Mongo db connected !!");
  }
);

// *NEW USER ROUTE
app.post("/register", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ success: true, message: "User saved successfuly!!" });
  } catch (e) {
    return res.status(400).json({ success: false, messge: e.message });
  }
});

app.listen(3000, () => console.log("Server listening on port : ", 3000));
