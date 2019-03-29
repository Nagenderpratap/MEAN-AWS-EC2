var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var api = require('./routes/book');
// var cors = require('cors');



// ------------ Allows cross-origin domains to access this API ---------------
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin' , 'http://localhost:4000');
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     res.append('Access-Control-Allow-Credentials', true);
//     next();
// });


// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false' }));
app.use(express.static(path.join(__dirname, 'dist/netree')));
// app.use (cors({origin : 'http://localhost:4000'}));
app.use('/api', api);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname,'dist/netree/index.html'));
});

const port = process.env.PORT || '4000';
app.set('port',port);

const server = http.createServer(app);
server.listen(port, () => console.log('running on localhost :  $ ' + port));

module.exports = app;
