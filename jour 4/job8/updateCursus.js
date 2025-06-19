// Script pour mettre à jour le cursus (année) d'un étudiant par son ID dans MongoDB
// Utilisation : node updateCursus.js <etudiantId> <nouvelYearId>

const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Modifie si besoin
const dbName = 'LaPlateforme';
const collectionName = 'student';

async function updateCursus(etudiantId, nouvelYearId) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { _id: new ObjectId(etudiantId) },
      { $set: { year: new ObjectId(nouvelYearId) } }
    );
    if (result.matchedCount === 0) {
      console.log('Aucun étudiant trouvé avec cet ID.');
    } else {
      console.log('Cursus (année) mis à jour avec succès.');
    }
  } catch (err) {
    console.error('Erreur lors de la mise à jour :', err);
  } finally {
    await client.close();
  }
}

const [,, etudiantId, nouvelYearId] = process.argv;
if (!etudiantId || !nouvelYearId) {
  console.log('Usage : node updateCursus.js <etudiantId> <nouvelYearId>');
  process.exit(1);
}

updateCursus(etudiantId, nouvelYearId);
