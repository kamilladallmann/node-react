const mongoose = require('mongoose');

//mongoose.connect('mongodb://kamilladallmann:admin19*@ds051740.mlab.com:51740/nodeback', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/nodeback', {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;

