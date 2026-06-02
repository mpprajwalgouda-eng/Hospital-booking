const mongoose = require('mongoose');
const Department = require('../models/Department');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

async function seedDatabase() {
  try {
    const deptCount = await Department.countDocuments();
    if (deptCount > 0) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database with default departments and doctors...');

    const defaultDepts = [
      { name: 'Cardiology', description: 'Heart and cardiovascular care', color: '#3B82F6' },
      { name: 'Radiology', description: 'Imaging and diagnostics', color: '#06B6D4' },
      { name: 'General Surgery', description: 'Surgical procedures', color: '#22C55E' },
      { name: 'Pediatrics', description: 'Child healthcare and treatment', color: '#EC4899' },
    ];

    const seededDepts = await Department.insertMany(defaultDepts);
    console.log(`Seeded ${seededDepts.length} departments`);

    const defaultDoctors = [
      {
        name: 'Dr. Ana Ramos',
        email: 'ana.ramos@hospital.com',
        password: 'password123',
        role: 'doctor',
        phone: '1234567890',
        specialty: 'Cardiologist',
        departmentName: 'Cardiology',
      },
      {
        name: 'Dr. Lucas Patel',
        email: 'lucas.patel@hospital.com',
        password: 'password123',
        role: 'doctor',
        phone: '1234567891',
        specialty: 'Radiologist',
        departmentName: 'Radiology',
      },
      {
        name: 'Dr. Aisha Grant',
        email: 'aisha.grant@hospital.com',
        password: 'password123',
        role: 'doctor',
        phone: '1234567892',
        specialty: 'Surgeon',
        departmentName: 'General Surgery',
      },
      {
        name: 'Dr. Sarah Jenkins',
        email: 'sarah.jenkins@hospital.com',
        password: 'password123',
        role: 'doctor',
        phone: '1234567893',
        specialty: 'Pediatrician',
        departmentName: 'Pediatrics',
      },
    ];

    for (const docData of defaultDoctors) {
      const user = await User.create({
        name: docData.name,
        email: docData.email,
        password: docData.password,
        role: docData.role,
        phone: docData.phone,
        department: docData.departmentName,
        specialty: docData.specialty,
      });

      const dept = seededDepts.find(d => d.name === docData.departmentName);

      await Doctor.create({
        user: user._id,
        department: dept ? dept._id : null,
        specialty: docData.specialty,
        consultationFee: 150,
        workingHours: {
          monday: { start: '09:00', end: '17:00' },
          tuesday: { start: '09:00', end: '17:00' },
          wednesday: { start: '09:00', end: '17:00' },
          thursday: { start: '09:00', end: '17:00' },
          friday: { start: '09:00', end: '17:00' },
        },
        status: 'available',
      });
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

function connectDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }
  mongoose.set('strictQuery', false);
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
    seedDatabase();
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
}

module.exports = { connectDatabase };

