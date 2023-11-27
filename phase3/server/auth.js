const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const path = require("path");

class AuthManager {
  constructor() {
    const envPath = path.resolve(__dirname, "../../.env");
    dotenv.config({ path: envPath });
  }

  createToken(email) {
    const secret_key = process.env.SECRET_KEY;
    const key = secret_key + email;
    const token = jwt.sign({ user: email }, key);
    return token;
  }

  confirmLogin(email, req, res, next) {
    const secret_key = process.env.SECRET_KEY;
    const key = secret_key + email;

    // Check if the request is for the favicon.ico file
    if (req.url === "/favicon.ico") {
      next(); // Skip token verification for favicon.ico
      return;
    }

    const userTokenCookieName = "userToken_" + email; // Replace with the correct cookie name
    const token = req.cookies[userTokenCookieName];

    if (!token) {
      // res.status(401).json({ message: 'Unauthorized' });
      res.redirect("/");
    } else {
      jwt.verify(token, key, (err, user) => {
        if (err) {
          // res.status(401).json({ message: 'Unauthorized' });
          res.redirect("/");
        } else {
          req.user = user;
          //console.log("from confirm " + key);
          next(); // If the token is verified, continue to the next middleware or route handler
        }
      });
    }
  }
}

module.exports = new AuthManager();
