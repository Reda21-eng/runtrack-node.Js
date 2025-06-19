// Script d'export des collections "student" et "year" de la base "LaPlateforme" vers des fichiers JSON
// Installer la dépendance : npm install mongodb

const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://localhost:27017'; // Modifier si besoin
const dbName = 'LaPlateforme';
const collections = ['student', 'year'];

async function exportCollections() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    for (const collectionName of collections) {
      const data = await db.collection(collectionName).find({}).toArray();
      fs.writeFileSync(`${collectionName}.json`, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Export de la collection ${collectionName} terminé.`);
    }
    console.log('Export terminé pour toutes les collections.');
  } catch (err) {
    console.error('Erreur lors de l\'export :', err);
  } finally {
    await client.close();
  }
}

exportCollections();
