const express = require('express')
const router = express.Router();
const indexController = require('../controllers/index')

router.get("/", indexController.getFortune)
router.get("/add-fortune", indexController.getAddFortune)
router.get("/user-fortunes", indexController.getUserFortune)
router.post("/add-fortune", indexController.forwardAddFortune)

module.exports = router;