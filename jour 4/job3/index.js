// Importer mongoose
const mongoose = require('mongoose');

// Connexion à MongoDB (modifiez l'URL si besoin)
mongoose.connect('mongodb://localhost:27017/LaPlateforme', {
  // useNewUrlParser et useUnifiedTopology sont désormais inutiles
});

// Définir le schéma student avec les nouveaux champs
const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: String,
  year_id: Number
});

// Créer le modèle student (nom de la collection explicitement 'student')
const Student = mongoose.model('student', studentSchema, 'student');

// Les étudiants à insérer
const students = [
  {
    id: 1,
    lastname: 'LeBricoleur',
    firstname: 'Bob',
    students_number: '12346',
    year_id: 1
  },
  {
    id: 2,
    lastname: 'Doe',
    firstname: 'John',
    students_number: '12347',
    year_id: 1
  },
  {
    id: 3,
    lastname: 'Dupont',
    firstname: 'Marine',
    students_number: '12348',
    year_id: 1
  }
];

// Insérer les étudiants dans la base de données
Student.insertMany(students)
  .then(() => {
    console.log('Étudiants insérés avec succès !');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Erreur lors de l\'insertion :', err);
    mongoose.connection.close();
  });
