const mongoose = require('mongoose');
const Etablissement = require('./Etablissement'); // Assurez-vous d'avoir un schéma pour les établissements

const HotelSchema = new mongoose.Schema({
  // Champs spécifiques à l'hôtel

  idProp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

    
  },
  
  nom: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 20,
  },
  adress: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 50,
  },
  nombreChambres: {
    
    type: Number,
    
  },


});

const Hotel = Etablissement.discriminator('Hotel', HotelSchema);

module.exports = Hotel;
