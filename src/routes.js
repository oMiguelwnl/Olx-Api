const express = require("express");
const router = express.Router();
const AuthController = require("./controllers/AuthController");
const AdsController = require("./controllers/AdsController");
const UserController = require("./controllers/UserController");

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

router.get("states", UserController.getStates);
router.get("/user/me", UserController.info);
router.put("/user/me", UserController.editAction);

router.post("/user/signin", AuthController.signin);
router.post("/user/signup", AuthController.singup);

router.get("/ad/add", AdsController.addAction);
router.post("/ad/list", AdsController.getList);
router.get("ad/item", AdsController.getItem);
router.post("/ad/:id", AdsController.editAction);

module.exports = router;
