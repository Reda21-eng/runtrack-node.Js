const readline = require('readline');

const students = [
  {
    _id: '685411899d443c333ce7b7b0',
    id: 1,
    lastname: 'LeBricoleur',
    firstname: 'Bob',
    students_number: '12346',
    year_id: 1,
    __v: 0,
    year: '68541500a35cb6827421df49'
  },
  {
    _id: '685411899d443c333ce7b7b1',
    id: 2,
    lastname: 'Doe',
    firstname: 'John',
    students_number: '12347',
    year_id: 1,
    __v: 0,
    year: '68541500a35cb6827421df4a'
  },
  {
    _id: '685411899d443c333ce7b7b2',
    id: 3,
    lastname: 'Dupont',
    firstname: 'Marine',
    students_number: '12348',
    year_id: 1,
    __v: 0,
    year: '68541500a35cb6827421df4b'
  }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Entrez un numéro d'étudiant : ", (input) => {
  const numeroSaisi = parseInt(input, 10);
  if (isNaN(numeroSaisi)) {
    console.log('Veuillez entrer un numéro valide.');
    rl.close();
    return;
  }
  const resultats = students.filter(s => parseInt(s.students_number, 10) > numeroSaisi);
  if (resultats.length === 0) {
    console.log('Aucun étudiant trouvé avec un numéro supérieur à', numeroSaisi);
  } else {
    console.log('Étudiants avec un numéro supérieur à', numeroSaisi, ':');
    resultats.forEach(s => {
      console.log(`Nom: ${s.firstname} ${s.lastname}, Numéro étudiant: ${s.students_number}`);
    });
  }
  rl.close();
});
