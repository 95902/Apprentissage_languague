# Guide : Ajouter des Cours à la Plateforme

Ce guide explique comment ajouter des cours, leçons et quiz à la plateforme d'apprentissage.

## Table des matières

1. [Méthode 1 : Via l'API (Recommandé)](#méthode-1--via-lapi-recommandé)
2. [Méthode 2 : Directement dans la base de données](#méthode-2--directement-dans-la-base-de-données)
3. [Méthode 3 : Interface d'administration](#méthode-3--interface-dadministration)
4. [Structure d'un cours complet](#structure-dun-cours-complet)
5. [Exemples pratiques](#exemples-pratiques)

---

## Méthode 1 : Via l'API (Recommandé)

### Prérequis

- Le backend doit être démarré
- Vous devez être authentifié (récupérer un token JWT)

### Étape 1 : S'authentifier

```bash
# Se connecter et récupérer le token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Réponse :**
```json
{
  "message": "Connexion réussie",
  "user": {...},
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Copiez le `token` pour les requêtes suivantes.

### Étape 2 : Créer un cours

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "title": "Python pour Débutants",
    "description": "Apprenez les bases de Python : variables, boucles, fonctions et plus encore",
    "language": "Python",
    "level": "beginner",
    "total_lessons": 0,
    "image_url": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400"
  }'
```

**Réponse :**
```json
{
  "id": 10,
  "title": "Python pour Débutants",
  "description": "Apprenez les bases de Python...",
  "language": "Python",
  "level": "beginner",
  "total_lessons": 0,
  "image_url": "https://...",
  "created_at": "2025-01-19 12:00:00",
  "updated_at": "2025-01-19 12:00:00"
}
```

**Notez l'ID du cours** (ici : `10`)

### Étape 3 : Ajouter des leçons

```bash
curl -X POST http://localhost:3000/api/courses/lessons \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "course_id": 10,
    "title": "Introduction à Python",
    "description": "Découvrez Python et vos premières variables",
    "content": "# Introduction à Python\n\nPython est un langage de programmation...",
    "code_example": "# Premier programme Python\nprint(\"Hello World!\")\n\n# Variables\nnom = \"Alice\"\nage = 25\nprint(f\"Je m'\''appelle {nom} et j'\''ai {age} ans\")",
    "exercise": "Créez trois variables : votre prénom, votre âge et votre ville. Affichez-les avec print().",
    "order_index": 1,
    "duration": 30
  }'
```

Le compteur `total_lessons` du cours sera automatiquement mis à jour.

### Étape 4 : Créer un quiz

```bash
curl -X POST http://localhost:3000/api/quizzes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -d '{
    "course_id": 10,
    "title": "Quiz Python Débutant",
    "description": "Testez vos connaissances sur les bases de Python",
    "passing_score": 70
  }'
```

**Réponse :**
```json
{
  "id": 2,
  "course_id": 10,
  "title": "Quiz Python Débutant",
  ...
}
```

**Notez l'ID du quiz** (ici : `2`)

### Étape 5 : Ajouter des questions au quiz

Pour chaque question, vous devez insérer directement dans la base de données ou créer un endpoint dédié (voir plus bas).

---

## Méthode 2 : Directement dans la base de données

### Prérequis

- Installer `sqlite3` ou un client SQLite
- Le backend doit être arrêté

### Ouvrir la base de données

```bash
cd backend/database
sqlite3 learning_platform.db
```

### Ajouter un cours

```sql
INSERT INTO courses (title, description, language, level, total_lessons, image_url)
VALUES (
  'Python pour Débutants',
  'Apprenez les bases de Python : variables, boucles, fonctions',
  'Python',
  'beginner',
  0,
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
);

-- Récupérer l'ID du cours créé
SELECT last_insert_rowid();
```

Notez l'ID retourné (ex: `10`)

### Ajouter des leçons

```sql
INSERT INTO lessons (
  course_id, title, description, content, code_example, exercise, order_index, duration
)
VALUES (
  10,
  'Introduction à Python',
  'Découvrez Python et vos premières variables',
  '# Introduction à Python

Python est un langage de programmation populaire et facile à apprendre.

## Les Variables

En Python, on déclare des variables simplement :

```python
nom = "Alice"
age = 25
```

Les variables peuvent contenir différents types de données :
- Chaînes de caractères (strings)
- Nombres entiers (int)
- Nombres décimaux (float)
- Booléens (bool)',
  '# Premier programme Python
print("Hello World!")

# Variables
nom = "Alice"
age = 25
print(f"Je m''appelle {nom} et j''ai {age} ans")',
  'Créez trois variables : votre prénom, votre âge et votre ville. Affichez-les avec print().',
  1,
  30
);

-- Ajouter d'autres leçons
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
  10,
  'Les conditions en Python',
  'Apprenez à utiliser if, elif et else',
  '# Les Conditions en Python

Les conditions permettent d''exécuter du code selon des circonstances.

## Structure if/else

```python
age = 18
if age >= 18:
    print("Vous êtes majeur")
else:
    print("Vous êtes mineur")
```',
  'age = 18

if age >= 18:
    print("Vous êtes majeur")
elif age >= 13:
    print("Vous êtes adolescent")
else:
    print("Vous êtes enfant")

# Opérateurs de comparaison
nombre = 10
if nombre > 5:
    print("Le nombre est supérieur à 5")',
  'Créez une variable "note" (0-20) et affichez "Excellent" si >= 16, "Bien" si >= 14, "Moyen" si >= 10, sinon "Insuffisant".',
  2,
  35
);
```

### Ajouter un quiz

```sql
INSERT INTO quizzes (course_id, title, description, passing_score)
VALUES (
  10,
  'Quiz Python Débutant',
  'Testez vos connaissances sur les bases de Python',
  70
);

-- Récupérer l'ID du quiz
SELECT last_insert_rowid();
```

### Ajouter des questions

```sql
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
(2, 'Comment affiche-t-on du texte en Python ?',
 'echo("Hello")', 'print("Hello")', 'console.log("Hello")', 'printf("Hello")', 'B',
 'En Python, on utilise print() pour afficher du texte.'),

(2, 'Quel est le résultat de : type(5) ?',
 '<class ''int''>', '<class ''float''>', '<class ''str''>', '<class ''number''>', 'A',
 'Le nombre 5 est un entier (integer), donc type(5) retourne <class ''int''>'),

(2, 'Comment créer une variable en Python ?',
 'var x = 10', 'let x = 10', 'x = 10', 'int x = 10', 'C',
 'En Python, on crée une variable simplement avec le nom suivi du signe ='),

(2, 'Quel opérateur teste l''égalité ?',
 '=', '==', '===', '!=', 'B',
 'L''opérateur == teste l''égalité de valeurs en Python.'),

(2, 'Comment commence un commentaire en Python ?',
 '//', '/* */', '#', '--', 'C',
 'En Python, les commentaires commencent par le symbole #');
```

### Quitter SQLite

```sql
.exit
```

---

## Méthode 3 : Interface d'administration

Je peux créer une interface d'administration React pour gérer les cours facilement. Voici comment :

### Créer une page Admin

Je vais créer un composant React pour ajouter des cours via l'interface :

```jsx
// frontend/src/pages/AdminPage.jsx
import React, { useState } from 'react';
import { courseService } from '../services/api';

const AdminPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'JavaScript',
    level: 'beginner',
    image_url: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await courseService.create(formData);
      alert('Cours créé avec succès ! ID: ' + response.data.id);
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        language: 'JavaScript',
        level: 'beginner',
        image_url: ''
      });
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  return (
    <div className="container" style={{padding: 'var(--spacing-2xl) 0'}}>
      <h1>Administration - Ajouter un cours</h1>

      <form onSubmit={handleSubmit} className="card" style={{maxWidth: '600px', marginTop: 'var(--spacing-xl)'}}>
        <div style={{marginBottom: 'var(--spacing-md)'}}>
          <label>Titre du cours</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div style={{marginBottom: 'var(--spacing-md)'}}>
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows="3"
            required
          />
        </div>

        <div style={{marginBottom: 'var(--spacing-md)'}}>
          <label>Langage</label>
          <select
            value={formData.language}
            onChange={(e) => setFormData({...formData, language: e.target.value})}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="PHP">PHP</option>
            <option value="Python">Python</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
          </select>
        </div>

        <div style={{marginBottom: 'var(--spacing-md)'}}>
          <label>Niveau</label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({...formData, level: e.target.value})}
          >
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>
        </div>

        <div style={{marginBottom: 'var(--spacing-md)'}}>
          <label>URL de l'image (optionnel)</label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Créer le cours
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
```

Voulez-vous que je crée cette interface d'administration complète ?

---

## Structure d'un cours complet

Voici la structure recommandée :

```
Cours "Python pour Débutants" (ID: 10)
│
├── Leçon 1: Introduction à Python (order_index: 1)
│   ├── Titre
│   ├── Description
│   ├── Contenu (Markdown)
│   ├── Exemple de code
│   ├── Exercice
│   └── Durée: 30 min
│
├── Leçon 2: Les conditions (order_index: 2)
│   └── ...
│
├── Leçon 3: Les boucles (order_index: 3)
│   └── ...
│
├── Leçon 4: Les fonctions (order_index: 4)
│   └── ...
│
└── Quiz Final
    ├── Question 1
    ├── Question 2
    ├── Question 3
    └── ...
