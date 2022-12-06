const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');
const io = require('socket.io')(http);

const { sequelize } = require('../database/models');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json())

sequelize.sync({ force: false })
    .then(() => {
        console.log("DB Connect");
    })
    .catch((err) => {
        console.error(err);
    })

io.on('connection', socket => {
    console.log(socket.id, 'Connected');

    socket.emit('msg', `${socket.id} 연결 되었습니다.`);
    socket.on('msg', data => {
        console.log(socket.id, data);
        socket.emit('msg', `Server : "${data}" 받았습니다.`);
    });
});

app.listen(8000);