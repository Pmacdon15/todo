const jwt = require('jsonwebtoken');

// !! on its way out !!
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

function confirmLogin(req, res, next) {
  const email = req.params.email; // Extract the email from the URL or wherever it's located

  // Check if the request is for the favicon.ico file
  if (req.url === '/favicon.ico') {
    next(); // Skip token verification for favicon.ico
    return;
  }

  const userTokenCookieName = "userToken_" + email; // Replace with the correct cookie name
  const token = req.cookies[userTokenCookieName];

  if (!token) {
    // res.status(401).json({ message: 'Unauthorized' });
    res.redirect("/");
  } else {
    jwt.verify(token, email , (err, user) => {
      if (err) {
        // res.status(401).json({ message: 'Unauthorized' });
        res.redirect("/");
      } else {
        req.user = user;
        next(); // If the token is verified, continue to the next middleware or route handler
      }
    });
  }
}

module.exports = {
  verifyToken: verifyToken,
  confirmLogin: confirmLogin
};
