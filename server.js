const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image'); //<--- Clarifai is moved to the backend from the frontend into image.js file
//We don't need "import {image, handleApiCall} from './controllers/image.js'", since via "const image = require('./controllers/image');" we can use "image.handleApiCall(req, res)"

const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

app.get('/', (req, res)=> {res.json('Homepage is working!')})
app.post('/signin', signin.handleSignin(db, bcrypt)) //!!!<--- We can also declare function right away and then (req, res) will be called automaticly after (bcrypt, db)
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) //!!!<--- Using dependency injection we're injecting whatever dependensies this function needs. So we don't need to add/import "bcrypt & db" on signin.js page
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)}) 
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)}) //<--- We're fetching to this URL and passing function that runs within imaje.js file 

app.listen(process.env.PORT || 3001, () => {
  console.log(`App is running on port ${process.env.PORT}`);
})