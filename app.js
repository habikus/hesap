var express=require('express')

var app=express()

var bodyparser=require('body-parser')

var session=require('express-session')

var expressLayouts = require('express-ejs-layouts');

var path = require('path');

var mysql = require('mysql');

var fs = require('fs');


var MySQLStore = require('express-mysql-session')(session);


const port = process.env.PORT || 5500 ;

 
app.use(require('body-parser').urlencoded({ extended: true}));

app.use(require('body-parser').json());

 

var yol = '/hesap'





const options = {   // setting connection options

        host     : "localhost",   
        user     : "sefkatokullari_hesap", 
        password : "of.616161",
        database : "sefkatokullari_hesap",
        timezone : 'utc' 
};



const con = mysql.createConnection(options);

const sessionStore = new MySQLStore({}, con);



app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);



//app.set('views', path.join(__dirname, './kuran/views'));

//app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

app.set('views', './views');





app.get(yol,function(req,res){

  res.render('index')

})



app.get(yol+"/hakkimizda",function(req,res){

  res.render('hakkimizda')

})



app.post(yol+"/cariYukle", function (req, res) {

    var data = req.body;

    var sql = 'SELECT * FROM ckart';

    con.query(sql, function (err, results) {

        if (!err) {

            data = results;

            res.json(data);

        }

    });

});



app.post(yol+"/fatYukle", function (req, res) {

    var data = req.body;

    var sql = 'SELECT * FROM fatura WHERE FISNO < 20';

    con.query(sql, function (err, results) {

        if (!err) {

            data = results;

            res.json(data);

        }

    });

});





app.post(yol+"/fatAyrintiYukle", function (req, res) {

    var gelen = req.body;

    var sql = 'SELECT * FROM fathareket WHERE FISNO = '+ mysql.escape(gelen.fisno);

    con.query(sql, function (err, results) {

        if (!err) {

            data = results;

            res.json(data);

        }

    });

});



app.use(function(req, res, next) {

    res.status(404).render("bulunamadi");

});



app.listen(port, () => {

    console.log("Örnek uygulama dinleniyor inşallah." + port);

  })