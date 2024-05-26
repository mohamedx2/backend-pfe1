const mongoose = require('mongoose');
const Etablissement = require('./Etablissement'); // Assurez-vous d'avoir un schéma pour les établissements

const RestaurantSchema = new mongoose.Schema({
  // Champs spécifiques à l'hôtel
  idEtab: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  nombreTable: {
    
    type: Number,
    
  },
});

const Restaurant = Etablissement.discriminator('Restaurant', RestaurantSchema);

module.exports = Restaurant;
