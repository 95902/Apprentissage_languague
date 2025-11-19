# Cours PHP Complets - Débutant à Intermédiaire 📚

Ce document décrit les cours PHP disponibles dans la plateforme.

## 📋 Vue d'ensemble

### Cours PHP Débutant - Les Fondamentaux
**Niveau** : Débutant
**Nombre de leçons** : 5
**Durée totale** : ~3h
**Quiz** : 10 questions

#### Contenu du cours :

1. **Introduction à PHP et Premier Script** (30 min)
   - Qu'est-ce que PHP ?
   - Installation (XAMPP, WAMP, MAMP)
   - Structure d'un fichier PHP
   - Premier script "Hello World"
   - Commentaires en PHP

2. **Variables et Types de Données** (40 min)
   - Déclaration de variables ($variable)
   - Règles de nommage
   - Types : String, Integer, Float, Boolean, NULL
   - Opérateurs mathématiques
   - var_dump() pour le débogage

3. **Les Structures Conditionnelles** (45 min)
   - if / else / elseif
   - Opérateurs de comparaison (==, ===, !=, <, >, etc.)
   - Opérateurs logiques (&&, ||, !)
   - Switch / case
   - Opérateur ternaire

4. **Les Boucles** (50 min)
   - Boucle for
   - Boucle while
   - Boucle do...while
   - Boucle foreach (introduction)
   - break et continue
   - Boucles imbriquées

5. **Les Tableaux (Arrays)** (50 min)
   - Tableaux indexés
   - Tableaux associatifs
   - Tableaux multidimensionnels
   - Fonctions : count(), array_push(), sort(), etc.
   - Parcourir avec foreach
   - Manipulation de tableaux

**Quiz Final** : 10 questions couvrant tous les concepts

---

### Cours PHP Intermédiaire - POO et Bases de Données
**Niveau** : Intermédiaire
**Nombre de leçons** : 6
**Durée totale** : ~5h
**Quiz** : 10 questions

#### Contenu du cours :

1. **Les Fonctions : Création et Utilisation** (45 min)
   - Syntaxe des fonctions
   - Paramètres et valeurs de retour
   - Paramètres par défaut
   - Portée des variables (global, local)
   - Fonctions variables et anonymes
   - Fonctions récursives
   - Typage (PHP 7+)

2. **Programmation Orientée Objet - Les Classes** (60 min)
   - Concepts POO : classe, objet, propriété, méthode
   - Créer une classe et instancier un objet
   - Le constructeur __construct()
   - Le mot-clé $this
   - Visibilité : public, private, protected
   - Getters et Setters
   - Encapsulation

3. **Héritage et Concepts Avancés** (55 min)
   - Héritage avec extends
   - Le mot-clé parent
   - Surcharge de méthodes
   - Classes abstraites
   - Méthodes et propriétés statiques
   - Constantes de classe
   - Le mot-clé final

4. **Bases de Données MySQL - Partie 1** (60 min)
   - Introduction à MySQL
   - Créer une base de données
   - Types de données SQL
   - CREATE TABLE
   - INSERT, SELECT, UPDATE, DELETE
   - WHERE, ORDER BY, LIMIT

5. **PDO : Connexion et Requêtes Sécurisées** (60 min)
   - Qu'est-ce que PDO ?
   - Se connecter à MySQL avec PDO
   - Requêtes préparées
   - Protection contre les injections SQL
   - Fetch et FetchAll
   - Gestion des erreurs

6. **Projet Final : CRUD Complet** (70 min)
   - Create : Ajouter des données
   - Read : Lire et afficher
   - Update : Modifier des données
   - Delete : Supprimer des données
   - Pagination
   - Recherche et filtres

**Quiz Final** : 10 questions sur POO et BDD

---

## 🚀 Installation des cours

### Méthode 1 : Script automatique (Recommandé)

```bash
cd backend
npm run import-php
```

Cette commande va :
- ✅ Importer tous les cours PHP
- ✅ Ajouter toutes les leçons
- ✅ Créer les quiz avec questions
- ✅ Afficher un résumé

### Méthode 2 : Importation manuelle via SQLite

```bash
cd backend/database
sqlite3 learning_platform.db

-- Copier/coller le contenu de cours_php_complet.sql
-- puis cours_php_intermediaire.sql

.exit
```

### Méthode 3 : Via l'interface Admin

1. Connectez-vous sur la plateforme
2. Allez sur `/admin`
3. Créez manuellement chaque cours et leçon

---

## 📚 Structure des fichiers

```
backend/database/
├── cours_php_complet.sql        # Cours débutant complet
├── cours_php_intermediaire.sql  # Cours intermédiaire
└── learning_platform.db         # Base de données SQLite

backend/scripts/
└── importerCoursPhp.js          # Script d'importation
```

---

## 🎯 Utilisation des cours

