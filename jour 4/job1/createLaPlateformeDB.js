// Script Node.js pour créer la base de données "LaPlateforme" avec les collections "student" et "year"
// Assurez-vous d'avoir installé le package mongodb : npm install mongodb

const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Modifiez si besoin
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('LaPlateforme');

    // Création de la collection "student" sans insérer de document
    await db.createCollection('student');

    // Création de la collection "year" sans insérer de document
    await db.createCollection('year');

    console.log('Base de données et collections créées avec succès !');
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
