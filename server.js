// Import required modules
const express = require("express");
const path = require("path");
const mysql = require("mysql")
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'world'
});

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL Server!');
// });

// Use EJS as template engine
app.set("view engine", "ejs");

// Adding static resources
app.use(express.static(path.join(__dirname, "static")));

// Home route
app.get("/", async (req, res) => {
    await connection.query('SELECT * from country LIMIT 50', (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows.length);
        res.render('index', { data: rows });
    });
});

// Listen to server
app.listen(3000, () => {
    console.log("connected to server");
});
