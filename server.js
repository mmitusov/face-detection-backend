import Express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'
// const register = require('./controllers/register.js')
import handleRegister from './controllers/register.js'
import Signin from './controllers/signin.js'
import profileId from './controllers/profile_id.js'
import image from './controllers/image.js'

const db = knex({
  client: 'pg',
  connection: {
		host : '127.0.0.1',
		user : 'postgres',
		password : 'test',
		database : 'face_recognition'
  },
});
const app = Express();
app.use(Express.json())
app.use(cors())

// app.get('/', (req, res) => {res.json(database.users)})
app.post('/register', (req, res) => {handleRegister(req, res, bcrypt, db)}); //<--- Using dependency injection and injecting whatever dependensies this function needs
app.post('/signin', (req, res) => {Signin(req, res, bcrypt, db)});
app.get('/profile/:id', (req, res) => {profileId(req, res, db)});
app.put('/image', (req, res) => {image(req, res, db)});


app.listen(3001, () => {
	console.log('App is running')
})