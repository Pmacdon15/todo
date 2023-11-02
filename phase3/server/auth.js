const jwt = require('jsonwebtoken');

function verifyToken(email) {
  return function (req, res, next) {
    return new Promise((resolve, reject) => {
      const userTokenCookieName = "userToken_" + email; // Replace with the correct cookie name
      const token = req.cookies[userTokenCookieName];

      if (token == null) {
        resolve(false); // Resolve with false if the token is missing
      }

      jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
          resolve(false); // Resolve with false if verification fails
        } else {
          req.user = user;
          resolve(true); // Resolve with true if the token is successfully verified
        }
      });
    });
  };
}

module.exports = verifyToken;
