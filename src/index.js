const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/uploads', express.static('uploads'));
app.use(cors());
require('./controllers/index')(app);

var porta = process.env.PORT || 8080;
app.listen(porta);

//app.listen(4000);