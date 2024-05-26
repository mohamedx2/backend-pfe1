const Prop = require('../models/prop');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createProp = async (req, res) => {
  const { nom, prenom, email,date_de_naissance, mot_passe } = req.body;

  try {
    let prop1 = await Prop.findOne({ email });
    if (prop1) {
      return res.status(400).json({ msg: 'Le propriétaire existe déjà' });
    }

    prop = new Prop({ nom, prenom, email, date_de_naissance,mot_passe });

    const salt = await bcrypt.genSalt(10);
    prop.mot_passe = await bcrypt.hash(mot_passe, salt);

    await prop.save();

    const payload = { prop: { id: prop.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};
