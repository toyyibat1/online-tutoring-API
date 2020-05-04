// const User = require('../models/user');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { roles } = require('./role');

// exports.signUp = (req, res, next) => {
//   const {username, email, password, role} = req.body;
//   if(!email || !password) {
//      res.status(400).send({
//         status: false,
//         message: "All fields are required"
// })
//  return;
// }
// User.findOne({ email })
//     .then(user => {
//       if (user) {
//         return res
//           .status(423)
//           .send({status: false, message: "This email already exists"});
//     };
//   bcrypt
//     .hash(password, 12)
//     .then(password => {
//       let user = new User({
//         username,
//         email,
//         password,
//         role: role || 'student'
//       });
//       return user.save();
//     })
//     .then(() => res.json({
//       data: user,
//       accessToken
//      }))
//     .catch(err => console.log(err));
// })};

// exports.logIn = (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   User.findOne({email})
//     .then(user => {
//       if (!user) {
//         return res
//           .status(404)
//           .send("User not found, please provide valid credentials");
//       }
//       bcrypt.compare(password, user.password).then(valid => {
//         if (!valid) {
//           return res
//             .status(403)
//             .send(
//               "Incorrect username or password, please review details and try again"
//             );
//         }
//         const token = jwt.sign(
//           { email: user.email, _id: user._id, role: user.role },
//           "SOME_RANDOM_SECRET",
//           { expiresIn: "1d" }
//         );
//         res.status(200).json({
//           _id: user._id,
//           token
//         });
//       });
//     })
//     .catch(err => console.log(err)); 
//     }

 
//     exports.getUsers = async (req, res, next) => {
//       const users = await User.find({});
//       res.status(200).json({
//        data: users
//       });
//      }
      
//      exports.getUser = async (req, res, next) => {
//       try {
//        const userId = req.params.userId;
//        const user = await User.findById(userId);
//        if (!user) return next(new Error('User does not exist'));
//         res.status(200).json({
//         data: user
//        });
//       } catch (error) {
//        next(error)
//       }
//      }
      
//      exports.updateUser = async (req, res, next) => {
//       try {
//        const update = req.body
//        const userId = req.params.userId;
//        await User.findByIdAndUpdate(userId, update);
//        const user = await User.findById(userId)
//        res.status(200).json({
//         data: user,
//         message: 'User has been updated'
//        });
//       } catch (error) {
//        next(error)
//       }
//      }
      
//      exports.deleteUser = async (req, res, next) => {
//       try {
//        const userId = req.params.userId;
//        await User.findByIdAndDelete(userId);
//        res.status(200).json({
//         data: null,
//         message: 'User has been deleted'
//        });
//       } catch (error) {
//        next(error)
//       }
//      }
  
// exports.grantAccess = function(action, resource) {
//  return async (req, res, next) => {
//   try {
//    const permission = roles.can(req.user.role)[action](resource);
//    if (!permission.granted) {
//     return res.status(401).json({
//      error: "You don't have enough permission to perform this action"
//     });
//    }
//    next()
//   } catch (error) {
//    next(error)
//   }
//  }
// }
 
// exports.allowIfLoggedin = async (req, res, next) => {
//  try {
//   const user = res.locals.loggedInUser;
//   if (!user)
//    return res.status(401).json({
//     error: "You need to be logged in to access this route"
//    });
//    req.user = user;
//    next();
//   } catch (error) {
//    next(error);
//   }
// }