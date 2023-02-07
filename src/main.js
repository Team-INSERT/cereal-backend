require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const { sequelize } = require('../database/models')
const models = require('../database/models')

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
	sequelize.sync({ force: true })
	console.log('DB Connect')
} catch (err) {
	console.error(err)
}

let waitingRoom

io.on('connection', (socket) => {
	const req = socket.request

	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
	console.log(`new client connected ip ${ip}, socket id : ${socket.id}, date : ${new Date()}`)

	socket.on('join', async (data) => {
		if (!waitingRoom) {
			const room = await models.room.create()
			waitingRoom = room.dataValues.roomId
			socket.join(waitingRoom)
			socket.emit('join', {
				wait: true,
			})
		} else {
			socket.join(waitingRoom)
			if(io.sockets.adapter.rooms.get(waitingRoom).size === 1){
				socket.emit('join', {
					wait: true,
				})
			}else{
				io.to(waitingRoom).emit('join', {
					roomId: waitingRoom,
					start: true,
				})
				waitingRoom = null
			}


		}
	})

	socket.on('disconnect', () => {
		console.log(`client disconnected ip ${ip}, socket id : ${socket.id}, date : ${new Date()}`)
	})

	socket.on('error', (error) => {
		console.error(error)
	})

	socket.emit('count', io.engine.clientsCount)

	socket.on('message', (data) => {
		const date = new Date()
		date.setHours(date.getHours() + 9)
		console.log(data)
		io.to(data.roomId).emit('message', {
			socketId: socket.id,
			message: data.message,
			date: date,
		})
	})
})

server.listen(8081)
