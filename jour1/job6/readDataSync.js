const fs = require('fs');

// Lecture synchrone du fichier data.txt
const data = fs.readFileSync('data.txt', 'utf8');
console.log(data);
