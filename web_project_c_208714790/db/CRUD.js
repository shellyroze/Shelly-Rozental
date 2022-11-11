const { response } = require("express");
const sql = require("./db.js");

const insertUser= function(req,res){
    let email = req.body.Email;
    let passward = req.body.Password;
    let repassward = req.body.rePassword;
    let FirstName = req.body.First;
    let LastName = req.body.Last;
    if(passward.localeCompare(repassward)==0){
        if (FirstName.length > 1 && LastName.length > 1){
            const Q2 = "SELECT * FROM Users WHERE email like '"+email+"'";
            sql.query(Q2, (err,mysqlres)=>{
                if(err){
                    console.log("error: ", err);
                    res.status(400).send({message: "error in creating customer: " + err});
                    return; 
                }
                console.log(mysqlres.length);
                if(mysqlres.length >= 1){
                    res.render('Signin',{var1:"This Email is already exists! please try again :)"});
                    return;
                }else{
                    const NewStudent = {
                        "Email": req.body.Email,
                        "Password": req.body.Password
                    };
                    const Q1 = "INSERT INTO users SET ?";  
                    sql.query(Q1, NewStudent, (err, mysqlres) => {
                        if (err) {
                            res.status(400).send({message: "error in creating customer: " + err});
                            return;
                        }
                        console.log("created customer!");
                        res.render('Login',{var1:"You are signed in, Please log in"});
                        return;
                   });
                }
                });
        }else{
                res.render('Signin',{var1:"invalid name! please try again :)"});
                return;
        }
    }else{
        res.render('Signin',{var1:"invalid password! please try again :)"});
        return;
    }
    // Validate request
if (!req.body) {
    res.status(400).send({
    message: "Content can not be empty!"
    });
    return;
}};

const checkUser= function(req,res){
    let email = req.body.email;
    let password = req.body.password;
    const Q2 = "SELECT * FROM Users WHERE password LIKE ? AND email LIKE ?";
    sql.query(Q2,[password, email] ,(err,mysqlres)=>{
        if(err){
            console.log("error: ", err);
            res.status(400).send({message: "error in creating customer: " + err});
            return; 
        }
        if(mysqlres.length >= 1){
           res.render('TicketBrowser',{var1:"Welcome Back! You're logged in :)"});
           return;
        }else{
            res.render('Login',{var1:"Wrong Email/Password, Please try Again"});
            return; 
        }
        });    
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
}};



const showAllStud = (req, res)=>{
    const name = 'helly'
    const Q2 = "SELECT * FROM Students WHERE name like '"+name+"'";
    sql.query(Q2, (err,mysqlres)=>{
        if(err){
            console.log("error: ", err);
            res.status(400).send({message: "error in creating customer: " + err});
            return; 
        }
        console.log("got all Students...");
        //res.send(mysqlres);
        res.render('results', {
            var1:"All students Table",
            Students: mysqlres
        });
        return;
    });
};

const ShowTickets = (req, res)=>{
    const category = req.body.Category;
    const Locatio = req.body.location;
    let min = req.body.min;
    let max = req.body.max;
    console.log(parseFloat(max) < parseFloat(min));
    console.log(min > max);
    console.log(min);
    console.log(max);
     if (parseInt(max) < parseInt(min)){     
        res.render('TicketBrowser',{var1:"Please fix the price range"});
        return;
    }else{
        console.log(category);
        const Q44 = "SELECT * FROM tickets WHERE category LIKE '"+category+"' AND location LIKE '"+Locatio+"' HAVING price > '"+min+"' AND price < '"+max+"'";
        sql.query(Q44, (err,mysqlres)=>{
            if(err){
                console.log("error: ", err);
                res.status(400).send({message: "error in creating customer: " + err});
                return; 
            }
            console.log("got all tickets...");
            //res.send(mysqlres);
            res.render('results', {
                var1:"Results:",
                Tickets: mysqlres
            });
            return;
        });
    }

};
module.exports = {insertUser, showAllStud,ShowTickets, checkUser};