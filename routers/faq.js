const router = require("express").Router();

const {
  create,
  list,
  listClient,
  update,
  deletefaq,
  recoverfaq,
  admincreate,
  listbyid
}=require("../controllers/faq");
const checkAuth = require("../middleware/auth");
const {checkUserLogin} = require("../middleware/auth_each");

router.get("/",list);
router.get("/client",listClient);
router.get("/:id",listbyid);
router.post("/",create);
router.post("/admin",admincreate);
router.put("/:id",update);
router.delete("/:id",deletefaq);
router.put("/recover/:id",recoverfaq);



module.exports= router;

