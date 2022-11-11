var SQL = require('./db')
const path = require('path');
const csv=require('csvtojson');


const CreateUserTable = (req,res)=> {
    var Q1 = "CREATE TABLE users (email VARCHAR(255), password VARCHAR(255))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table');
        res.send("table created");
        return;
    })      
}

const CreateTicketTable = (req,res)=> {
    var Q1 = "CREATE TABLE tickets (name VARCHAR(255), category VARCHAR(255),location VARCHAR(255), date VARCHAR(255),price int, contact VARCHAR(255))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created tickets table');
        res.send("tickets table created");
        return;
    })      
}

const InsertUserData = (req,res)=>{
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "user.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "email": element.email,
            "password": element.password
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};

const InsertTicketData = (req,res)=>{
    var Q2 = "INSERT INTO tickets SET ?";
    const csvFilePath= path.join(__dirname, "ticket.csv");
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
    console.log(jsonObj);
    jsonObj.forEach(element => {
        var NewEntry = {
            "name": element.name,
            "category": element.category,
            "location": element.location,
            "date": element.date,
            "price": element.price,
            "contact": element.contact
        }
        SQL.query(Q2, NewEntry, (err,mysqlres)=>{
            if (err) {
                console.log("error in inserting data", err);
            }
            console.log("created row sucssefuly ");
        });
    });
    })
    res.send("data read");
};
 
const ShowTable = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing table");
        res.send(mySQLres);
        return;
    })};

    const ShowTableT = (req,res)=>{
        var Q3 = "SELECT * FROM tickets";
        SQL.query(Q3, (err, mySQLres)=>{
            if (err) {
                console.log("error in showing table ", err);
                res.send("error in showing table ");
                return;
            }
            console.log("showing table");
            res.send(mySQLres);
            return;
        })};

const DropUserTable = (req, res)=>{
    var Q4 = "DROP TABLE users";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}

const DropTicketTable = (req, res)=>{
    var Q4 = "DROP TABLE tickets";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        }
        console.log("table drpped");
        res.send("table drpped");
        return;
    })
}


module.exports = {CreateTicketTable, CreateUserTable, InsertUserData, InsertTicketData, ShowTable, ShowTableT, DropUserTable, DropTicketTable};

