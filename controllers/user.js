const User = require('../model/user');
//for encrypt
const bcrypt = require('bcryptjs');

//token
const jwt = require("jsonwebtoken");
const store = require('store2');

const register = async (req, res) => {
  
  const username = req.body.username;
  try {
    const userExist = await User.findOne({ username: username})
    if(userExist){
        res.status(400).json({msg:'success',command:'Username is already exits'});
    }else{
      //encryp password
      const hashPass = await bcrypt.hash(req.body.password, 12);

      const user = new User({
        username: req.body.username,
        password: hashPass,
        email:req.body.email,
        firstname:req.body.firstname,
        lastname:req.body.lastname
      });
     
      try {
        await user.save();
        res.status(201).json({msg:'success', command:"Your Register Success" });
       
      } catch (err) {
        res.status(500).json({msg:'error', message: err.message });
      }
    
    }

  } catch (err) {
    res.status(500).json({msg:'error', message: err.message });
  }

}

const login = async (req,res)=>{
  
  const { username,password } = req.body;
  var nameFind = username;

  try {
    const user = await User.findOne({ username: nameFind});
    if(user && user.status==true){
      var info = user;
      //bcrypt 
      const checkPass = await bcrypt.compare(password, info.password);
      if(checkPass){
        
        const token = await jwt.sign({username:user.username,adminstatus:user.adminstatus},process.env.SECRETE,{ expiresIn: '2h' });
        store.set(process.env.SECRETE,token);
       
        res.status(200).json({msg:'success',command:'Login success'});
      }else{
        res.status(400).json({msg:'Error',command:'Wrong password'});
      }
    }else{
      res.status(500).json({msg:'error',command:'User account is not exists'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
 
} 

const userinfo = async (req,res)=>{
  try {
    const user = await User.find();
    if(user){
        res.status(200).json({msg:'success',user});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const changePassword = async (req,res)=>{
  const {username,newpassword}=req.body;
  const hashPass = await bcrypt.hash(newpassword, 12);
  try {
    const where = {username:username};
    const setValue = {password:hashPass};
    const user = await User.updateOne(where,setValue);
    if(user){
        res.status(200).json({msg:'success',command:'already update please login again with your new password.'});
    }else{
       res.status(200).json({msg:'success',command:'Error'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteUser = async (req,res)=>{
  var id = req.params.id;
  try {
    const where = {_id:id};
    const setValue = {status:false};
    const user = await User.updateOne(where,setValue);
    if(user){
        res.status(200).json({msg:'success',command:'Already Delete User.'});
    }else{
       res.status(200).json({msg:'error',command:'Error'});
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}




module.exports = {
  register,
  login,
  userinfo,
  changePassword,
  deleteUser
}

