import Express from 'express'

const app = Express();

app.use(Express.json())

const database = {
	users: [
			{
				id: '123',
				name: 'John',
				email: 'gohn@gmail.com',
				password: 'cookies',
				entries: 0,
				joined:	new Date()	
			},
			{
				id: '12345',
				name: 'Sally',
				email: 'sally@gmail.com',
				password: 'cookies1',
				entries: 0,
				joined:	new Date()	
			}
	]}


app.get('/', (req, res) => {
	res.json(database.users)
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json('Done!')
	} else {
		res.status(400).json('Error ocured')
	}
})

app.post('/register', (req, res) => {
	const { name, email, password } = req.body;
	database.users.push({
		id: '1235',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined:	new Date()	
	})
	res.json(database.users[database.users.length -1])
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

app.listen(3000, () => {
	console.log('App is running')
})