const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')

router.get("/login", userController.login )
router.get("/register", userController.register)
router.post("/login", userController.postLogin)
router.post("/register", userController.postRegister)
router.get("/logout", userController.logout)
module.exports = router;