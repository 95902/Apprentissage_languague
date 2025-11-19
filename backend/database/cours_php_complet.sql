-- Cours PHP Complets : Débutant à Intermédiaire
-- Ce fichier contient tous les cours, leçons et quiz pour apprendre PHP

-- ============================================
-- COURS PHP DÉBUTANT - Fondamentaux
-- ============================================

INSERT INTO courses (title, description, language, level, total_lessons, image_url)
VALUES (
  'PHP Débutant - Les Fondamentaux',
  'Maîtrisez les bases essentielles de PHP : variables, types de données, opérateurs et syntaxe de base',
  'PHP',
  'beginner',
  5,
  'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400'
);

-- Supposons que l'ID du cours est 11

-- Leçon 1 : Introduction et Installation
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
11,
'Introduction à PHP et Premier Script',
'Découvrez PHP, installez votre environnement et écrivez votre premier script',
'# Introduction à PHP

## Qu''est-ce que PHP ?

PHP (Hypertext Preprocessor) est un langage de script côté serveur créé en 1994 par Rasmus Lerdorf. Il est spécialement conçu pour le développement web et peut être intégré directement dans le HTML.

## Pourquoi apprendre PHP ?

- **Facile à apprendre** : Syntaxe simple et intuitive
- **Populaire** : Utilisé par 77% des sites web (WordPress, Facebook, Wikipedia...)
- **Gratuit et Open Source** : Aucun coût de licence
- **Grande communauté** : Beaucoup de ressources et d''aide disponibles
- **Puissant** : Peut gérer des applications complexes

## Installation de l''environnement

