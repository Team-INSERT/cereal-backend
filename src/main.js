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
		credentials: true,
	},
})

app.use(cors())
app.use(express.json())
app.use(cookieParser())

// app.use('/api', controller)

// app.use((req, res, next) => {
// 	next(new NotFoundException())
// })

try {
	sequelize.sync({ force: false })
	console.log('DB Connect')
} catch (err) {
	console.error(err)
}

io.on('connection', (socket) => {
	socket.on('message', ({ name, message }) => {
		io.emit('message', { name, message })
		console.log(name, message)
	})
})

io.listen(8000)
app.listen(8081)
