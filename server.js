import Express from 'express'
import bcrypt from 'bcrypt-nodejs'
import cors from 'cors'
import knex from 'knex'

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


app.get('/', (req, res) => {
	res.json(database.users)
})

app.post('/signin', (req, res) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);			
			if (isValid) {
				db.select('*').from('users')
				.where('email', '=', req.body.email)
				.then(user => {
					res.json(user[0])
				})
				.catch(err => res.status(400).json('Err'))
			} else {
				res.status('400').json('wrong credentials')
			}			
		})
		.catch(err => res.status(400).json('Err'))
})

app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
					trx('users')	
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date()
					}).returning('*')
					.then(user => {
						res.json(user[0])
					})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Err ocured'))
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params; // takes info from the поисковой строки
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) { //one id from database and one from req
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})


app.put('/image', (req, res) => {
	const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
})


app.listen(3001, () => {
	console.log('App is running')
})