### Option 1 : XAMPP (Recommandé pour débutants)
1. Téléchargez XAMPP depuis https://www.apachefriends.org
2. Installez-le (acceptez les paramètres par défaut)
3. Démarrez Apache depuis le panneau de contrôle XAMPP
4. Vos fichiers PHP vont dans : `C:\xampp\htdocs\`

### Option 2 : WAMP (Windows)
Alternative à XAMPP pour Windows

### Option 3 : MAMP (Mac)
Alternative pour macOS

## Structure d''un fichier PHP

Un fichier PHP commence par `<?php` et se termine par `?>` (optionnel en fin de fichier).

```php
<?php
// Votre code PHP ici
?>
```

## Votre premier script

Le fichier doit avoir l''extension `.php` (exemple : `index.php`)',

'<?php
// Premier script PHP
echo "Bonjour le monde !";
?>

<!DOCTYPE html>
<html>
<head>
    <title>Mon premier PHP</title>
</head>
<body>
    <h1><?php echo "Bienvenue dans PHP !"; ?></h1>

    <?php
    // Les commentaires en PHP
    // Commentaire sur une ligne

    /*
     * Commentaire
     * sur plusieurs
     * lignes
     */

    // Affichage de texte
    echo "PHP est génial !<br>";
    print "On peut aussi utiliser print<br>";

    // Affichage de la version PHP
    echo "Version PHP : " . phpversion();
    ?>
</body>
</html>',

'1. Créez un fichier nommé "hello.php" dans le dossier htdocs
2. Écrivez un script qui affiche votre prénom, votre âge et votre ville
3. Testez en ouvrant http://localhost/hello.php dans votre navigateur',
1, 30
);

-- Leçon 2 : Variables et Types de Données
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
11,
'Variables et Types de Données',
'Apprenez à déclarer et manipuler des variables en PHP',
'# Les Variables en PHP

## Déclaration de Variables

En PHP, les variables commencent toujours par le symbole **$** suivi du nom de la variable.

```php
$nom_variable = valeur;
```

## Règles de nommage

✅ **Autorisé :**
- Commence par une lettre ou un underscore : `$nom`, `$_age`
- Peut contenir lettres, chiffres et underscores : `$nom1`, `$mon_age`

❌ **Interdit :**
- Commence par un chiffre : `$1nom`
- Contient des espaces : `$mon nom`
- Caractères spéciaux (sauf underscore) : `$nom@`, `$nom-prenom`

⚠️ **Important :** PHP est sensible à la casse ! `$nom` ≠ `$Nom` ≠ `$NOM`

## Types de Données

### 1. String (Chaîne de caractères)
Texte entouré de guillemets simples ou doubles.

```php
$prenom = "Alice";
$ville = ''Paris'';
```

### 2. Integer (Nombre entier)
Nombres sans décimales.

```php
$age = 25;
$annee = 2025;
```

### 3. Float (Nombre décimal)
Nombres avec décimales.

```php
$taille = 1.75;
$prix = 19.99;
```

### 4. Boolean (Booléen)
Valeur vraie (true) ou fausse (false).

```php
$estMajeur = true;
$estConnecte = false;
```

### 5. NULL
Absence de valeur.

```php
$variable = null;
```

## Affichage de Variables

### Avec echo
```php
echo $prenom;
echo "Bonjour " . $prenom; // Concaténation avec .
```

### Dans des guillemets doubles
```php
echo "Bonjour $prenom"; // Interpolation
echo "J''ai $age ans";
```

## Fonction utile : var_dump()

Affiche le type et la valeur d''une variable (utile pour déboguer).

```php
var_dump($age); // int(25)
```',

'<?php
// Déclaration de variables
$prenom = "Marie";
$nom = "Dupont";
$age = 28;
$taille = 1.68;
$estEtudiante = false;
$diplome = null; // Pas encore obtenu

// Affichage simple
echo "Prénom : " . $prenom . "<br>";
echo "Nom : " . $nom . "<br>";

// Affichage avec interpolation
echo "Age : $age ans<br>";
echo "Taille : $taille m<br>";

// Concaténation de plusieurs variables
$nomComplet = $prenom . " " . $nom;
echo "Nom complet : $nomComplet<br>";

// Vérifier le type
echo "<br>Types de données :<br>";
var_dump($prenom);    // string(5) "Marie"
echo "<br>";
var_dump($age);       // int(28)
echo "<br>";
var_dump($taille);    // float(1.68)
echo "<br>";
var_dump($estEtudiante); // bool(false)
echo "<br>";
var_dump($diplome);   // NULL

// Opérations sur les nombres
$a = 10;
$b = 3;

echo "<br><br>Opérations mathématiques :<br>";
echo "Addition : $a + $b = " . ($a + $b) . "<br>";
echo "Soustraction : $a - $b = " . ($a - $b) . "<br>";
echo "Multiplication : $a * $b = " . ($a * $b) . "<br>";
echo "Division : $a / $b = " . ($a / $b) . "<br>";
echo "Modulo : $a % $b = " . ($a % $b) . "<br>";

// Incrémentation
$compteur = 0;
$compteur++;  // $compteur = $compteur + 1
echo "<br>Compteur après ++ : $compteur<br>";

$compteur += 5; // $compteur = $compteur + 5
echo "Compteur après += 5 : $compteur<br>";
?>',

'Créez un script PHP qui :
1. Déclare des variables pour : votre prénom, nom, âge, taille, et si vous êtes étudiant
2. Calcule votre année de naissance (2025 - âge)
3. Affiche toutes ces informations de manière formatée
4. Utilisez var_dump() pour vérifier les types de vos variables',
2, 40
);

-- Leçon 3 : Conditions
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
11,
'Les Structures Conditionnelles',
'Maîtrisez les conditions if, else, elseif et switch pour contrôler le flux de votre programme',
'# Les Conditions en PHP

Les conditions permettent d''exécuter du code seulement si certaines circonstances sont remplies.

## Structure if / else

```php
if (condition) {
    // Code si la condition est vraie
} else {
    // Code si la condition est fausse
}
```

## Structure if / elseif / else

```php
if (condition1) {
    // Code si condition1 est vraie
} elseif (condition2) {
    // Code si condition2 est vraie
} else {
    // Code si aucune condition n''est vraie
}
```

## Opérateurs de Comparaison

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| `==` | Égal à (valeur) | `5 == "5"` → true |
| `===` | Identique à (valeur ET type) | `5 === "5"` → false |
| `!=` ou `<>` | Différent de | `5 != 3` → true |
| `!==` | Non identique | `5 !== "5"` → true |
| `>` | Supérieur à | `10 > 5` → true |
| `<` | Inférieur à | `3 < 8` → true |
| `>=` | Supérieur ou égal | `5 >= 5` → true |
| `<=` | Inférieur ou égal | `4 <= 10` → true |

## Opérateurs Logiques

| Opérateur | Signification | Exemple |
|-----------|---------------|---------|
| `&&` ou `and` | ET logique | `($a > 5 && $b < 10)` |
| `\|\|` ou `or` | OU logique | `($a == 5 \|\| $b == 10)` |
| `!` | NON logique | `!($a > 5)` |

## Structure switch

Utile quand on a beaucoup de cas à tester.

```php
switch ($variable) {
    case valeur1:
        // Code
        break;
    case valeur2:
        // Code
        break;
    default:
        // Code par défaut
}
```

## Opérateur Ternaire

Syntaxe courte pour if/else simple.

```php
$resultat = (condition) ? valeurSiVrai : valeurSiFaux;
```',

'<?php
// ===== Exemple 1 : Vérification de l''âge =====
$age = 18;

if ($age >= 18) {
    echo "Vous êtes majeur<br>";
} else {
    echo "Vous êtes mineur<br>";
}

// ===== Exemple 2 : Notes et mentions =====
$note = 15;

if ($note >= 16) {
    echo "Mention : Très bien<br>";
} elseif ($note >= 14) {
    echo "Mention : Bien<br>";
} elseif ($note >= 12) {
    echo "Mention : Assez bien<br>";
} elseif ($note >= 10) {
    echo "Mention : Passable<br>";
} else {
    echo "Non admis<br>";
}

// ===== Exemple 3 : Conditions multiples =====
$age = 25;
$permis = true;

if ($age >= 18 && $permis) {
    echo "Vous pouvez conduire<br>";
} elseif ($age >= 18 && !$permis) {
    echo "Vous devez passer le permis<br>";
} else {
    echo "Vous êtes trop jeune<br>";
}

// ===== Exemple 4 : Opérateur OU =====
$jour = "samedi";

if ($jour == "samedi" || $jour == "dimanche") {
    echo "C''est le weekend !<br>";
} else {
    echo "C''est un jour de semaine<br>";
}

// ===== Exemple 5 : Switch =====
$couleur = "rouge";

switch ($couleur) {
    case "rouge":
        echo "Couleur : Rouge (#FF0000)<br>";
        break;
    case "vert":
        echo "Couleur : Vert (#00FF00)<br>";
        break;
    case "bleu":
        echo "Couleur : Bleu (#0000FF)<br>";
        break;
    default:
        echo "Couleur inconnue<br>";
}

// ===== Exemple 6 : Opérateur ternaire =====
$age = 20;
$statut = ($age >= 18) ? "Majeur" : "Mineur";
echo "Statut : $statut<br>";

// ===== Exemple 7 : Comparaison == vs === =====
$a = 5;
$b = "5";

if ($a == $b) {
    echo "5 == ''5'' : VRAI (même valeur)<br>";
}

if ($a === $b) {
    echo "Ne s''affichera pas<br>";
} else {
    echo "5 === ''5'' : FAUX (types différents)<br>";
}

// ===== Exemple 8 : Vérification de connexion =====
$utilisateur = "admin";
$motDePasse = "1234";

if ($utilisateur == "admin" && $motDePasse == "1234") {
    echo "Connexion réussie !<br>";
} else {
    echo "Identifiants incorrects<br>";
}
?>',

'Créez un programme qui :
1. Déclare une variable $temperature
2. Affiche un message selon la température :
   - < 0 : "Il gèle !"
   - 0 à 15 : "Il fait froid"
   - 16 à 25 : "Température agréable"
   - > 25 : "Il fait chaud"
3. Utilisez une variable $pluie (true/false)
4. Si il pleut, ajoutez "Prenez un parapluie !"',
3, 45
);

-- Leçon 4 : Les Boucles
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
11,
'Les Boucles : for, while, foreach',
'Apprenez à répéter du code efficacement avec les différents types de boucles',
'# Les Boucles en PHP

Les boucles permettent de répéter du code plusieurs fois sans le réécrire.

## Boucle FOR

Utilisée quand on connaît le nombre d''itérations.

```php
for (initialisation; condition; incrémentation) {
    // Code à répéter
}
```

**Exemple :**
```php
for ($i = 0; $i < 5; $i++) {
    echo "Tour $i<br>";
}
```

## Boucle WHILE

Continue tant que la condition est vraie.

```php
while (condition) {
    // Code à répéter
}
```

**Attention :** Assurez-vous que la condition devienne fausse à un moment !

## Boucle DO...WHILE

Exécute le code au moins une fois, puis vérifie la condition.

```php
do {
    // Code à répéter
} while (condition);
```

## Boucle FOREACH

Idéale pour parcourir les tableaux (on verra ça dans la prochaine leçon).

```php
foreach ($tableau as $valeur) {
    // Code avec $valeur
}
```

## Contrôle de boucles

### break
Arrête la boucle immédiatement.

```php
for ($i = 0; $i < 10; $i++) {
    if ($i == 5) break;
    echo $i;
}
```

### continue
Passe à l''itération suivante.

```php
for ($i = 0; $i < 5; $i++) {
    if ($i == 2) continue;
    echo $i; // Affiche 0 1 3 4
}
```

## Boucles imbriquées

On peut mettre des boucles dans des boucles.

```php
for ($i = 1; $i <= 3; $i++) {
    for ($j = 1; $j <= 3; $j++) {
        echo "[$i,$j] ";
    }
    echo "<br>";
}
```',

'<?php
// ===== Exemple 1 : Boucle FOR simple =====
echo "<h3>Table de multiplication de 5 :</h3>";
for ($i = 1; $i <= 10; $i++) {
    $resultat = 5 * $i;
    echo "5 x $i = $resultat<br>";
}

// ===== Exemple 2 : Boucle FOR avec pas de 2 =====
echo "<br><h3>Nombres pairs de 0 à 20 :</h3>";
for ($i = 0; $i <= 20; $i += 2) {
    echo "$i ";
}
echo "<br>";

// ===== Exemple 3 : Boucle WHILE =====
echo "<br><h3>Compte à rebours :</h3>";
$compteur = 10;
while ($compteur >= 0) {
    echo $compteur . " ";
    $compteur--;
}
echo "Décollage !<br>";

// ===== Exemple 4 : DO...WHILE =====
echo "<br><h3>Exemple DO...WHILE :</h3>";
$nombre = 1;
do {
    echo "Nombre : $nombre<br>";
    $nombre++;
} while ($nombre <= 5);

// ===== Exemple 5 : Break =====
echo "<br><h3>Utilisation de BREAK :</h3>";
for ($i = 1; $i <= 10; $i++) {
    if ($i == 6) {
        echo "On arrête à 6 !<br>";
        break;
    }
    echo "$i ";
}

// ===== Exemple 6 : Continue =====
echo "<br><br><h3>Utilisation de CONTINUE :</h3>";
echo "Nombres de 1 à 10 (sauf les multiples de 3) :<br>";
for ($i = 1; $i <= 10; $i++) {
    if ($i % 3 == 0) {
        continue; // Saute les multiples de 3
    }
    echo "$i ";
}

// ===== Exemple 7 : Boucles imbriquées =====
echo "<br><br><h3>Table de multiplication :</h3>";
echo "<table border=''1'' cellpadding=''5''>";
for ($i = 1; $i <= 5; $i++) {
    echo "<tr>";
    for ($j = 1; $j <= 5; $j++) {
        $produit = $i * $j;
        echo "<td>$produit</td>";
    }
    echo "</tr>";
}
echo "</table>";

// ===== Exemple 8 : Somme avec WHILE =====
echo "<br><h3>Somme des nombres de 1 à 100 :</h3>";
$somme = 0;
$n = 1;
while ($n <= 100) {
    $somme += $n;
    $n++;
}
echo "Somme = $somme<br>";

// ===== Exemple 9 : Afficher un triangle =====
echo "<br><h3>Triangle d''étoiles :</h3>";
for ($ligne = 1; $ligne <= 5; $ligne++) {
    for ($etoile = 1; $etoile <= $ligne; $etoile++) {
        echo "* ";
    }
    echo "<br>";
}
?>',

'Créez un programme qui :
1. Affiche les nombres de 1 à 50
2. Pour les multiples de 3, affiche "Fizz" au lieu du nombre
3. Pour les multiples de 5, affiche "Buzz"
4. Pour les multiples de 3 ET 5, affiche "FizzBuzz"
Exemple : 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz...',
4, 50
);

-- Leçon 5 : Les Tableaux (Arrays)
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
11,
'Les Tableaux : Indexés et Associatifs',
'Découvrez comment stocker et manipuler des collections de données avec les tableaux',
'# Les Tableaux en PHP

Les tableaux permettent de stocker plusieurs valeurs dans une seule variable.

## Tableaux Indexés

Les éléments sont numérotés automatiquement à partir de 0.

### Création
```php
// Méthode 1
$fruits = array("Pomme", "Banane", "Orange");

