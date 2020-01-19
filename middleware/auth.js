const config = require("config");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET || config.get("jwtSecret");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for Token
  if (!token)
    return res.status(401).json({ msg: "No Token, Authorization denied!" });

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(400).json({ msg: "Token not Valid!" });
  }
}

module.exports = auth;
