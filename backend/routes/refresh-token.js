const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRATION = '10s';

router.post('/', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token not provided' });
  }

  jwt.verify(refreshToken, REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
    console.log(decoded.user);
    const user = decoded.user; // Assuming the user object is stored in the token

    // Generate a new access token
    const accessToken = jwt.sign({ user }, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    return res.status(200).json({
      message: 'Token refreshed successfully',
      accessToken,
    });
  });
});

module.exports = router;
