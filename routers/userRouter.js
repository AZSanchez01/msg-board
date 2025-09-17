const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/userController');


router.get('/', userController.indexLoginGet);
router.post('/login', userController.indexLoginPost);
router.get('/logout', userController.logoutGet);

router.get('/sign-up', userController.signupGet);
router.post('/sign-up', userController.signupPost);

router.get('/dashboard', userController.dashboardGet);
router.post('/member-form', userController.setMemberPost);
router.post('/admin-form', userController.setAdminPost);

router.post('/submit-message', userController.createMessagePost);
router.post('/delete', userController.deleteMessagePost);

router.use(userController.errorDefault);

module.exports = router;