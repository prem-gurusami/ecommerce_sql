const jwt = require('jsonwebtoken');

module.exports.verifyJWT = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const user = await jwt.verify(token, process.env.HASH_KEY);
      if (user) {
        req.userId = user.userId;
        return next();
      }
      res.clearCookie('token');
      return res.json({ message: 'Please login to view this page' });
    }
    res.clearCookie('token');
    return res.json({ message: 'Please login to view this page' });
  } catch {
    res.clearCookie('token');
    return res.json({ message: 'Please login to view this page' });
  }
};
