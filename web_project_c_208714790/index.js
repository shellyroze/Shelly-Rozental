const express = require("express");
const bodyParser = require("body-parser");
const path = require ('path');
const sql = require('./db/db');
const CreateDB = require('./db/CreateDB');
const app = express();
const CRUD = require('./db/CRUD');
const fs = require('fs');
const stringify = require('csv-stringify').stringify;
const { parse } = require("csv-parse");
const CSVToJSON = require('csvtojson');
const { render } = require('pug');
app.use(express.json());

// parse requests of contenttype: application/json
//app.use(bodyParser.json());

// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));


// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/CreateTicketTable',CreateDB.CreateTicketTable);
app.get("/InsertTicketData", CreateDB.InsertTicketData);
app.get('/ShowTable', CreateDB.ShowTable);
app.get('/ShowTableT', CreateDB.ShowTableT);
app.get('/DropTicketTable', CreateDB.DropTicketTable);
app.get('/CreateUserTable',CreateDB.CreateUserTable);
app.get("/InsertUserData", CreateDB.InsertUserData);
app.get('/DropUserTable', CreateDB.DropUserTable);

// simple route
app.get("/", (req, res) => {
   res.render("insert");
    // res.send("hi mysql + pug");
});

app.get("/insert", (req, res) => {
    res.render("insert");
     // res.send("hi mysql + pug");
 });

app.get("/Signin", (req, res) => {
    res.render("Signin");
     // res.send("hi mysql + pug");
 });
 app.get("/Login", (req, res) => {
    res.render("Login");
     // res.send("hi mysql + pug");
 });
 app.get("/TicketBrowser", (req, res) => {
    res.render("TicketBrowser");
     // res.send("hi mysql + pug");
 });

 app.get("/SelectAll", (req, res) => {
    res.render("SelectAll");
     // res.send("hi mysql + pug");
 });

app.post('/insertUser',CRUD.insertUser);

app.get('/selectAll',(req,res)=>{
res.render('selectAll');
});
app.post('/ShowTickets',CRUD.ShowTickets);
app.post('/checkUser',CRUD.checkUser);

app.get('/ShowAllStud',CRUD.showAllStud);
// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});