```

---

## Exemples pratiques

### Exemple complet : Cours Python

Voici un fichier SQL complet pour ajouter un cours Python :

```sql
-- 1. Créer le cours
INSERT INTO courses (title, description, language, level, total_lessons, image_url)
VALUES (
  'Python pour Débutants',
  'Découvrez Python, un langage puissant et facile à apprendre. Variables, conditions, boucles et fonctions.',
  'Python',
  'beginner',
  4,
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
);

-- Supposons que l'ID du cours est 10

-- 2. Ajouter les leçons
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES
(10, 'Introduction et Variables', 'Premiers pas avec Python',
'# Introduction à Python

Python est un langage de programmation populaire créé en 1991.

## Pourquoi Python ?
- Facile à apprendre
- Polyvalent
- Grande communauté

## Les Variables
En Python, créer une variable est simple :

```python
nom = "Alice"
age = 25
```',
'# Affichage simple
print("Hello World!")

# Variables
nom = "Alice"
age = 25
ville = "Paris"

# Affichage avec f-string
print(f"Je m''appelle {nom}, j''ai {age} ans et j''habite à {ville}")

# Types de données
nombre_entier = 42
nombre_decimal = 3.14
est_vrai = True',
'Créez 4 variables : prénom, nom, âge et ville. Affichez une phrase complète avec toutes ces informations.',
1, 30),

