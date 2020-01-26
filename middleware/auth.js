require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET;

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for Token
  if (!token)
    return res.status(401).json({
      id: "AUTH",
      success: false,
      msg: "No Token, Authorization denied!"
    });

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({
      id: "AUTH",
      success: false,
      msg: "Token not Valid!"
    });
  }
}

module.exports = auth;
