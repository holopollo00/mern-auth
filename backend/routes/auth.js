const router = require("express").Router();
const authController = require("../controller/authController");
const middlewareController = require("../controller/middlewareController");
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post(
  "/logout",
  middlewareController.verifyToken,
  authController.userLogout
);
router.post("/refresh", authController.refreshToken);
module.exports = router;
