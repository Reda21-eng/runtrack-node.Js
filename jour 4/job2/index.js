const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Remplacez par votre URI MongoDB si besoin
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();
    console.log('Connecté à MongoDB !');
    // Aucune opération d'ajout de données pour le moment
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err);
  } finally {
    await client.close();
  }
}

main();
