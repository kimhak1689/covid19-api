const router = require("express").Router();

const checkAuth = require("../middleware/auth");
const {checkUserLogin} = require("../middleware/auth_each");

router.get("/",(req,res)=>{
  res.send("file");
});




module.exports= router;

