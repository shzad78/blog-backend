const JWT = require("jsonwebtoken");
require("dotenv").config(
    { path: __dirname + "/../.env" }
  );
  
  
  const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

function createToken(user) {
     const token = JWT.sign({ user }, SECRET, { expiresIn: "24h" });
     return token;
    
}   
function validateToken(token) {
    const tokenValidated = JWT.verify(token, SECRET);
    return tokenValidated;
}

module.exports = {
    createToken,
    validateToken
}