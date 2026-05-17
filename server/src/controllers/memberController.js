const Member = require('../models/Member');

// Helper: calculate expiry date
const calculateExpiryDate = (joiningDate, durationMonths) => {
  const date = new Date(joiningDate);
  date.setMonth(date.getMonth() + durationMonths);
  return date;
};

// @desc    Get all members
// @route   GET /api/members
// @access  Private
const getMembers = async (req, res) => {
  try {
    const { search, plan, status, page = 1, limit = 50 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (plan) query.membershipPlan = plan;
    if (status) query.paymentStatus = status;

    const total = await Member.countDocuments(query);
    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Stats
    const now = new Date();
    const activeCount = await Member.countDocuments({ expiryDate: { $gte: now } });
    const expiredCount = await Member.countDocuments({ expiryDate: { $lt: now } });
    const expiringIn7Days = await Member.countDocuments({
      expiryDate: { $gte: now, $lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) }
    });

    res.json({
      success: true,
      data: members,
      total,
      stats: { activeCount, expiredCount, expiringIn7Days, totalCount: total },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
const getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Check membership by mobile
// @route   GET /api/members/check/:mobile
// @access  Public
const checkMembership = async (req, res) => {
  try {
    const member = await Member.findOne({ mobileNumber: req.params.mobile });
    if (!member) return res.status(404).json({ message: 'No membership found for this mobile number' });
    res.json({
      success: true,
      data: {
        fullName: member.fullName,
        membershipPlan: member.membershipPlan,
        joiningDate: member.joiningDate,
        expiryDate: member.expiryDate,
        paymentStatus: member.paymentStatus,
        daysRemaining: member.daysRemaining,
        isExpired: member.isExpired,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create member
// @route   POST /api/members
// @access  Private
const createMember = async (req, res) => {
  try {
    const { fullName, mobileNumber, email, gender, age, joiningDate, membershipPlan, duration, price, paymentStatus, notes } = req.body;

    const expiryDate = calculateExpiryDate(joiningDate || new Date(), duration);

    const member = await Member.create({
      fullName, mobileNumber, email, gender, age,
      joiningDate: joiningDate || new Date(),
      membershipPlan, duration, price, expiryDate, paymentStatus, notes
    });

    res.status(201).json({ success: true, data: member, message: 'Member registered successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update member
// @route   PUT /api/members/:id
// @access  Private
const updateMember = async (req, res) => {
  try {
    const { joiningDate, duration } = req.body;
    if (joiningDate && duration) {
      req.body.expiryDate = calculateExpiryDate(joiningDate, duration);
    }

    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json({ success: true, data: member, message: 'Member updated successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Private
const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/members/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalMembers = await Member.countDocuments();
    const activeMembers = await Member.countDocuments({ expiryDate: { $gte: now } });
    const expiredMembers = await Member.countDocuments({ expiryDate: { $lt: now } });
    const newThisMonth = await Member.countDocuments({ createdAt: { $gte: startOfMonth } });
    const expiringIn7Days = await Member.countDocuments({
      expiryDate: { $gte: now, $lte: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) }
    });

    const revenueResult = await Member.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const monthlyRevenueResult = await Member.aggregate([
      { $match: { paymentStatus: 'Paid', createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const monthlyRevenue = monthlyRevenueResult[0]?.total || 0;

    const planDistribution = await Member.aggregate([
      { $group: { _id: '$membershipPlan', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalMembers, activeMembers, expiredMembers, newThisMonth,
        expiringIn7Days, totalRevenue, monthlyRevenue, planDistribution
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getMembers, getMember, createMember, updateMember, deleteMember, checkMembership, getAnalytics };
