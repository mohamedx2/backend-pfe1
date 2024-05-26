const Etablissement = require('../models/Etablissement');
const Chambre = require('../models/Chambre');
const Table = require('../models/Table');
const Hotel =require('../models/hotel');
const Restaurant =require('../models/Restaurant');

const addEtablissement = async (req, res) => {
  const { idProp, nom, email, number, adress } = req.body;
  try {
    const etablissement = new Etablissement({ idProp, nom, email, number, adress });
    await etablissement.save();
    res.status(201).json(etablissement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEtablissements = async (req, res) => {
  try {
    
    const etablissements = await Etablissement.find().populate('idProp');
    res.status(200).json(etablissements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//hotel
const addHotel = async (req, res) => {
  let hotel1 = await Hotel.findOne({ email: req.body.email });
      if (hotel1) {
        return res.status(400).json({ message: 'Hotel already exists' });
      }  
  const { idEtab,idProp, nom, email, number, adress } = req.body;
  try {
    const hotel = new Hotel({ idProp, nom, email, number, adress });
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find().populate();
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




//Restaurant
const addRestaurant = async (req, res) => {
  let restaurant1 = await Restaurant.findOne({ email: req.body.email });
  if (restaurant1) {
    return res.status(400).json({ message: 'res already exists' });
  }  
  const { idEtab,idProp, nom, email, number, adress,nombreTable } = req.body;
  try {
    const restaurant = new Restaurant({ idEtab,idProp, nom, email,nombreTable, number, adress });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.find().populate('idEtab');
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//chomber

const addChambre = async (req, res) => {

      let chamber1 = await Chambre.findOne({ numero: req.body.numero, idHotel: req.body.idHotel });

      if (chamber1) {
        return res.status(400).json({ message: 'Chambre already exists' });
      } 
  
  const { idHotel, numero, capacite, prix } = req.body;
  try {
    const chambre = new Chambre({ idHotel, numero,  capacite, prix });
    await chambre.save();
    res.status(201).json(chambre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChamber = async (req, res) => {
  try {
    const chaber = await Chambre.find().populate();
    res.status(200).json(chaber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTable = async (req, res) => {
  const { idRestaurant, numero, capacite, prix } = req.body;
  try {
    let table1 = await Table.findOne({ numero: req.body.numero, idRestaurant: req.body.idRestaurant });

    if (table1) {
      return res.status(400).json({ message: 'Table already exists' });
    } 

    const table = new Table({ idRestaurant, numero, capacite, prix });
    await table.save();
    res.status(201).json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTable = async (req, res) => {
  try {
    const table = await Table.find().populate();
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEtablissement, addRestaurant,getChamber,getTable,getEtablissements,getRestaurant, addChambre, addTable ,addHotel,getHotel};
