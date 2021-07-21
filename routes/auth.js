const express = require("express");
const { registerAuthController, loginAuthController, logoutAuthController, getLoggedInController } = require("../controllers/auth");
const router = express.Router();

router.route("/login/:userType").post(loginAuthController);
router.route("/register/:userType").post(registerAuthController);
router.route("/logout").post(logoutAuthController);
router.route("/getLoggedIn").get(getLoggedInController);

module.exports = router;