const router = require("express").Router();

// planner route
router.get("/", (req, res) => {
  res.json({
    error: null,
    data: {
      title: "My personal planner",
      content: "My planner content✨",
      user: req.user,
    },
  });
});

module.exports = router;
