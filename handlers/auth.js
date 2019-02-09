const db = require('../models');
const jwt = require('jsonwebtoken');
const signKey = process.env.SESSION_SECRET;

exports.signin = async function(req, res, next){
   error = {
      status: 400,
      message: 'Invalid email or password'
   };

   try{
      const {email, password} = req.body;
      const user = await db.User.findOne({email});
      if (!user) throw error;
      const {id, username, image} = user;
      const isMatch = await user.checkPassword(password);

      if (isMatch) {
         const token = jwt.sign({
            id, username, image
         }, signKey);
         return res.status(200).json({token})
      } else {
         return next(error);
      }
   } catch(err){
      console.log(err);
      return next(error);
   };
};

exports.signup = async function(req, res, next){
   try {
      const user = await db.User.create(req.body);
      const {id, username, image} = user;
      const token = jwt.sign({
         id, username, image
      }, signKey);
      return res.status(200).json({token})
   } catch(err){
      if (err.code === 11000){
         err.message = "Username or emmail is already taken"
      }
      return next({
         status: 400,
         message: err.message
      });
   };
};