require("dotenv").config();
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const headersToken = req.headers.authorization;
  const token = headersToken.replace("Bearer ", "");
  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, token) => {
    if (err) {
      res.status(401).send("Invalid Token");
      return;
    }
    next();
  });
};

module.exports = { validateToken };
