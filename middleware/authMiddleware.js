const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Obtenir le token du header
  const token = req.header('Authorization').split(' ')[1];

  // Vérifier si pas de token
  if (!token) {
    return res.status(401).json({ msg: 'Pas de token, autorisation refusée' });
  }

  // Vérifier le token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token non valide' });
  }
};
