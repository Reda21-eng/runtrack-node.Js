const mongoose = require('mongoose');

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/job3', { useNewUrlParser: true, useUnifiedTopology: true });

// Définition du schéma Student
const studentSchema = new mongoose.Schema({
  name: String
});

const Student = mongoose.model('student', studentSchema);

Student.find()
  .then(students => {
    console.log('Étudiants trouvés :');
    students.forEach(student => console.log(student));
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Erreur :', err);
    mongoose.connection.close();
  });