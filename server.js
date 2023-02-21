// Import required modules
require('dotenv').config()
const express = require("express");
const path = require("path");
const Pool = require('pg').Pool
const app = express();

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    keepAlive:true,
})
// Use EJS as template engine
app.set("view engine", "ejs");

// Adding static resources
app.use(express.static(path.join(__dirname, "static")));

// Home route
app.get("/", (req, res) => {
    pool.query('SELECT * from country', (err, response) => {
        if(err) throw err;
        const rows = response.rows
        console.log('The data from users table are: \n', rows.length);
        res.render('index', { data: rows });
    });
});

app.get('/search', async (req, res) => {
    console.log(req.query.q);
    const search_string = req.query.q;
    pool.query(`SELECT * from country where name LIKE '%${search_string}%'`, (err, response) => {
        if(err) throw err;
        const rows = response.rows
        console.log('The data from users table are: \n', rows.length);
        if(rows.length === 0){
            res.render('nodata', { message: `No data matching ${search_string}` })
        }
        else{
            res.render('index', { data: rows });
        }
    });
})

// Listen to server
app.listen(3000, () => {
    console.log("connected to server");
});
