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


app.listen(3000, () => {
	console.log('App is running')
})