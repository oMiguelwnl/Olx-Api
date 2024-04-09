const express = require("express");
const router = express.Router();
const AuthController = require("./controllers/AuthController");
const AdsController = require("./controllers/AdsController");
const UserController = require("./controllers/UserController");

const Auth = require("./middlewares/Auth");
const AuthValidator = require("./validators/AuthValidator");

router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

router.get("/states", UserController.getStates);

router.get("/user/me", Auth.private, UserController.info);
router.put("/user/me", Auth.private, UserController.editAction);

router.post("/user/signin", AuthValidator.signin, AuthController.signin);
router.post("/user/signup", AuthValidator.signup, AuthController.signup);

router.post("/ad/add", Auth.private, AdsController.addAction);
router.post("/ad/list", AdsController.getList);
router.get("/ad/item", AdsController.getItem);
router.put("/ad/:id", Auth.private, AdsController.editAction);

module.exports = router;