// Méthode 2 (PHP 5.4+)
$fruits = ["Pomme", "Banane", "Orange"];
```

### Accès aux éléments
```php
echo $fruits[0]; // Pomme
echo $fruits[1]; // Banane
```

## Tableaux Associatifs

Les éléments sont accessibles par des clés nommées.

```php
$personne = [
    "nom" => "Dupont",
    "prenom" => "Jean",
    "age" => 30
];

echo $personne["nom"]; // Dupont
```

## Fonctions Utiles

### count()
Retourne le nombre d''éléments.

```php
$fruits = ["Pomme", "Banane", "Orange"];
echo count($fruits); // 3
```

### array_push()
Ajoute un ou plusieurs éléments à la fin.

```php
array_push($fruits, "Fraise");
// ou
$fruits[] = "Fraise";
```

### array_pop()
Supprime et retourne le dernier élément.

```php
$dernier = array_pop($fruits);
```

### in_array()
Vérifie si une valeur existe.

```php
if (in_array("Pomme", $fruits)) {
    echo "La pomme est dans le tableau";
}
```

### sort()
Trie le tableau par ordre croissant.

```php
sort($fruits);
```

### array_reverse()
Inverse l''ordre des éléments.

```php
$inverse = array_reverse($fruits);
```

## Parcourir un Tableau

### Avec foreach (recommandé)
```php
// Tableau indexé
foreach ($fruits as $fruit) {
    echo $fruit . "<br>";
}

