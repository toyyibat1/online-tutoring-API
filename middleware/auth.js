const jwt = require('jsonwebtoken');
const User = require('../models/user')

 
async function authenticate(req, res, next) {
  if (req.headers["x-access-token"]) {
   const accessToken = req.headers["x-access-token"];
   const role = req.params;
   const { userId, exp } = await jwt.verify(accessToken, "SOME_RANDOM_SECRET", role );
   
   // Check if token has expired
   if (exp < Date.now().valueOf() / 1000) { 
    return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
   } 
   res.locals.loggedInUser = await User.findById(userId); next(); 
  } else { 
   next(); 
  } 
 }


// users hardcoded for simplicity, store in a db for production applications
// const User = [];

module.exports = {
    authenticate,
    getAll,
    getById, 
    authorize
};

// async function authenticate({ username, password }) {
//     const user = users.find(u => u.username === username && u.password === password);
//     if (user) {
//         const token = jwt.sign({ sub: user.id, role: user.role }, "SOME_RANDON_SECRET");
//         const { password, ...userWithoutPassword } = user;
//         return {
//             ...userWithoutPassword,
//             token
//         };
//     }
// }

async function getAll() {
    return User.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = User.find(u => u.id === parseInt(id));
    if (!user) return;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

// const expressJwt = require('');


function authorize(role = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof role === 'string') {
        role = [role];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        "SOME_RANDOM_SECRET",

        // authorize based on user role
        (req, res, next) => {
            if (role.length && !role.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}