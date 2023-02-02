require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const { sequelize } = require('../database/models')


const app = express()
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

 app.use((req, res, next) => {
	 res.send('404')
})

try {
	sequelize.sync({ force: false })
	console.log('DB Connect')
} catch (err) {
	console.error(err)
}
io.on('connection', (socket) => {
	socket.on('message', (message) => {
		console.log(message)
	})
})

server.listen(8081)
