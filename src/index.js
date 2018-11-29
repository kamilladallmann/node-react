const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const porta = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/uploads', express.static('uploads'));
require('./controllers/authController')(app);
require('./controllers/photoController')(app);


app.listen(porta);

//app.listen(3000);