const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token!' });
  }
};

module.exports = verifyToken;
