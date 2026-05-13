const express = require("express");
const UserController = require("../controllers/user.controller.js");
const UserMiddleware = require("../middlewares/user.middleware.js");
const upload = require("../config/multer.config.js");
const authMiddleware = require("../middlewares/auth.middleware.js")
const UserProfileController = require("../controllers/userProfile.controller.js");

const router = express.Router();

const userController = new UserController();
const userMiddleware = new UserMiddleware();
const userProfileController = new UserProfileController()

router.post("/register", userMiddleware.checkEmail, userMiddleware.checkPassword, userController.register);
router.post("/login", userMiddleware.checkEmail, userMiddleware.checkPassword, userController.login);
router.post("/upload", authMiddleware, upload.single("image"), userProfileController.uploadAvatar);

router.get("/show", authMiddleware, userProfileController.showProfile);

module.exports = router;