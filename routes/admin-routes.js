const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const { adminPage, approveAdmin } = require('../controllers/admin-controller');

router.get('/welcome', authMiddleware, adminMiddleware, adminPage);
router.put('/approve/:id', authMiddleware, adminMiddleware, approveAdmin);

module.exports = router;
