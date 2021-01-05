const router = require("express").Router();

const apiRoutes = require("./api");

const homeRoutes = require("./home-routes");

router.use("/", homeRoutes);

router.use("/api", apiRoutes);
//catch requests to routes that dont exist
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
