const mongoose = require('mongoose');
const Student = require('./student');
const Year = require('./year');

async function runTests() {
  await mongoose.connect('mongodb://localhost:27017/test-job10', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  await mongoose.connection.dropDatabase();

  // Test Year: valid
  try {
    const year = await Year.create({ name: 'L1', startYear: 2024, endYear: 2025 });
    console.log('Year valid:', year);
  } catch (err) {
    console.error('Year valid error:', err.message);
  }

  // Test Year: invalid (endYear < startYear)
  try {
    await Year.create({ name: 'L2', startYear: 2025, endYear: 2024 });
  } catch (err) {
    console.error('Year invalid error:', err.message);
  }

  // Test Student: valid
  const year = await Year.findOne({ name: 'L1' });
  try {
    const student = await Student.create({
      firstName: 'Alice',
      lastName: 'Martin',
      email: 'alice.martin@example.com',
      age: 20,
      year: year._id
    });
    console.log('Student valid:', student);
  } catch (err) {
    console.error('Student valid error:', err.message);
  }

  // Test Student: invalid (email mal formé)
  try {
    await Student.create({
      firstName: 'Bob',
      lastName: 'Dupont',
      email: 'bob.dupont',
      age: 19,
      year: year._id
    });
  } catch (err) {
    console.error('Student invalid email error:', err.message);
  }

  await mongoose.disconnect();
}

runTests();
