const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "email is required !!"],
    unique: true,
    validate: {
      validator: (email) => {
        const pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        return pattern.test(email);
      },
      message: (props) => `${props.value} is not in correct format !!`,
    },
  },
  phone: {
    type: String,
    required: [true, "Phone number is required !"],
    validate: {
      validator: (v) => {
        return v.length == 10;
      },
      message: (props) => props.value + " Must be 10 digits !",
    },
  },
  password: {
    type: String,
    required: [true, "wheres the password buddy !"],
    minLength: [6, "isnt is too short !!"],
  },
});

User.pre("save", async function (next) {
  let { password } = this;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  next();
});

module.exports = mongoose.model("user", User);
