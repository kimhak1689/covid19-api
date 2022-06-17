const router = require("express").Router();
 const {
  register,
  login,
  userinfo,
  changePassword,
  deleteUser,
 } = require("../controllers/user");

 const checkAuth = require("../middleware/auth");
 const {checkUserLogin,checkBeforeLogout,checkBeforeLogin} = require("../middleware/auth_each");

router.get("/",userinfo);
router.get("/:id",userinfo);
router.post("/register",register);
router.post("/login",login);
router.put("/changepassword",changePassword);
router.delete("/delete/:id",deleteUser);


module.exports = router;