const jwt = require('jsonwebtoken');
const User = require('../models/User');

const path =require ("path");
const {cloudinaryRemoveImage,cloudinaryUploadImage}=require("../utils/cloudinary")
const fs=require('fs');




const register = async (req, res) => {
  

  const { nom, prenom, date_de_naissance,gender,phone,email, mot_passe, role } = req.body;
  console.log('Received data:', req.body); // Log the received data

  try {
      // Check if user already exists
      let user1 = await User.findOne({ email: req.body.email });
      if (user1) {
        return res.status(400).json({ message: 'User already exists' });
      }  
    const user = new User({ nom, prenom, email,date_de_naissance, mot_passe, role,gender,phone });
    console.log('New user object:', user); // Log the user object before saving
    await user.save();
    const _id=user._id
    const token = jwt.sign({ id: user._id, date_de_naissance:user.date_de_naissance,role: user.role,gender:user.gender,phone:user.phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token ,_id});
    
  } catch (error) {
    console.error('Registration error:', error); // Log any errors that occur during registration
    res.status(500).json({ error: error.message });
  }
};



const login = async (req, res) => {
  const { email, mot_passe } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(mot_passe))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10h' });
    const _id=user._id
    res.status(200).json({ token , _id});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







/*-----------------------------------------------------------
### tafsir ###
*@desc       get  user profile
*@router     /api/users/profile/:id
*@method     GET
*@access     private (only admin)
---------------------------------------------------------------*/

const getUserProfileCtrl=async (req,res)=>{
  const user = await User.findById(req.params.id).select("-password");
  if (!user){
    return res.status(404).json({message : "user not found"});
  }
  
  res.status(200).json(user)
}







/*-----------------------------------------------------------
### tafsir ###
*@desc       Profile Photo Upload
*@router     /api/users/profile/profile-photo-upload
*@method     POST
*@access     private (only logged in user)
---------------------------------------------------------------*/

const profilePhotoUploadCtrl=async (req,res)=>{
  
  //1.validation
  if (!req.file){
    return res.status(400).json({message : "no file provided "});
  }
  
  //2.GET the path to image 
  const imagePath = path.join(__dirname,`../images/${req.file.filename}`);

  //3.upload to cloudinary 
  const result=await cloudinaryUploadImage(imagePath);
  console.log(result);

  //4.Get the user from DB
  const user = await User.findById(req.params.id);

  //5. delete the old photo if exist 
  if (user.profilePhoto.publicId !==null){
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  //6.change the photo field in db
  user.profilePhoto={
    url:  result.secure_url,
    publicId: result.public_id,
  }
  await user.save();

  //7.send response to client 
  res.status(200).json({
    message : "your photo uploaded successfully ",
    profilePhoto:{ 
      url: result.secure_url,
      publicId : result.public_id 
  }})
  

  //8.Remove image from the images  server 
  fs.unlinkSync(imagePath)


};























const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, updateUser, profilePhotoUploadCtrl,getUserProfileCtrl,deleteUser };
