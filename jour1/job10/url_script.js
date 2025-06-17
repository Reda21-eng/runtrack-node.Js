const url = require('url');

const URL = "https://www.google.com&search=nodejs";

// Correction: The URL should use '?' for query parameters, not '&'.
const fixedURL = URL.replace('&', '?');
const parsedUrl = new url.URL(fixedURL);

// Récupérer le protocole utilisé
console.log('Protocole :', parsedUrl.protocol);

// Récupérer le nom d\'hôte
console.log('Nom d\'hôte :', parsedUrl.hostname);

// Récupérer les paramètres de l’URL
console.log('Paramètres :', parsedUrl.searchParams.toString());

// Reformater l’URL en une nouvelle URL valide en modifiant le nom hôte
parsedUrl.hostname = 'www.laplateforme.io';

// Ajouter à cette nouvelle URL un paramètre
parsedUrl.searchParams.append('lang', 'fr');

// Afficher dans le terminal la nouvelle URL
console.log('Nouvelle URL :', parsedUrl.toString());
