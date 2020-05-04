const jwt = require("jsonwebtoken");
const config= require("../config");

const db = require("../models");

const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message: "No token provided"})
    }

    jwt.verify(token, config.secret, (err, decoded)=> {
        if(error){
            return res.status(401).send({error: "UnAuthorizedd"})
        } 
    req.userId = decoded.id;
    next();
});
};

isAdmin = (req, res, next) => {
    User.findById(req, userId).exec((err, user)=> {
        if(err){
            res.status(500).send({message: err})
            return;
        }
        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles)=> {
                if(err){
                    res.status(500).send({message: err})
                    return;
                }
                for (let i=0; i<roles.length; i++){
                    if (roles[i].name === "admin"){
                        next();
                        return;
                    }
                }
            res.status(403).send({message: "Require admin role!"})
            return;  
            }
        );
    })
}

isTutor = (req, res, next)=> {
    User.findById(req, userId).exec((err, user)=> {
        if(err){
            res.status(500).send({message: err})
            return;
        }
        Role.find(
            {
                _id: {$in: user.roles}
            },
            (err, roles)=> {
                if(err){
                    res.status(500).send({message: err})
                    return;
                }
                for (let i=0; i<roles.length; i++){
                    if (roles[i].name === "tutor"){
                        next();
                        return;
                    }
                }
            res.status(403).send({message: "Require tutor role!"})
            return;  
            }
        );
    })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isTutor
};

module.exports = authJwt;