const dotenv = require('dotenv')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

dotenv.config()

const { sequelize } = require('../database/models')
const { NotFoundException } = require('./global/exception')

const app = express()
const controller = require('./domain/controller')
const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// app.use('/api', controller)

// app.use((req, res, next) => {
// 	next(new NotFoundException())
// })

sequelize
	.sync({ force: false })
	.then(() => {
		console.log('DB Connect')
	})
	.catch((err) => {
		console.error(err)
	})

io.on('connection', (socket) => {
	console.log('New client connected')

	socket.on('disconnect', () => console.log('user disconnect', socket.id))

	socket.on('good', (data) => {
		console.log(data) // 클라이언트 -> 서버
	})

	setInterval(() => {
		socket.emit('hi', '서버 -> 클라이언트')
	}, 3000)
})

app.listen(8081)
