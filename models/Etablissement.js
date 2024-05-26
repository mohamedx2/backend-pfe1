const mongoose = require('mongoose');

const EtablissementSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
});

const Etablissement = mongoose.model('Etablissement', EtablissementSchema);

module.exports = Etablissement;
