const router = require("express").Router();
const {
  create,
  list,
  update,
  deleteCom,
  listbyid
}=require("../controllers/comment");
//check auto
const checkAuth = require("../middleware/auth");
const {checkUserLogin} = require("../middleware/auth_each");


router.get("/",list);
router.get("/:id",listbyid);
router.post("/",create);
router.put("/:id",update);
router.delete("/:id",deleteCom);

//control can comment only 2 in one post

module.exports= router;