(10, 'Les Conditions', 'Prenez des décisions avec if/else',
'# Les Conditions en Python

Les conditions permettent d''exécuter du code selon des critères.

## Structure de base

```python
if condition:
    # Code si vrai
else:
    # Code si faux
```

## Opérateurs de comparaison
- `==` : égal à
- `!=` : différent de
- `>`, `<`, `>=`, `<=` : comparaisons',
'age = 18

# Condition simple
if age >= 18:
    print("Majeur")
else:
    print("Mineur")

# Conditions multiples
note = 15
if note >= 16:
    print("Excellent")
elif note >= 14:
    print("Bien")
elif note >= 10:
    print("Moyen")
else:
    print("Insuffisant")',
'Créez un programme qui demande un nombre et affiche "Positif", "Négatif" ou "Zéro".',
2, 35);

-- 3. Créer un quiz
INSERT INTO quizzes (course_id, title, description, passing_score)
VALUES (10, 'Quiz Python Débutant', 'Validez vos connaissances de base', 70);

-- Supposons que l'ID du quiz est 2

-- 4. Ajouter les questions
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
(2, 'Comment affiche-t-on du texte en Python ?',
 'echo("Hello")', 'print("Hello")', 'console.log("Hello")', 'printf("Hello")', 'B',
 'La fonction print() est utilisée pour afficher du texte en Python.'),

(2, 'Quel est le type de la variable : x = 5 ?',
 'string', 'int', 'float', 'boolean', 'B',
 'Le nombre 5 sans point décimal est un entier (int).'),

(2, 'Comment créer un commentaire en Python ?',
 '// commentaire', '/* commentaire */', '# commentaire', '-- commentaire', 'C',
 'Les commentaires Python commencent par #');
```

---

## Scripts utiles

### Script pour ajouter un cours rapidement

Créez un fichier `backend/scripts/addCourse.js` :

```javascript
import db from '../src/config/database.js';

const courseData = {
  title: 'Python pour Débutants',
  description: 'Apprenez les bases de Python',
  language: 'Python',
  level: 'beginner',
  image_url: 'https://...'
};

const stmt = db.prepare(`
  INSERT INTO courses (title, description, language, level, total_lessons, image_url)
  VALUES (?, ?, ?, ?, 0, ?)
`);

const result = stmt.run(
  courseData.title,
  courseData.description,
  courseData.language,
  courseData.level,
  courseData.image_url
);

console.log('✅ Cours créé avec ID:', result.lastInsertRowid);
```

Exécutez :
```bash
node backend/scripts/addCourse.js
```

---

## Recommandations

1. **Ordre des leçons** : Utilisez `order_index` pour définir l'ordre (1, 2, 3, ...)
2. **Durée** : Estimez en minutes (30, 45, 60...)
3. **Contenu** : Utilisez le format Markdown pour le `content`
4. **Exercices** : Soyez clairs et précis
5. **Quiz** : 5-10 questions par cours
6. **Images** : Utilisez Unsplash pour des images libres de droits

---

## Questions fréquentes

**Q : Dois-je redémarrer le serveur après avoir ajouté un cours ?**
R : Non, si vous utilisez l'API. Oui, si vous modifiez directement la base de données.

**Q : Comment modifier un cours existant ?**
R : Utilisez SQL UPDATE ou créez un endpoint PUT dans l'API.

**Q : Puis-je utiliser l'IA pour générer du contenu ?**
R : Oui ! Utilisez l'endpoint `/api/llm/generate-exercise` pour générer des exercices.

---

Besoin d'aide ? Consultez la documentation ou créez une issue sur GitHub.
