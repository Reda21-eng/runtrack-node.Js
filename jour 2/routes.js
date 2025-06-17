// Gestion des routes de l'API
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function getTasks(req, res) {
  fs.readFile(dataPath, (err, data) => {
    if (err) return sendJSON(res, 500, { error: 'Erreur lecture données' });
    const tasks = JSON.parse(data || '[]');
    sendJSON(res, 200, tasks);
  });
}

function createTask(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try {
      const newTask = JSON.parse(body);
      fs.readFile(dataPath, (err, data) => {
        let tasks = [];
        if (!err && data.length) tasks = JSON.parse(data);
        newTask.id = Date.now();
        tasks.push(newTask);
        fs.writeFile(dataPath, JSON.stringify(tasks, null, 2), err => {
          if (err) return sendJSON(res, 500, { error: 'Erreur écriture données' });
          sendJSON(res, 201, newTask);
        });
      });
    } catch {
      sendJSON(res, 400, { error: 'Requête invalide' });
    }
  });
}

function updateTask(req, res, id) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try {
      const update = JSON.parse(body);
      fs.readFile(dataPath, (err, data) => {
        if (err) return sendJSON(res, 500, { error: 'Erreur lecture données' });
        let tasks = JSON.parse(data || '[]');
        const idx = tasks.findIndex(t => t.id == id);
        if (idx === -1) return sendJSON(res, 404, { error: 'Tâche non trouvée' });
        tasks[idx] = { ...tasks[idx], ...update };
        fs.writeFile(dataPath, JSON.stringify(tasks, null, 2), err => {
          if (err) return sendJSON(res, 500, { error: 'Erreur écriture données' });
          sendJSON(res, 200, tasks[idx]);
        });
      });
    } catch {
      sendJSON(res, 400, { error: 'Requête invalide' });
    }
  });
}

function deleteTask(req, res, id) {
  fs.readFile(dataPath, (err, data) => {
    if (err) return sendJSON(res, 500, { error: 'Erreur lecture données' });
    let tasks = JSON.parse(data || '[]');
    const idx = tasks.findIndex(t => t.id == id);
    if (idx === -1) return sendJSON(res, 404, { error: 'Tâche non trouvée' });
    const deleted = tasks.splice(idx, 1);
    fs.writeFile(dataPath, JSON.stringify(tasks, null, 2), err => {
      if (err) return sendJSON(res, 500, { error: 'Erreur écriture données' });
      sendJSON(res, 200, deleted[0]);
    });
  });
}

module.exports = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bienvenue sur l\'API To-Do List Node.js ! Utilisez /tasks pour accéder aux tâches.');
    return;
  }
  if (url === '/tasks' && method === 'GET') return getTasks(req, res);
  if (url === '/tasks' && method === 'POST') return createTask(req, res);
  const match = url.match(/^\/tasks\/(\d+)$/);
  if (match && method === 'PUT') return updateTask(req, res, match[1]);
  if (match && method === 'DELETE') return deleteTask(req, res, match[1]);
  sendJSON(res, 404, { error: 'Route non trouvée' });
};
