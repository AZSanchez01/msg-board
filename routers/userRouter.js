const { Router } = require('express');
const userController = require('../controllers/userController');
const pool = require('../model/pool');
const router = Router();


router.get("/", userController.loginGet);
router.get("/sign-up", userController.signupGet);
router.get("/dashboard", userController.dashboardGet);



router.use(userController.errorGet);

module.exports = router;