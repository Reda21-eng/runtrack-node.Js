const fs = require('fs');

// Lire le contenu du fichier data.txt
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Erreur lors de la lecture du fichier:', err);
        return;
    }
    // Afficher une lettre sur deux
    let result = '';
    for (let i = 0; i < data.length; i += 2) {
        result += data[i];
    }
    console.log(result);
});
