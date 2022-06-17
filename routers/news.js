const router = require("express").Router();
const {
  create,
  list,
  update,
  deleteNews,
  RecoverNews,
  listClient
}=require("../controllers/news");
const checkAuth = require("../middleware/auth");
const {checkUserLogin,checkAdminLogin} = require("../middleware/auth_each");

const multer  = require('multer');
var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , Date.now()+file.originalname);   
  }
});

const upload = multer({
  storage: storage,
  limits : {fileSize : 1000000}
});

router.get("/",list);
router.get("/client",listClient);
router.post("/",upload.single("image"),create);
router.put("/:id",upload.single("image"),update);
router.delete("/:id",deleteNews);
router.put("/recover/:id",RecoverNews);

module.exports= router;

