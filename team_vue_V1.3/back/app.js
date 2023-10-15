const express = require('express')
const app = express()
const cors = require("cors");
const path = require('path');
//import path from 'path'
const bodyParser = require("body-parser");
//import bodyParser from 'body-parser'

const mysql = require('mysql');
let connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'asd123',
  database:'testjwt2'
});

app.use(cors());
app.use(express.static("."));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }))
//app.use(logger('dev'))

app.post('/api/account', (req, res) => {
    console.log(req.body.nickname);
    const nickname = req.body.nickname;
    console.log(nickname);
    res.send(nickname);
    console.log(nickname);
})

app.delete('/api/account', (req, res) => {
    res.sendStatus(200);
})

//================
// configuration =========================​
app.post('/sendScore', (req, res) => {
  const data = req.body;

  const nickname = data.nickname;
  let score = Number(data.score);

  console.log(`Received data - Nickname: ${nickname}, Score: ${score}`);

                 let query = `INSERT INTO snake
                             (nickname, score)
                             VALUES
                             ('${nickname}', ${score})`;
              console.log(query);

    connection.query(query, function (error, results, fields) {
	  if (error) throw error
    res.status(200).json({ success: true, text: 'Data received' });
	});
});

app.set('port', process.env.PORT || 3001);

app.use( '/', express.static( path.join(__dirname, './dist') ));

app.get('/', function (req,res) {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));

  let query = `CREATE TABLE IF NOT EXISTS sudokuscore(
    nickname varchar(50),
    timescore varchar(100)
  )
  `
  connection.query(query, (err, results, fields) => {
    if(err) console.log(err)
  })
});

app.put('/inputsudokuscore', function (req ,res) {
    //console.log('this')
    let nickname = req.body.nickname;
    let timer = req.body.timer;
    //console.log(nickname)
    //console.log(timer)
    let query = `INSERT INTO sudokuscore VALUES('${nickname}', '${timer}')`
    connection.query(query, (err, results, fields) => {
        if (err) {
            console.log(err)
            res.send('err')
        }
        res.send('okay')
    })
})
app.get('/api/snake', function (req, res) {
  let num = req.query.findDetail;
  connection.query(`SELECT user, score from snake;`,
    function(error, result, fields){
      if (error) throw error;
      else {
        res.json(result); // JSON 형식으로 결과를 클라이언트로 보냄
        console.log(result);
      }
    });
});
app.get('/api/sudoku', function (req, res) {
  let num = req.query.findDetail;
  connection.query(`SELECT nickname, timescore from sudokuscore;`,
    function(error, result, fields){
      if (error) throw error;
      else {
        res.json(result); // JSON 형식으로 결과를 클라이언트로 보냄
        console.log(result);
      }
    });
});


const app2 = require('express')()
const http = require('http').createServer(app2)
app2.use(cors())
app2.use(bodyParser.json())
app2.use(express.urlencoded({ extended: false }))
const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000',
    //   methods:["GET","POST"],
        credentials: true,
      // if you want to run locally, please remove comment below

      // origin: 'http://localhost:8080',
    },
  })

  let users = []
  let messages = []

io.on('connection', (socket) => {
    socket.emit('initChat', {
      messages: messages,
    })

    socket.username = 'Anonymous'

    //listen on Change Username

    socket.on('enterUsername', (user) => {
        console.log(user)
      socket.username = user.username
      users.push({ id: socket.id, username: socket.username })
      updateUsernames()
      io.emit('userConnected', socket.username)
      console.log(`${socket.username} user connected`)
    })

    // Update Usernames on client side

    const updateUsernames = () => {
      io.emit('getUsers', users)
    }
    socket.on('newMessage', (data) => {
      const now = new Date()
      let message = {
        message: data.message,
        username: socket.username,
        date: now.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        userId: socket.id,
      }
      messages.push(message)
      io.emit('newMessage', message)
    })

    socket.on('isTyping', () => {
      socket.broadcast.emit('isTyping', socket.username)
      console.log(socket.username)
    })
    socket.on('stopTyping', (data) => {
      socket.broadcast.emit('stopTyping', data)
    })

    socket.on('deleteOne', (data, err) => {
    //   Msg.deleteOne({ _id: data._id })
    //   if (err) throw err
    })


    socket.on('disconnect', () => {
      io.emit('userDisconnected', socket.username)

      users = users.filter(function (user) {
        return user.id != socket.id
      })

      // Update the users list

      updateUsernames()
      console.log(`${socket.username} has leaved`)
    })
  })
  http.listen(3000, () => {
    console.log(3000+'open <- socket chat')
})
