const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/LaPlateforme', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connecté à la base de données MongoDB LaPlateforme');
}).catch((err) => {
  console.error('Erreur de connexion à MongoDB:', err);
});

app.use(express.json()); // Pour parser le JSON du body

// Servir la page HTML statique pour afficher les étudiants
app.use(express.static(__dirname));

// Route de test
app.get('/', (req, res) => {
  res.send('API LaPlateforme fonctionne !');
});

// Définition du modèle Student
const studentSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  age: Number,
  // Ajoute d'autres champs si besoin
});
const Student = mongoose.model('student', studentSchema, 'student');

// Route GET /etudiants : récupère tous les étudiants
app.get('/etudiants', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route GET /etudiant/:id : récupère un étudiant par ID
app.get('/etudiant/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide, veuillez fournir un ObjectId MongoDB valide.' });
  }
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route GET /etudiant/685411899d443c333ce7b7b1 : récupère John Doe
app.get('/etudiant/685411899d443c333ce7b7b1', async (req, res) => {
  try {
    const student = await Student.findById('685411899d443c333ce7b7b1');
    if (!student) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route GET /etudiant/685411899d443c333ce7b7b2 : récupère Marine Dupont
app.get('/etudiant/685411899d443c333ce7b7b2', async (req, res) => {
  try {
    const student = await Student.findById('685411899d443c333ce7b7b2');
    if (!student) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route POST /etudiants : ajoute un étudiant
app.post('/etudiants', async (req, res) => {
  try {
    const { nom, prenom, age } = req.body;
    const newStudent = new Student({ nom, prenom, age });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route DELETE /etudiant/:id : supprime un étudiant
app.delete('/etudiant/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide, veuillez fournir un ObjectId MongoDB valide.' });
  }
  try {
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }
    res.json({ message: 'Étudiant supprimé', student: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route PUT /etudiant/:id : met à jour un étudiant
app.put('/etudiant/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide, veuillez fournir un ObjectId MongoDB valide.' });
  }
  try {
    const updated = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }
    res.json({ message: 'Étudiant mis à jour', student: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route PATCH /etudiant/:id : met à jour partiellement un étudiant
app.patch('/etudiant/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide, veuillez fournir un ObjectId MongoDB valide.' });
  }
  try {
    const updated = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Étudiant non trouvé' });
    }
    res.json({ message: 'Étudiant mis à jour (partiel)', student: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Serveur Express démarré sur http://localhost:${port}`);
});
