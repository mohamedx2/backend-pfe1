const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Reservation = require('../models/Reservation');
const validateReservation=require('../controllers/reservationController')

const router = express.Router();

// Créer une réservation
router.post(
  '/',
  [
    auth,
    [
      check('idEtab', 'L\'id de l\'établissement est requis').not().isEmpty(),
      check('idClient', 'L\'id du client est requis').not().isEmpty(),
      check('nbPers', 'Le nombre de personnes est requis').isInt({ min: 1 }),
      check('dateDepart', 'La date de départ est requise').isISO8601(),
      check('dateFin', 'La date de fin est requise').isISO8601(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { idEtab, idClient, nbPers, dateDepart, dateFin } = req.body;

    try {
      const newReservation = new Reservation({
        idEtab,
        idClient,
        nbPers,
        dateDepart,
        dateFin,
      });

      const reservation = await newReservation.save();
      res.json(reservation);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  }

);


router.get('/getReservation',  [
  auth,],validateReservation.getReservations)

module.exports = router;
