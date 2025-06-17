const path = require('path');

// Remplacez ce chemin par le chemin du fichier que vous souhaitez analyser
const filePath = __filename;

// Récupérer le nom du fichier
const fileName = path.basename(filePath);
console.log('Nom du fichier :', fileName);

// Récupérer l'extension du fichier
const fileExt = path.extname(filePath);
console.log("Extension du fichier :", fileExt);

// Récupérer le répertoire parent du fichier
const parentDir = path.dirname(filePath);
console.log("Répertoire parent :", parentDir);
