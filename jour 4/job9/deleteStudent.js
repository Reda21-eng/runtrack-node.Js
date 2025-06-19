// Script pour supprimer un étudiant par son identifiant dans MongoDB avec Mongoose

const mongoose = require('mongoose');
const { Types } = mongoose;

// Remplace par l'URL de ta base de données MongoDB
const mongoURI = 'mongodb://localhost:27017/LaPlateforme';

// Schéma de l'étudiant (à adapter si besoin)
const studentSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  students_number: String,
  year_id: Number
});

// Correction : préciser le nom exact de la collection ('student')
const Student = mongoose.model('Student', studentSchema, 'student');

async function deleteStudentById(id) {
  await mongoose.connect(mongoURI);
  const result = await Student.deleteOne({ _id: id });
  if (result.deletedCount === 1) {
    console.log('Étudiant supprimé avec succès !');
  } else {
    console.log('Aucun étudiant trouvé avec cet id.');
  }
  await mongoose.disconnect();
}

// Remplace l'ID ci-dessous par celui de l'étudiant à supprimer
const studentId = new mongoose.Types.ObjectId('685411899d443c333ce7b7b0');
deleteStudentById(studentId);
