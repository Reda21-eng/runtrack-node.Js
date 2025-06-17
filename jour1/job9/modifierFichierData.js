const fs = require('fs');
const path = require('path');

function modifierFichierData(nouveauContenu) {
    const filePath = path.join(__dirname, 'data.txt');
    fs.writeFileSync(filePath, nouveauContenu, 'utf8');
    console.log('Le fichier data.txt a été modifié.');
}

module.exports = modifierFichierData;
