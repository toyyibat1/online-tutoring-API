const express = require('express');
const router = express.Router();
const {verifySignUp} = require("../middleware")
const controller = require('../controllers/auth.controller');

module.exports = function(app){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-type,Accept"
     );
        next();
    });
    app.post('/signup', [verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRoleExisted], controller.signup
    );
    app.post("/signin", controller.signin);
};