// Tableau associatif
foreach ($personne as $cle => $valeur) {
    echo "$cle : $valeur<br>";
}
```

### Avec for
```php
for ($i = 0; $i < count($fruits); $i++) {
    echo $fruits[$i] . "<br>";
}
```

## Tableaux Multidimensionnels

Tableaux contenant d''autres tableaux.

```php
$etudiants = [
    ["Alice", 20, 15],
    ["Bob", 22, 14],
    ["Charlie", 19, 16]
];

echo $etudiants[0][0]; // Alice
echo $etudiants[1][2]; // 14
```',

'<?php
// ===== Exemple 1 : Tableau indexé =====
$fruits = ["Pomme", "Banane", "Orange", "Fraise", "Kiwi"];

echo "<h3>Liste de fruits :</h3>";
foreach ($fruits as $fruit) {
    echo "- $fruit<br>";
}

// ===== Exemple 2 : Tableau associatif =====
$etudiant = [
    "nom" => "Martin",
    "prenom" => "Sophie",
    "age" => 22,
    "note" => 15.5,
    "ville" => "Paris"
];

echo "<br><h3>Informations étudiant :</h3>";
foreach ($etudiant as $cle => $valeur) {
    echo ucfirst($cle) . " : $valeur<br>";
}

// ===== Exemple 3 : Manipulation de tableaux =====
$nombres = [5, 2, 8, 1, 9, 3];

echo "<br><h3>Tableau original :</h3>";
echo implode(", ", $nombres) . "<br>";

echo "<br>Nombre d''éléments : " . count($nombres) . "<br>";

// Ajouter un élément
array_push($nombres, 7);
echo "Après ajout de 7 : " . implode(", ", $nombres) . "<br>";

// Trier
sort($nombres);
echo "Après tri : " . implode(", ", $nombres) . "<br>";

// ===== Exemple 4 : Vérification d''existence =====
$couleurs = ["rouge", "vert", "bleu"];

if (in_array("rouge", $couleurs)) {
    echo "<br>Rouge est dans le tableau<br>";
}

if (!in_array("jaune", $couleurs)) {
    echo "Jaune n''est PAS dans le tableau<br>";
}

// ===== Exemple 5 : Calculs sur un tableau =====
$notes = [12, 15, 18, 10, 14, 16];

echo "<br><h3>Statistiques des notes :</h3>";
echo "Notes : " . implode(", ", $notes) . "<br>";

$somme = array_sum($notes);
$moyenne = $somme / count($notes);
$max = max($notes);
$min = min($notes);

echo "Somme : $somme<br>";
echo "Moyenne : " . number_format($moyenne, 2) . "<br>";
echo "Note max : $max<br>";
echo "Note min : $min<br>";

// ===== Exemple 6 : Tableau multidimensionnel =====
$classes = [
    "3A" => ["Alice", "Bob", "Charlie"],
    "3B" => ["David", "Emma", "Frank"],
    "3C" => ["Grace", "Henry", "Iris"]
];

echo "<br><h3>Liste des classes :</h3>";
foreach ($classes as $classe => $eleves) {
    echo "<strong>Classe $classe :</strong><br>";
    foreach ($eleves as $eleve) {
        echo "  - $eleve<br>";
    }
}

// ===== Exemple 7 : Tableau de personnes =====
$personnes = [
    [
        "nom" => "Dupont",
        "age" => 25,
        "ville" => "Paris"
    ],
    [
        "nom" => "Martin",
        "age" => 30,
        "ville" => "Lyon"
    ],
    [
        "nom" => "Bernard",
        "age" => 28,
        "ville" => "Marseille"
    ]
];

echo "<br><h3>Annuaire :</h3>";
echo "<table border=''1'' cellpadding=''5''>";
echo "<tr><th>Nom</th><th>Âge</th><th>Ville</th></tr>";
foreach ($personnes as $personne) {
    echo "<tr>";
    echo "<td>{$personne[''nom'']}</td>";
    echo "<td>{$personne[''age'']}</td>";
    echo "<td>{$personne[''ville'']}</td>";
    echo "</tr>";
}
echo "</table>";

// ===== Exemple 8 : Filtrer un tableau =====
$tous_nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
$nombres_pairs = [];

foreach ($tous_nombres as $nombre) {
    if ($nombre % 2 == 0) {
        $nombres_pairs[] = $nombre;
    }
}

echo "<br><h3>Filtrage :</h3>";
echo "Tous les nombres : " . implode(", ", $tous_nombres) . "<br>";
echo "Nombres pairs : " . implode(", ", $nombres_pairs) . "<br>";
?>',

'Créez un programme qui :
1. Crée un tableau associatif représentant une voiture (marque, modèle, année, prix)
2. Affiche toutes les informations de la voiture
3. Crée un tableau de 3 voitures différentes
4. Affiche toutes les voitures dans un tableau HTML
5. Calcule le prix moyen des voitures',
5, 50
);

-- Quiz PHP Débutant
INSERT INTO quizzes (course_id, title, description, passing_score)
VALUES (11, 'Quiz PHP Débutant - Les Fondamentaux', 'Testez vos connaissances sur les bases de PHP', 70);

-- Questions Quiz PHP Débutant (supposons quiz_id = 3)
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation)
VALUES
(3, 'Comment commence toujours une variable en PHP ?',
 '$', '#', '@', '&', 'A',
 'En PHP, les variables commencent toujours par le symbole $.'),

(3, 'Quelle fonction permet d''afficher du texte ?',
 'print()', 'echo', 'Les deux', 'display()', 'C',
 'PHP permet d''utiliser echo ou print() pour afficher du texte.'),

(3, 'Quelle est la différence entre == et === ?',
 'Aucune différence', '== compare valeur et type, === seulement la valeur', '=== compare valeur et type, == seulement la valeur', '== est obsolète', 'C',
 'L''opérateur === compare la valeur ET le type, tandis que == compare seulement la valeur.'),

(3, 'Comment crée-t-on un tableau en PHP 5.4+ ?',
 'array()', '[]', 'Les deux', '{}', 'C',
 'On peut utiliser array() ou la syntaxe courte [] (PHP 5.4+).'),

(3, 'Quelle boucle garantit au moins une exécution ?',
 'for', 'while', 'do...while', 'foreach', 'C',
 'La boucle do...while exécute le code au moins une fois avant de vérifier la condition.'),

(3, 'Comment accède-t-on au premier élément d''un tableau indexé $fruits ?',
 '$fruits[0]', '$fruits[1]', '$fruits->0', '$fruits.first()', 'A',
 'Les tableaux indexés commencent à l''index 0 en PHP.'),

(3, 'Quelle fonction retourne le nombre d''éléments d''un tableau ?',
 'length()', 'size()', 'count()', 'sizeof()', 'C',
 'La fonction count() retourne le nombre d''éléments d''un tableau.'),

(3, 'Comment écrit-on un commentaire sur une seule ligne en PHP ?',
 '# commentaire', '// commentaire', 'Les deux', '<!-- commentaire -->', 'C',
 'PHP accepte # et // pour les commentaires sur une seule ligne.'),

(3, 'Quelle est l''extension d''un fichier PHP ?',
 '.html', '.php', '.ph', '.p', 'B',
 'Les fichiers PHP ont l''extension .php'),

(3, 'Comment concatène-t-on des chaînes en PHP ?',
 '+', '.', '&', ',', 'B',
 'L''opérateur point (.) est utilisé pour concaténer des chaînes en PHP.');

-- ============================================
-- COURS PHP INTERMÉDIAIRE - POO et BDD
-- ============================================

INSERT INTO courses (title, description, language, level, total_lessons, image_url)
VALUES (
  'PHP Intermédiaire - POO et Bases de Données',
  'Programmation Orientée Objet, manipulation de bases de données MySQL et PDO',
  'PHP',
  'intermediate',
  6,
  'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=400'
);

-- Supposons que l'ID du cours est 12

-- Les leçons du cours intermédiaire seront ajoutées dans la suite du fichier...
