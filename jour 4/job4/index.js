const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme');

const yearSchema = new mongoose.Schema({ name: String });
const studentSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  students_number: String,
  year: { type: mongoose.Schema.Types.ObjectId, ref: 'year' }
});

// Utilisation explicite des collections existantes "year" et "student"
const Year = mongoose.model('Year', yearSchema, 'year'); // 3e argument = nom exact de la collection
const Student = mongoose.model('Student', studentSchema, 'student');

async function main() {
  try {
    // 1. S'assurer que les années existent (pas de doublon)
    const yearsData = [
      { name: 'Bachelor 1' },
      { name: 'Bachelor 2' },
      { name: 'Bachelor 3' }
    ];
    for (const y of yearsData) {
      await Year.updateOne({ name: y.name }, y, { upsert: true });
    }

    // 2. Récupérer les années
    const bachelor1 = await Year.findOne({ name: 'Bachelor 1' });
    const bachelor2 = await Year.findOne({ name: 'Bachelor 2' });
    const bachelor3 = await Year.findOne({ name: 'Bachelor 3' });

    // 3. Associer chaque étudiant à son cursus
    await Student.updateOne(
      { firstname: 'Bob', lastname: 'LeBricoleur' },
      { year: bachelor1._id }
    );
    await Student.updateOne(
      { firstname: 'John', lastname: 'Doe' },
      { year: bachelor2._id }
    );
    await Student.updateOne(
      { firstname: 'Marine', lastname: 'Dupont' },
      { year: bachelor3._id }
    );

    console.log('Associations mises à jour avec succès !');
  } catch (err) {
    console.error('Erreur :', err);
  } finally {
    mongoose.connection.close();
  }
}

main();