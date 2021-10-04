import Express from 'express'

const app = Express();

app.use(Express.urlencoded({extended: false}));
app.use(Express.json());

app.get('/', (req, res) => {
	res.send(`It's working!`)
})

app.get('/profileeeee', (req, res) => {
	res.send(`Profile`)
})

app.post('/profile', (req, res) => {
	console.log(req.body)
	const user = {
		size: 'massive',
		sara: `love's to feel size inside`,
		hobby: 'sucking'
	}
	res.send(user);
})

app.listen(3000);





// import http from 'http'

// const server = http.createServer((req, res) => {
// 	console.log('headers', req.headers)
// 	console.log('method', req.method)
// 	console.log('url', req.url)
// 	const object = {
// 		Jonny: 'scating',
// 		Sandy: 'riding Jonny'
// 	}


// 	res.setHeader('Content-Type', 'application/json');
// 	res.end(JSON.stringify(object));
// })

// server.listen(3000)