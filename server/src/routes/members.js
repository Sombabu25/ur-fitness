const express = require('express');
const router = express.Router();
const { getMembers, getMember, createMember, updateMember, deleteMember, checkMembership, getAnalytics } = require('../controllers/memberController');
const { protect } = require('../middleware/auth');

// Public route
router.get('/check/:mobile', checkMembership);

// Protected routes
router.get('/analytics', protect, getAnalytics);
router.route('/').get(protect, getMembers).post(protect, createMember);
router.route('/:id').get(protect, getMember).put(protect, updateMember).delete(protect, deleteMember);

module.exports = router;
