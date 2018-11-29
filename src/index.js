const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const indexRouter = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/uploads', express.static('uploads'));
app.use(cors());
require('./controllers/index')(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/auth/register', function (req, res){
    res.render("register");
});

app.get('/auth/login', function (req, res){
    res.render("login");
});

app.post('/auth/login', function(req, res){
    res.redirect("/photos");
});

app.get('/photos', function(req, res){
    res.render("list");
    res.send(photos);
});

app.post('/photos', function(req, res){
    res.render("create");
})




//app.use('/', indexRouter);
//var porta = process.env.PORT || 8080;
//app.listen(porta);

app.listen(4000);