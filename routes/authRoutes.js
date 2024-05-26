const express = require('express');
const { register, login, updateUser, deleteUser,getUserProfileCtrl ,profilePhotoUploadCtrl} = require('../controllers/authController');
const validateObjectId =require("../middleware/validateObjectId");
const photoUpload = require("../middleware/photoUpload");
const auth = require('../middleware/auth');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);
// /api/users/profile/:id
// /api/users/profile/:id
router.route("/profile/:id")
    .get(validateObjectId, getUserProfileCtrl);

// /api/users/profile-photo-upload
router.route("/profile-photo-upload/:id")
    .post(auth, photoUpload.single("image"),profilePhotoUploadCtrl);

module.exports = router;
