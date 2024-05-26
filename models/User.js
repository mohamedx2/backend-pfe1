const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  id:mongoose.mongoose.Schema.ObjectId,
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  gender: { type: String,enum: ['F', 'M'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_passe: { type: String, required: true },
  date_de_naissance: { type: Date, required: true }, // Added date of birth field

  profilePhoto: {
    type: Object,
    default: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      publicId: null,
    },
  },
  role: { type: String, enum: ['client', 'admin', 'proprietaire'], default: 'client' }
}, {
  timestamps: true
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('mot_passe')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.mot_passe, salt);
    this.mot_passe = hashedPassword;
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware or error handler
  }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.mot_passe);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
