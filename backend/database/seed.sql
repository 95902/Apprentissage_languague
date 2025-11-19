-- Données d'exemple pour la plateforme d'apprentissage

-- Badges
INSERT INTO badges (name, description, icon, criteria, language) VALUES
('Débutant PHP', 'Premier module PHP validé', '🌱', 'first_module', 'PHP'),
('Débutant JavaScript', 'Premier module JavaScript validé', '🌱', 'first_module', 'JavaScript'),
('Débutant CSS', 'Premier module CSS validé', '🌱', 'first_module', 'CSS'),
('Débutant HTML', 'Premier module HTML validé', '🌱', 'first_module', 'HTML'),
('Premier Quiz', 'Premier quiz réussi', '✅', 'first_quiz', NULL),
('Expert PHP', 'Tous les modules PHP complétés', '🏆', 'complete_language', 'PHP'),
('Expert JavaScript', 'Tous les modules JavaScript complétés', '🏆', 'complete_language', 'JavaScript'),
('Expert CSS', 'Tous les modules CSS complétés', '🏆', 'complete_language', 'CSS'),
('Expert HTML', 'Tous les modules HTML complétés', '🏆', 'complete_language', 'HTML'),
('Maître du Code', 'Tous les modules de tous les langages complétés', '👑', 'complete_all', NULL);

