const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const multer = require('multer');

const upload = multer({dest: './upload'})

app.use(bodyParser.text({type: 'text/xml'}));

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});
connection.connect();

app.get('/api/products', (req, res) => {
    connection.query(
        'SELECT * FROM PRODUCT WHERE isDeleted = 0',
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});


app.post('/api/products',upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO PRODUCT VALUES (null, ?, ?, ?, ?, ?, ?, ?, now(), 0, 0)';
    let cdkey = req.body.cdkey;
    let macaddress = req.body.macaddress;
    let username = req.body.username;
    let company = req.body.company;
    let email = req.body.email;
    let telephone = req.body.telephone;
    let memo = req.body.memo;
    let createData = req.body.createData;
    let status = req.body.status;
    let params = [cdkey, macaddress, username, company, email, telephone, memo, createData, status];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.delete('/api/products/:id', (req, res) => {
    let sql = 'UPDATE PRODUCT SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.put('/api/products/:id', (req, res) => {
    let sql = 'UPDATE PRODUCT SET status=IF(status=0, 1, 0) WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
});


app.listen(port, () => console.log(`Listening on port ${port}`));