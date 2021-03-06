const express = require("express");
const bodyParser = require("body-parser"); //every express
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js")
const image = require("./controllers/image.js")
const imageurl = require("./controllers/image.js")

const db = knex({
  client: 'pg',
  connection: {
  	host: process.env.DATABASE_URL,
    ssl: true,
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {res.send('it is working!')});
app.post("/signin", (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get("/profile/:id", (req, res) => { profile.handleProfile(req, res, db)});
app.put("/image", (req, res) => { image.handleImage(req, res, db)});
app.put("/imageurl", (req, res) => { image.handleApiCall(req, res,)});

app.listen( process.env.PORT || 3000, () => {
	console.log("app is running!!!");
});


//transactions: Multiple operations to prevent
//one thing work but not ther other (&& Operator)

// bcrypt.hash(password, null, null, function(err, hash) {
// 		console.log(hash);
// 	});

// Anytime we send passwords
// We use POST, not a query string
// Because then people can see
//signin --> POST: sucess/fail
//register --> POST: create user
//profile/:userID --> GET = user
//image --> PUT: replace user score