### Pour les étudiants :

1. **Connectez-vous** sur la plateforme
2. **Parcourez les cours** : Allez sur `/courses`
3. **Filtrez par PHP** : Cliquez sur le filtre "PHP"
4. **Commencez un cours** : Cliquez sur "PHP Débutant"
5. **Suivez les leçons** dans l'ordre
6. **Passez les quiz** pour valider vos connaissances
7. **Gagnez des badges** ! 🏆

### Pour les formateurs :

1. **Modifiez les leçons** : Éditez les fichiers `.sql`
2. **Réimportez** : `npm run import-php`
3. **Ajoutez du contenu** : Utilisez l'interface admin
4. **Utilisez l'IA** : Générez des exercices avec `/assistant`

---

## 💡 Exemples de code inclus

Chaque leçon contient :

### ✅ Explication théorique
Concepts expliqués clairement avec exemples

### ✅ Code d'exemple commenté
```php
<?php
// Code prêt à copier/coller
$variable = "valeur";
echo $variable;
?>
```

### ✅ Exercices pratiques
Mettez en pratique ce que vous avez appris

### ✅ Mini-projets
Consolidez vos connaissances avec des projets

---

## 📊 Progression et Badges

### Badges disponibles pour PHP :

- **🌱 Débutant PHP** : Complétez votre première leçon PHP
- **✅ Premier Quiz PHP** : Réussissez votre premier quiz PHP (score ≥ 70%)
- **🏆 Expert PHP** : Complétez tous les cours PHP

Les badges sont attribués **automatiquement** !

---

## 🎨 Format du contenu

### Leçons en Markdown

Les leçons utilisent le format Markdown pour un affichage riche :

- `#` : Titres
- `**texte**` : Gras
- \`code\` : Code inline
- \`\`\`php ... \`\`\` : Blocs de code
- `- item` : Listes à puces

### Code colorisé

Tous les exemples de code PHP sont affichés avec coloration syntaxique.

---

## 🔧 Personnalisation

### Modifier une leçon

1. Ouvrez `cours_php_complet.sql` ou `cours_php_intermediaire.sql`
2. Trouvez la leçon à modifier
3. Éditez le contenu (attention à échapper les apostrophes : `''`)
4. Réimportez : `npm run import-php`

### Ajouter une leçon

```sql
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
  11,  -- ID du cours PHP Débutant
  'Nouvelle Leçon',
  'Description courte',
  '# Contenu en Markdown',
  '<?php /* Code */ ?>',
  'Exercice à faire',
  6,   -- Ordre (après la leçon 5)
  30   -- Durée en minutes
);
```

### Ajouter une question de quiz

```sql
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES (
  3,  -- ID du quiz
  'Ma question ?',
  'Réponse A',
  'Réponse B',
  'Réponse C',
  'Réponse D',
  'A',  -- Bonne réponse
  'Explication de la réponse'
);
```

---

## 📖 Ressources supplémentaires

### Liens utiles :

- [Documentation PHP officielle](https://www.php.net/manual/fr/)
- [W3Schools PHP Tutorial](https://www.w3schools.com/php/)
- [PHP: The Right Way](https://phptherightway.com/)

### Prochains cours à venir :

- PHP Avancé : Design Patterns, Namespaces, Composer
- PHP Frameworks : Laravel, Symfony
- APIs REST avec PHP
- Sécurité Web avec PHP

---

## ❓ FAQ

**Q : Combien de temps pour terminer le cours débutant ?**
R : Environ 3-4 heures si vous faites tous les exercices.

**Q : Dois-je connaître HTML pour apprendre PHP ?**
R : C'est recommandé mais pas obligatoire. Les bases HTML aident.

**Q : Les cours sont-ils gratuits ?**
R : Oui, 100% gratuits et open-source !

**Q : Puis-je utiliser ces cours pour enseigner ?**
R : Absolument ! La plateforme est faite pour ça.

**Q : Comment obtenir de l'aide ?**
R : Utilisez l'Assistant IA intégré sur `/assistant` !

---

## 🤝 Contribution

Vous souhaitez améliorer les cours ?

1. Proposez vos modifications dans les fichiers `.sql`
2. Testez en local
3. Soumettez une pull request

---

## 📝 Notes de version

### v1.0 - Janvier 2025
- ✅ Cours PHP Débutant complet (5 leçons)
- ✅ Cours PHP Intermédiaire (3 leçons POO)
- ✅ 2 quiz avec 20 questions
- ✅ Exemples de code détaillés
- ✅ Exercices pratiques

### À venir dans v1.1
- Leçons sur MySQL et PDO
- Projet final CRUD
- Plus d'exercices interactifs
- Vidéos de démonstration

---

**Bon apprentissage avec PHP ! 🚀**

Pour toute question, consultez la documentation ou utilisez l'Assistant IA.
