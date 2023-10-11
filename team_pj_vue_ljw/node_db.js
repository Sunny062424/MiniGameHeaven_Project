const express = require('express');

const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'testuser',
    password:'password1',
    database:'testdbp'
})

connection.connect();


const app = express();

app.listen(9090, function() {
    console.log('sever start')
})

app.put('/testa', function (req ,res) {
    let nickname = req.query.nickname;
    let timer = req.query.timer;

    let query = `INSERT INTO TETABLE1 VALUES('${nickname}', '${timer}')`
    connection.query(query, (err, row) => {
        if (err) console.log(err)
    })
})