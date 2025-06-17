const fs = require('fs');
const path = require('path');

const currentDir = process.cwd();

fs.readdir(currentDir, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du répertoire :', err);
    return;
  }
  const folders = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
  console.log('Dossiers présents dans le répertoire courant :');
  folders.forEach(folder => console.log(folder));
});
