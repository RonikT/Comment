const mysql = require('mysql'); //
function getConnection(){
    var con = mysql.createConnection({
        host : "localhost",
        user:"root",
        password: "",
        database:"comments"
    });
    return con;
}

module.exports.getConnection = getConnection;

//making a function called get connection
//make variable called con
//call mysql.createconnectiin
//to this machine, using this username and password, connecting it to this database
//return variable. to call other methods with this variable

//calling the module getconnection with the same function