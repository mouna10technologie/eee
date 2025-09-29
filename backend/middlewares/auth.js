const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, error: 'Accès refusé. Token manquant.' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ success: false, error: 'Token invalide.' });
  }
}
