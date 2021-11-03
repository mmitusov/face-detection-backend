import Express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
// const register = require('./controllers/register.js')
import handleRegister from './controllers/register.js'
import Signin from './controllers/signin.js'
import profileId from './controllers/profile_id.js'
import {image, handleApiCall} from './controllers/image.js' //<--- Clarifai is moved to the backend from the frontend into image.js file

const db = knex({
  client: 'pg',
  connection: {
		connectionString: process.env.DATABASE_URL,
	  ssl: {
	    rejectUnauthorized: false
	  }
  }
});
const app = Express();
app.use(Express.json())
app.use(cors())

app.get('/', (req, res) => {res.json('Homepage is working!')})
app.post('/register', (req, res) => {handleRegister(req, res, bcrypt, db)});    //!!!<--- Using dependency injection and injecting whatever dependensies this function needs (we can see them all together). So so don't need to import "bcrypt & db" on signin.js page
app.post('/signin', Signin(bcrypt, db));                 //!!!<--- You can also declare function right away and then (req, res) will be called automaticly after (bcrypt, db)
app.get('/profile/:id', (req, res) => {profileId(req, res, db)});
app.put('/image', (req, res) => {image(req, res, db)});
app.post('/imageurl', (req, res) => {handleApiCall(req, res)}); //<--- We're fetching to this URL and passing function that runs within imaje.js file 


app.listen(process.env.PORT || 3001, () => {
	console.log(`App is running on port ${process.env.PORT}`)
})