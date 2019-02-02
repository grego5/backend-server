const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const signKey = process.env.SESSION_SECRET;

exports.isLoggedIn = async function(req, res, next){
   const error = {
      status: 401,
      message: 'Please login first'
   };

   try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, signKey);
      if (decoded)  return next();
      else throw error;
   } catch(err) {
      console.log(`middleware/auth.js: ${err.message}`);
      next(error);
   }
}

exports.isAuthorized = async function(req, res, next){
   const error = {
      status: 401,
      message: 'Request is not authorized'
   };

   try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, signKey);
      if (decoded && decoded.id === req.params.id) return next();
      else throw error;
   } catch(err) {
      console.log(`middleware/auth.js: ${err.message}`);
      next(error);
   }
}

module.exports = exports;