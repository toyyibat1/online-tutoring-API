const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('./models/user')

const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const subjectRoutes = require('./routes/subject');
const lessonRoutes = require('./routes/lesson');

const app = express();
var auth = require('./routes/auth.routes')
var user= require('./routes/user.routes')
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

 
mongoose
 .connect('mongodb://localhost:27017/tutoring', 
 { useNewUrlParser: true, useUnifiedTopology: true }
)
 .then(() => {
  console.log('Connected to the Database successfully');
  app.listen(3000);
  initial();
})
.catch(err => console.log(err));

function initial (){
  Role.estimatedDocumentCount((err, count)=>{
    if(!err && count === 0){
      new Role ({
        name: "student"
      }).save(err => {
        if(err){
          console.log("error", err);
        }
        console.log("added user to role collection")
      });
    new Role ({
      name: "tutor"
    }).save(err => {
      if(err){
        console.log("error", err);
      }
      console.log("added tutor to role collection")
    });
    new Role ({
      name: "admin"
    }).save(err => {
      if(err){
        console.log("error", err);
      }
      console.log("added admin to role collection")
    });
  }
  });
}

auth(app);
user(app);

// app.use(async (req, res, next) => {
//   if (req.headers["x-access-token"]) {
//    const accessToken = req.headers["x-access-token"];
//    const { userId, exp } = await jwt.verify(accessToken, "SOME_RANDOM_SECRET");
//    // Check if token has expired
//    if (exp < Date.now().valueOf() / 1000) {
//     return res.status(401).json({
//      error: "JWT token has expired, please login to obtain a new one"
//     });
//    }
//    res.locals.loggedInUser = await User.findById(userId);
//    next();
//   } else {
//    next();
//   }
// });




// app.use('/api/v1', userRoutes);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', subjectRoutes);
app.use('/api/v1', lessonRoutes);



