const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  idEtab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etablissement',
    required: true
  },
  idClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nbPers: {
    type: Number,
    required: true
  },
  isAccept: {
    type: Boolean,
    default: false
  },
  dateDepart: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;
