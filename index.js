try { require('dotenv').config();} 
catch(err) { console.log(err.message);};

const PORT = process.env.PORT;
const IP = process.env.IP;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');

app.use(bodyParser.json());

// routes
app.use('/api/auth', authRoutes);

app.use(function(req, res, next){
	let err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(PORT, IP, function(){
	console.log(`Server listening for requests on ${IP}:${PORT}`)
})