const router = require("express").Router();
//require another route
const news = require("./news");
const user = require("./user");
const comment= require("./comment");
const typefaq = require("./type_faq");
const faq = require("./faq");
const file = require("./file");

router.use("/auth/user",user);
router.use("/news",news);
router.use("/comment",comment);
router.use("/typefaq",typefaq);
router.use("/faq",faq);

router.use("/file",file);

module.exports = router;