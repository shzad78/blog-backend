const jwt = require("jsonwebtoken");

const checkForAuthCookie = (tokenName) => {
  return (req, res, next) => {
    const token = req.cookies[tokenName];
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }
    try {
      // Validate the token using your JWT secret
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user; // Attach decoded user to request
      next();
    } catch (err) {
      // Clear the invalid token cookie
      res.clearCookie(tokenName);
      return res.status(401).send("Unauthorized: Invalid token");
    }
  };
};

module.exports = { checkForAuthCookie };
