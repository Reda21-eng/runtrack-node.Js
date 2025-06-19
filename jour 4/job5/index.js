// Script pour afficher les étudiants et leur cursus depuis MongoDB (collections: student & year)
// Assurez-vous d'avoir installé le package 'mongodb' avec: npm install mongodb

const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'LaPlateforme';

async function main() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connecté à MongoDB');
    const db = client.db(dbName);
    // Jointure entre student.year et year._id
    const students = await db.collection('student').aggregate([
      {
        $lookup: {
          from: 'year',
          localField: 'year',
          foreignField: '_id',
          as: 'year_info'
        }
      },
      { $unwind: '$year_info' },
      {
        $project: {
          _id: 0,
          etudiant: { $concat: ['$firstname', ' ', '$lastname'] }, // Concatène prénom et nom
          cursus: '$year_info.name'
        }
      }
    ]).toArray();
    console.log('Liste des étudiants avec leur cursus:');
    console.table(students);
  } catch (err) {
    console.error('Erreur:', err);
  } finally {
    await client.close();
  }
}

main();
