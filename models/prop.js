const mongoose = require('mongoose');

const propSchema = new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_passe: { type: String, required: true },
  role: { type: String, enum: ['client', 'admin', 'proprietaire'], default: 'client' },
  date_de_naissance: { type: Date, required: true } ,
  

}, {
  timestamps: true
});

const Prop = mongoose.model('Prop', propSchema);

module.exports = Prop;
