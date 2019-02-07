try { require('dotenv').config();} 
catch(err) { console.log(err.message);};

const PORT = process.env.PORT;
const IP = process.env.IP;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const { isLoggedIn, isAuthorized } = require('./middleware/auth');
const db = require('./models');

app.use(bodyParser.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/user/:id/post', isLoggedIn, isAuthorized, postRoutes);

app.get('/api/posts', isLoggedIn, async function(req, res, next){
	try {
		const posts = await db.Post.find()
			.sort({ createdAt: 'desc' })
			.populate('user', {
				username: true,
				image: true
			});
		if (posts.length === 0) throw {message: `There are no posts to display`};
		return res.status(200).json(posts);
	} catch(err) {
		console.log(err);
		next(err);
	}
});

app.use(function(req, res, next){
	let err = new Error('Not found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(PORT, IP, function(){
	console.log(`Server listening for requests on ${IP}:${PORT}`)
})