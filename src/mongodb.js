const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const logInSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const slotInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});
const pickInSchema = new mongoose.Schema({
  loginid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const  rewardSchema= new mongoose.Schema({
 name: {
    type: String,
    required: true,
  },
 number: {
    type: String,
    required: true,
  },
});


const collection = new mongoose.model("LogInCollection", logInSchema);
const collection2 = new mongoose.model("SlotCollection", slotInSchema);
const collection3=new mongoose.model("pickpartnerCollections",pickInSchema);
const collection4=new mongoose.model("rewardsCollection",rewardSchema);

module.exports = {
  collection: collection,
  collection2: collection2,
  collection3 : collection3,
  collection4:collection4
};
