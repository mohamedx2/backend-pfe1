const express = require('express');
const router = express.Router();
const etablissementController = require('../controllers/etablissementController');
const auth = require('../middleware/auth');



router.post('/',  [
  auth] ,etablissementController.addEtablissement);
router.get('/getEtablissements', etablissementController.getEtablissements);
router.post('/addChambre',[
  auth], etablissementController.addChambre);
router.post('/addTable',[
  auth], etablissementController.addTable);
router.post('/addHotel',[
  auth], etablissementController.addHotel); // Assurez-vous qu'il n'y a pas de double déclaration ici
router.get('/getHotel',etablissementController.getHotel);
router.post('/addRestaurant',[
  auth], etablissementController.addRestaurant);


router.get('/getChambre',etablissementController.getChamber);
router.get('/getTable',etablissementController.getTable);

module.exports = router;
