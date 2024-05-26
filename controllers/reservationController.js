const Reservation = require('../models/Reservation');

const addReservation = async (req, res) => {
  const { idEtab, idClient, nbPers, dateDepart, dateFin } = req.body;
  try {
    const reservation = new Reservation({ idEtab, idClient, nbPers, dateDepart, dateFin });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('idEtab').populate('idClient');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addReservation, getReservations };