-- Cours PHP
INSERT INTO courses (title, description, language, level, total_lessons, image_url) VALUES
('PHP pour Débutants', 'Apprenez les bases du PHP : variables, conditions, boucles et fonctions', 'PHP', 'beginner', 5, 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400'),
('PHP Intermédiaire', 'Programmation orientée objet, bases de données et sécurité', 'PHP', 'intermediate', 6, 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400'),
('PHP Avancé', 'Design patterns, architecture MVC et frameworks modernes', 'PHP', 'advanced', 7, 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400');

-- Cours JavaScript
INSERT INTO courses (title, description, language, level, total_lessons, image_url) VALUES
('JavaScript pour Débutants', 'Les fondamentaux de JavaScript : syntaxe, DOM et événements', 'JavaScript', 'beginner', 6, 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400'),
('JavaScript Moderne', 'ES6+, asynchrone, fetch API et modules', 'JavaScript', 'intermediate', 7, 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400'),
('JavaScript Avancé', 'React, Node.js et architecture d\'applications', 'JavaScript', 'advanced', 8, 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400');

-- Cours CSS
INSERT INTO courses (title, description, language, level, total_lessons, image_url) VALUES
('CSS Débutant', 'Sélecteurs, propriétés, box model et positionnement', 'CSS', 'beginner', 5, 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400'),
('CSS Intermédiaire', 'Flexbox, Grid, animations et responsive design', 'CSS', 'intermediate', 6, 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400');

-- Cours HTML
INSERT INTO courses (title, description, language, level, total_lessons, image_url) VALUES
('HTML pour Débutants', 'Structure HTML, balises essentielles et sémantique', 'HTML', 'beginner', 4, 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400');

-- Leçons PHP Débutant (Course ID = 1)
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration) VALUES
(1, 'Introduction et Variables',
'Découvrez les bases de PHP et apprenez à manipuler les variables',
'# Introduction à PHP

PHP (Hypertext Preprocessor) est un langage de script côté serveur largement utilisé pour le développement web.

## Les Variables en PHP

Les variables en PHP commencent par le symbole `$` suivi du nom de la variable.

### Règles de nommage :
- Commence par une lettre ou un underscore
- Peut contenir des lettres, chiffres et underscores
- Sensible à la casse (case-sensitive)

### Types de données :
- **String** : chaînes de caractères
- **Integer** : nombres entiers
- **Float** : nombres décimaux
- **Boolean** : true/false
- **Array** : tableaux
- **NULL** : valeur nulle',
'<?php
// Déclaration de variables
$nom = "Alice";
$age = 25;
$taille = 1.65;
$estEtudiant = true;

// Affichage
echo "Nom : " . $nom . "<br>";
echo "Age : " . $age . " ans<br>";
echo "Taille : " . $taille . "m<br>";

// Concaténation
$message = "Bonjour " . $nom . ", vous avez " . $age . " ans.";
echo $message;
?>',
'Créez trois variables : votre prénom, votre âge et votre ville. Affichez-les avec echo en construisant une phrase complète.',
1, 30),

(1, 'Conditions et Structures de Contrôle',
'Apprenez à utiliser les conditions if, else et switch',
'# Les Conditions en PHP

Les conditions permettent d\'exécuter du code selon certaines circonstances.

## Structure if/else

```php
if (condition) {
    // Code si vrai
} else {
    // Code si faux
}
```

## Opérateurs de comparaison :
- `==` : égal à
- `===` : strictement égal (type et valeur)
- `!=` ou `<>` : différent de
- `!==` : strictement différent
- `>`, `<`, `>=`, `<=` : comparaisons numériques

## Opérateurs logiques :
- `&&` ou `and` : ET logique
- `||` ou `or` : OU logique
- `!` : NON logique',
'<?php
$age = 18;
$permis = true;

// Condition simple
if ($age >= 18) {
    echo "Vous êtes majeur<br>";
} else {
    echo "Vous êtes mineur<br>";
}

// Conditions multiples
if ($age >= 18 && $permis) {
    echo "Vous pouvez conduire<br>";
} elseif ($age >= 18 && !$permis) {
    echo "Vous devez passer le permis<br>";
} else {
    echo "Vous êtes trop jeune pour conduire<br>";
}

// Switch
$jour = "lundi";
switch ($jour) {
    case "lundi":
    case "mardi":
        echo "Début de semaine";
        break;
    case "vendredi":
        echo "Bientôt le weekend !";
        break;
    default:
        echo "Jour normal";
}
?>',
'Créez une variable $note (entre 0 et 20). Affichez "Excellent" si >= 16, "Bien" si >= 14, "Moyen" si >= 10, sinon "Insuffisant".',
2, 35),

(1, 'Les Boucles',
'Maîtrisez les boucles for, while et foreach',
'# Les Boucles en PHP

Les boucles permettent de répéter du code plusieurs fois.

## Boucle for
Utilisée quand on connaît le nombre d\'itérations.

```php
for ($i = 0; $i < 10; $i++) {
    // Code à répéter
}
```

## Boucle while
Continue tant que la condition est vraie.

```php
while (condition) {
    // Code à répéter
}
```

## Boucle foreach
Idéale pour parcourir les tableaux.

```php
foreach ($tableau as $valeur) {
    // Code avec $valeur
}
```',
'<?php
// Boucle for
echo "Table de 5 :<br>";
for ($i = 1; $i <= 10; $i++) {
    echo "5 x $i = " . (5 * $i) . "<br>";
}

// Boucle while
echo "<br>Compte à rebours :<br>";
$count = 5;
while ($count > 0) {
    echo $count . "...<br>";
    $count--;
}
echo "Décollage !<br>";

// Boucle foreach
$fruits = ["pomme", "banane", "orange", "fraise"];
echo "<br>Liste de fruits :<br>";
foreach ($fruits as $fruit) {
    echo "- $fruit<br>";
}

// Foreach avec index
foreach ($fruits as $index => $fruit) {
    echo "Fruit #" . ($index + 1) . " : $fruit<br>";
}
?>',
'Créez un tableau de 5 nombres. Utilisez une boucle foreach pour calculer et afficher leur somme totale.',
3, 40),

(1, 'Les Tableaux (Arrays)',
'Découvrez les tableaux indexés et associatifs',
'# Les Tableaux en PHP

Les tableaux permettent de stocker plusieurs valeurs dans une seule variable.

## Tableaux indexés
Utilisent des index numériques (0, 1, 2...).

```php
$fruits = ["pomme", "banane", "orange"];
echo $fruits[0]; // pomme
```

## Tableaux associatifs
Utilisent des clés nommées.

```php
$personne = [
    "nom" => "Dupont",
    "age" => 30
];
echo $personne["nom"]; // Dupont
```

## Fonctions utiles :
- `count()` : nombre d\'éléments
- `array_push()` : ajouter un élément
- `in_array()` : vérifier la présence
- `sort()` : trier',
'<?php
// Tableau indexé
$nombres = [10, 20, 30, 40, 50];
echo "Premier nombre : " . $nombres[0] . "<br>";
echo "Nombre d\'éléments : " . count($nombres) . "<br>";

// Ajouter un élément
$nombres[] = 60; // ou array_push($nombres, 60);

// Tableau associatif
$etudiant = [
    "nom" => "Martin",
    "prenom" => "Sophie",
    "age" => 22,
    "note" => 15.5
];

echo "<br>Étudiant : " . $etudiant["prenom"] . " " . $etudiant["nom"] . "<br>";
echo "Note : " . $etudiant["note"] . "/20<br>";

// Parcourir un tableau associatif
foreach ($etudiant as $cle => $valeur) {
    echo "$cle : $valeur<br>";
}

// Tableau multidimensionnel
$classes = [
    "A" => ["Alice", "Bob", "Charlie"],
    "B" => ["David", "Emma", "Frank"]
];

echo "<br>Classe A :<br>";
foreach ($classes["A"] as $eleve) {
    echo "- $eleve<br>";
}
?>',
'Créez un tableau associatif représentant un livre (titre, auteur, année, prix). Affichez toutes les informations en boucle.',
4, 45),

(1, 'Les Fonctions',
'Créez et utilisez vos propres fonctions',
'# Les Fonctions en PHP

Les fonctions permettent de réutiliser du code.

## Syntaxe de base

```php
function nomFonction($param1, $param2) {
    // Code
    return $resultat;
}
```

## Points clés :
- Utilisez `function` pour déclarer
- Les paramètres sont optionnels
- `return` renvoie une valeur
- Les fonctions peuvent être appelées avant leur déclaration

## Paramètres par défaut

```php
function saluer($nom = "invité") {
    return "Bonjour $nom !";
}
```

## Portée des variables (scope)
- Variables locales : dans la fonction
- Variables globales : mot-clé `global`',
'<?php
// Fonction simple
function direBonjour($nom) {
    return "Bonjour " . $nom . " !";
}

echo direBonjour("Alice") . "<br>";

// Fonction avec plusieurs paramètres
function calculerSurface($longueur, $largeur) {
    return $longueur * $largeur;
}

$surface = calculerSurface(5, 3);
echo "Surface : $surface m²<br>";

// Paramètre par défaut
function puissance($nombre, $exposant = 2) {
    return pow($nombre, $exposant);
}

echo "3² = " . puissance(3) . "<br>";
echo "2⁴ = " . puissance(2, 4) . "<br>";

// Fonction sans retour
function afficherTableau($tableau) {
    foreach ($tableau as $item) {
        echo "- $item<br>";
    }
}

$fruits = ["pomme", "banane", "orange"];
echo "<br>Fruits :<br>";
afficherTableau($fruits);

// Typage (PHP 7+)
function additionner(int $a, int $b): int {
    return $a + $b;
}

echo "<br>5 + 3 = " . additionner(5, 3);
?>',
'Créez une fonction calculerMoyenne() qui prend un tableau de notes et retourne la moyenne. Testez-la avec [12, 15, 18, 10, 14].',
5, 40);

-- Quiz PHP Débutant
INSERT INTO quizzes (course_id, title, description, passing_score) VALUES
(1, 'Quiz PHP Débutant', 'Testez vos connaissances sur les bases de PHP', 70);

-- Questions Quiz PHP Débutant
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation) VALUES
(1, 'Comment déclare-t-on une variable en PHP ?',
'var $nom', '$nom', 'let $nom', 'variable $nom', 'B',
'En PHP, les variables commencent par le symbole $ suivi du nom de la variable.'),

(1, 'Quel opérateur teste l''égalité stricte (type et valeur) ?',
'==', '=', '===', '!=', 'C',
'L''opérateur === teste l''égalité stricte, c''est-à-dire le type ET la valeur.'),

(1, 'Quelle boucle est idéale pour parcourir un tableau ?',
'for', 'while', 'foreach', 'do-while', 'C',
'La boucle foreach est spécialement conçue pour parcourir les tableaux en PHP.'),

(1, 'Comment ajoute-t-on un élément à la fin d''un tableau ?',
'array_add()', '$tableau[] = valeur', 'push($tableau)', 'add($tableau)', 'B',
'La syntaxe $tableau[] = valeur ajoute un élément à la fin du tableau.'),

(1, 'Quel mot-clé permet de renvoyer une valeur dans une fonction ?',
'return', 'send', 'give', 'output', 'A',
'Le mot-clé return permet de renvoyer une valeur depuis une fonction.'),

(1, 'Comment concatène-t-on deux chaînes en PHP ?',
'+', '&', '.', ',', 'C',
'L''opérateur point (.) est utilisé pour concaténer des chaînes en PHP.'),

(1, 'Quelle fonction retourne le nombre d''éléments dans un tableau ?',
'length()', 'size()', 'count()', 'total()', 'C',
'La fonction count() retourne le nombre d''éléments d''un tableau.'),

(1, 'Comment déclare-t-on une fonction en PHP ?',
'func maFonction()', 'function maFonction()', 'def maFonction()', 'create maFonction()', 'B',
'Le mot-clé function est utilisé pour déclarer une fonction en PHP.'),

(1, 'Quel est le résultat de : $a = "5"; $b = 5; echo $a == $b; ?',
'true', 'false', 'error', 'null', 'A',
'L''opérateur == compare les valeurs après conversion de type, donc "5" == 5 est true.'),

(1, 'Comment crée-t-on un tableau associatif ?',
'$tab = (1, 2, 3)', '$tab = ["a" => 1]', '$tab = {a: 1}', '$tab = array(1, 2)', 'B',
'La syntaxe ["clé" => valeur] crée un tableau associatif en PHP.');

-- Leçons JavaScript Débutant (Course ID = 4)
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration) VALUES
(4, 'Introduction à JavaScript',
'Découvrez JavaScript et vos premières variables',
'# Introduction à JavaScript

JavaScript est le langage de programmation du web, permettant de rendre les pages interactives.

## Les Variables

En JavaScript moderne (ES6+), on utilise :
- `let` : pour les variables modifiables
- `const` : pour les constantes
- `var` : ancienne syntaxe (à éviter)

## Types de données :
- **String** : chaînes de caractères
- **Number** : nombres (entiers et décimaux)
- **Boolean** : true/false
- **Array** : tableaux
- **Object** : objets
- **null** et **undefined**',
'// Déclaration de variables
let nom = "Alice";
const age = 25;
let taille = 1.65;
let estEtudiant = true;

// Affichage dans la console
console.log("Nom :", nom);
console.log("Age :", age, "ans");

// Concaténation
let message = "Bonjour " + nom + ", vous avez " + age + " ans.";
console.log(message);

// Template literals (ES6)
let message2 = `Bonjour ${nom}, vous avez ${age} ans.`;
console.log(message2);

// Types de données
console.log(typeof nom);      // string
console.log(typeof age);       // number
console.log(typeof estEtudiant); // boolean',
'Créez trois variables avec let ou const : prénom, âge et ville. Affichez-les avec console.log() en utilisant des template literals.',
1, 30);
