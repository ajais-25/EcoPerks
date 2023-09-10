//jshint esversion:6
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const { collection, collection2,collection3,collection4 } = require("./mongodb");
//const datePicked = require("../public/scripts/book-slot");
//const confirm = require("../public/scripts/book-slot");
//const dateSelected = require("../public/scripts/book-slot");

const templatePath = path.join(__dirname, "../templates");

app.use(express.static("public")); //to load css files and images

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home-page");
});
app.get("/recycle", (req, res) => {
  res.render("recycle");
});
app.get("/rewards", (req, res) => {
  res.render("rewards");
});
app.get("/picksignin", (req, res) => {
  res.render("pickup-signin");
});

app.get("/pickdetails", (req, res) => {
  res.render("pickup-details");
});
app.get("/notification", (req, res) => {
  res.render("notifications");
});

app.get("/profile", (req, res) => {
  res.render("MyProfile");
});
app.get("/home", (req, res) => {
  res.render("recycle");
});

app.get("/slotbooking", (req, res) => {
  res.render("slotbooking");
});

app.get("/signup", (req, res) => {
  res.render("sign-up");
});

app.get("/signin", async (req, res) => {
  res.render("sign-in");
});

app.post("/rewards",async (req, res) => {
  const number=await collection4.findOne({})
});

app.post("/picksignin", async (req, res) => {
  const { loginid, password } = req.body;
  try {
    const exsistingUser = await collection3.findOne({ loginid: loginid });
    if (!exsistingUser) {
      return res.status(404).json({ msg: "partner not found" });
    }
    const matchPassword = exsistingUser.password===password
    if (!matchPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.redirect('/pickdetails');
  } catch (error) {
    console.log(error);
  }
});

app.post("/pickdetails", async (req, res) => {
  const { name,quantity,tier, pin,token} = req.body;
  try {
    const token1 = await collection2.findOne({ token: token });
    const valid=true;
    if(!token1){
   valid===false
    }

    res.render("notifications",{
      token1:`Please clickon rewards Button to claim your rewards of ${quantity}kg  Tier ${tier}`,
      published:valid
    })
    
    if (!token1) {
      return res.status(404).json({ msg: "Invalid token" });
    }
    
  } catch (error) {
    console.log(error);
  }
});


app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password, password2 } = req.body;
  try {
    const exsistingUser = await collection.findOne({ email: email });
    if (exsistingUser) {
      return res.status(400).json({ message: "User already exsist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await collection.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });

    res.render("sign-in");
  } catch (error) {
    console.log(error);
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const exsistingUser = await collection.findOne({ email: email });
    if (!exsistingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const matchPassword = await bcrypt.compare(
      password,
      exsistingUser.password
    );
    if (!matchPassword) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.redirect("/recycle");
  } catch (error) {
    console.log(error);
  }
});

app.post("/slotbooking", async (req, res) => {
  const { name, address, pin, contact } = req.body;
  const dateSelected = req.body.date;
  console.log(name, address, pin, contact, dateSelected);
  const token=Date.now();
  const valid=true;
  try {
    await collection2.create({
      name: name,
      address: address,
      pin: pin,
      number: contact,
      date: dateSelected,
      token: token,
    });

if(!token){
  valid===false
}

    res.render("notifications",{
      token1 : `Hey ${name} this is your ${token} Order Id , Kindly Share it with your pickup patrner on this  ${dateSelected} day to claim your reward`,
      published : valid
    })

  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("port connected at http://localhost:3000");
});
