const readline = require('readline');
const students = require('./students');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Entrez le nom de famille de l'étudiant : ", (nomRecherche) => {
  const nomRechercheLower = nomRecherche.trim().toLowerCase();
  const etudiant = students.find(s => {
    const nomDeFamille = s.name.split(' ').slice(-1)[0].toLowerCase();
    return nomDeFamille === nomRechercheLower;
  });
  if (etudiant) {
    console.log('Informations de l\'étudiant :');
    console.log(`ID : ${etudiant._id}`);
    console.log(`Nom complet : ${etudiant.name}`);
    console.log(`__v : ${etudiant.__v}`);
  } else {
    console.log("Aucun étudiant trouvé avec ce nom de famille.");
  }
  rl.close();
});
