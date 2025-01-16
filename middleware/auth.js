function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const token = req.cookies[cookieName];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const user = validateToken(token);
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}
module.exports = {
    checkForAuthCookie
    };
