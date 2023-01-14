const router = require("express").Router();
//test to verify token
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.send(req.user);
});

module.exports = router;
