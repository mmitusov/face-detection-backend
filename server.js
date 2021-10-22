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

db.select('*').from('users').then(console.log);

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
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {//one id from database and one from req
			found = true;
			return res.json(user)
		} 
	})
	if (!found) {
		res.status(404).json(`Can't be found`)
	}
}) 

app.put('/image', (req, res) => {
	const { id } = req.body; // takes info from the json's body
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {//one id from database and one from req
			found = true;
			user.entries ++
			return res.json(user.entries)
		} 
	})
	if (!found) {
		res.status(404).json(`Can't be found`)
	}
})


// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });


app.listen(3001, () => {
	console.log('App is running')
})