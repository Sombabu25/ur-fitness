require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const Plan = require('../models/Plan');

const connectDB = require('./db');

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await Admin.deleteMany({});
  await Plan.deleteMany({});

  // Create default admin
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await Admin.create({
    name: 'UR Fitness Admin',
    email: 'admin@urfitness.com',
    password: hashedPassword,
  });

  // Create default plans
  await Plan.insertMany([
    { name: '1 Month', duration: 1, price: 1500, description: 'Perfect for beginners. Access to all equipment and basic classes.', features: ['All Equipment Access', 'Locker Room', 'Basic Classes', 'Fitness Assessment'] },
    { name: '3 Months', duration: 3, price: 3999, description: 'Most popular choice. Save more with quarterly membership.', features: ['All Equipment Access', 'Locker Room', 'All Classes', 'Personal Trainer (2 sessions)', 'Diet Plan'], popular: true },
    { name: '6 Months', duration: 6, price: 6999, description: 'Commit to your fitness journey with our semi-annual plan.', features: ['All Equipment Access', 'Locker Room', 'All Classes', 'Personal Trainer (6 sessions)', 'Diet Plan', 'Supplement Discount'] },
    { name: '12 Months', duration: 12, price: 11999, description: 'Best value. Full year of unlimited fitness access.', features: ['All Equipment Access', 'Locker Room', 'All Classes', 'Personal Trainer (12 sessions)', 'Custom Diet Plan', 'Supplement Discount', 'Guest Passes (4)'] },
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin Email: admin@urfitness.com');
  console.log('🔑 Admin Password: admin123');
  process.exit(0);
};

seedData().catch(err => {
  console.error(err);
  process.exit(1);
});
