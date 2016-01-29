var path = require('path');
var express = require('express');
var cors = require('cors');
var app = express();

app.options('*', cors({credentials: true, origin: true}));
app.use(cors({credentials: true, origin: true}));

app.use('/', express.static(path.join(__dirname, '../dist/')));

var server = app.listen(9000, function () {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
