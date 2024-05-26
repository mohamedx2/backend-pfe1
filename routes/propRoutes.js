const express = require('express');
const { check, validationResult } = require('express-validator');
const propController = require('../controllers/propController');

const router = express.Router();

router.post(
  '/',
  [
    check('nom', 'Le nom est requis').not().isEmpty(),
    check('prenom', 'Le prénom est requis').not().isEmpty(),
    check('email', "L'email n'est pas valide").isEmail(),
    check('mot_passe', 'Le mot de passe doit contenir au moins 6 caractères').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    propController.createProp(req, res);
  }
);

module.exports = router;
