const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

const app = express();
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const server = http.createServer(app).listen(80, () => {
  console.log('Server is running on port 80');
});


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'web'
});

var sessionStore = new MySQLStore(connection);

app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

// read - 세부 페이지
app.get('/', function (req, res) {
	res.sendfile("main.html")
});

// read - 세부 페이지
app.get('/index', function (req, res) {
	res.sendfile("index.html")
});


app.get('/api/getNickname', function (req, res) {
  const savedNickname = req.session.nickname;
  console.log("savedNickname: api ", savedNickname);
  const results = { nickname: savedNickname };
  res.json(results);
});

// insert - 인서트 저장 쿼리
app.post('/insert', function (req, res) {
  console.log("insert");
  const nickname = req.body.nickname;
console.log(nickname);
	let query = `INSERT INTO user
							(nickname)
							VALUES
							('${nickname}')`;
              console.log(query);

    connection.query(query, function (error, results, fields) {
	  if (error) throw error
    req.session.nickname = nickname;  // 닉네임 값을 추가
     req.session.save(function () {
       const savedNickname = req.session.nickname;
       console.log("저장된 닉네임app:", savedNickname);

     });
     const savedNickname = req.session.nickname;

     console.log("저장된 닉네임app2:", savedNickname);

     res.send(results);

	});
});

app.post('/api/sendScore', (req, res) => {
  const data = req.body;

  const nickname = data.nickname;
  const score = data.score;

  console.log(`Received data - Nickname: ${nickname}, Score: ${score}`);

  let query =  `UPDATE user
                 SET score = ${score}
                 WHERE nickname = '${nickname}';`;
              console.log(query);

    connection.query(query, function (error, results, fields) {
	  if (error) throw error
    res.send(results);
	});
  res.status(200).json({ success: true, text: 'Data received' });
});
