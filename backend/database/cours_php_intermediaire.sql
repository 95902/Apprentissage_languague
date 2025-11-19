-- COURS PHP INTERMÉDIAIRE - Suite
-- Programmation Orientée Objet et Bases de Données

-- Leçon 1 : Les Fonctions Avancées
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
12,
'Les Fonctions : Création et Utilisation',
'Apprenez à créer des fonctions réutilisables pour organiser votre code',
'# Les Fonctions en PHP

Les fonctions permettent de regrouper du code réutilisable et d''éviter les répétitions.

## Syntaxe de Base

```php
function nomFonction($parametre1, $parametre2) {
    // Code de la fonction
    return $resultat;
}
```

## Fonction Simple

```php
function direBonjour() {
    echo "Bonjour !";
}

direBonjour(); // Appel de la fonction
```

## Fonctions avec Paramètres

```php
function saluer($nom) {
    return "Bonjour $nom !";
}

echo saluer("Alice"); // Bonjour Alice !
```

## Paramètres par Défaut

```php
function calculer($a, $b = 10) {
    return $a + $b;
}

echo calculer(5);     // 15 (utilise la valeur par défaut)
echo calculer(5, 3);  // 8 (utilise 3 au lieu de 10)
```

## Typage des Paramètres (PHP 7+)

```php
function additionner(int $a, int $b): int {
    return $a + $b;
}
```

## Portée des Variables

### Variables Locales
Existent seulement dans la fonction.

```php
function test() {
    $x = 10; // Variable locale
}
echo $x; // ERREUR : $x n''existe pas ici
```

### Variables Globales
Accessibles partout avec le mot-clé `global`.

```php
$compteur = 0;

function incrementer() {
    global $compteur;
    $compteur++;
}
```

## Fonctions Variables

PHP permet d''assigner une fonction à une variable.

```php
$salutation = function($nom) {
    return "Salut $nom !";
};

echo $salutation("Bob"); // Salut Bob !
```

## Fonctions Récursives

Une fonction qui s''appelle elle-même.

```php
function factorielle($n) {
    if ($n <= 1) return 1;
    return $n * factorielle($n - 1);
}
```',

'<?php
// ===== Fonction simple =====
function afficherTitre($texte) {
    echo "<h3>$texte</h3>";
}

afficherTitre("Bienvenue dans les fonctions PHP");

// ===== Fonction avec return =====
function calculerSurface($longueur, $largeur) {
    return $longueur * $largeur;
}

$surface = calculerSurface(5, 3);
echo "Surface : $surface m²<br>";

// ===== Fonction avec paramètres par défaut =====
function creerUtilisateur($nom, $role = "utilisateur") {
    return "Utilisateur : $nom (Rôle : $role)";
}

echo creerUtilisateur("Alice") . "<br>";
echo creerUtilisateur("Bob", "admin") . "<br>";

// ===== Fonction avec plusieurs valeurs de retour =====
function calculerStats($nombres) {
    $min = min($nombres);
    $max = max($nombres);
    $moyenne = array_sum($nombres) / count($nombres);

    return [
        "min" => $min,
        "max" => $max,
        "moyenne" => $moyenne
    ];
}

$notes = [12, 15, 18, 10, 14];
$stats = calculerStats($notes);

echo "<br>Statistiques :<br>";
echo "Min : {$stats[''min'']}<br>";
echo "Max : {$stats[''max'']}<br>";
echo "Moyenne : " . number_format($stats[''moyenne''], 2) . "<br>";

// ===== Fonction de validation =====
function validerEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

$emails = ["test@example.com", "invalide", "user@site.fr"];
echo "<br>Validation d''emails :<br>";
foreach ($emails as $email) {
    $valide = validerEmail($email) ? "✓ Valide" : "✗ Invalide";
    echo "$email : $valide<br>";
}

// ===== Fonction récursive - Factorielle =====
function factorielle($n) {
    if ($n <= 1) {
        return 1;
    }
    return $n * factorielle($n - 1);
}

echo "<br>Factorielles :<br>";
for ($i = 1; $i <= 5; $i++) {
    echo "Factorielle de $i = " . factorielle($i) . "<br>";
}

// ===== Fonction de formatage =====
function formaterPrix($prix, $devise = "€") {
    return number_format($prix, 2, ",", " ") . " $devise";
}

$prix = 1234.56;
echo "<br>Prix : " . formaterPrix($prix) . "<br>";
echo "Prix USD : " . formaterPrix($prix, "$") . "<br>";

// ===== Fonction avec typage (PHP 7+) =====
function diviser(float $a, float $b): float {
    if ($b == 0) {
        return 0;
    }
    return $a / $b;
}

echo "<br>Division : " . diviser(10, 3) . "<br>";

// ===== Fonction anonyme =====
$doubler = function($nombre) {
    return $nombre * 2;
};

echo "<br>Double de 5 : " . $doubler(5) . "<br>";

// ===== Fonction avec passage par référence =====
function incrementer(&$valeur) {
    $valeur++;
}

$compteur = 10;
echo "<br>Avant : $compteur<br>";
incrementer($compteur);
echo "Après : $compteur<br>";
?>',

'Créez les fonctions suivantes :
1. calculerMoyenne($notes) - retourne la moyenne d''un tableau de notes
2. verifierMotDePasse($password) - vérifie si le mot de passe fait au moins 8 caractères
3. genererNombreAleatoire($min, $max) - génère un nombre aléatoire entre min et max
4. convertirTemperature($celsius) - convertit Celsius en Fahrenheit
5. Testez toutes vos fonctions avec différentes valeurs',
1, 45
);

-- Leçon 2 : Introduction à la POO
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
12,
'Programmation Orientée Objet - Les Classes',
'Découvrez la POO : classes, objets, propriétés et méthodes',
'# Introduction à la Programmation Orientée Objet

La POO (Programmation Orientée Objet) permet d''organiser le code de manière plus structurée et réutilisable.

## Concepts de Base

### Classe
Un modèle/plan pour créer des objets.

### Objet
Une instance d''une classe.

### Propriété
Variable appartenant à une classe.

### Méthode
Fonction appartenant à une classe.

## Créer une Classe

```php
class Voiture {
    // Propriétés
    public $marque;
    public $couleur;

    // Méthode
    public function demarrer() {
        return "La voiture démarre...";
    }
}
```

## Créer un Objet

```php
$maVoiture = new Voiture();
$maVoiture->marque = "Peugeot";
$maVoiture->couleur = "Rouge";
echo $maVoiture->demarrer();
```

## Le Constructeur

Méthode spéciale appelée automatiquement lors de la création d''un objet.

```php
class Voiture {
    public $marque;

    public function __construct($marque) {
        $this->marque = $marque;
    }
}

$voiture = new Voiture("Renault");
```

## $this

Fait référence à l''objet actuel.

```php
class Personne {
    public $nom;

    public function __construct($nom) {
        $this->nom = $nom;
    }

    public function sePresenter() {
        return "Je m''appelle {$this->nom}";
    }
}
```

## Visibilité

### public
Accessible partout.

### private
Accessible uniquement dans la classe.

### protected
Accessible dans la classe et ses enfants.

```php
class Compte {
    private $solde;

    public function getSolde() {
        return $this->solde;
    }

    public function deposer($montant) {
        $this->solde += $montant;
    }
}
```

## Getters et Setters

Méthodes pour accéder et modifier les propriétés privées.

```php
class User {
    private $email;

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }
}
```',

'<?php
// ===== Classe simple =====
class Personne {
    // Propriétés
    public $nom;
    public $age;

    // Constructeur
    public function __construct($nom, $age) {
        $this->nom = $nom;
        $this->age = $age;
    }

    // Méthode
    public function sePresenter() {
        return "Je m''appelle {$this->nom} et j''ai {$this->age} ans.";
    }

    public function estMajeur() {
        return $this->age >= 18;
    }
}

// Créer des objets
$alice = new Personne("Alice", 25);
$bob = new Personne("Bob", 17);

echo $alice->sePresenter() . "<br>";
echo $bob->sePresenter() . "<br>";

echo "Alice est majeure : " . ($alice->estMajeur() ? "Oui" : "Non") . "<br>";
echo "Bob est majeur : " . ($bob->estMajeur() ? "Oui" : "Non") . "<br>";

// ===== Classe Compte Bancaire =====
class CompteBancaire {
    private $titulaire;
    private $solde;

    public function __construct($titulaire, $soldeInitial = 0) {
        $this->titulaire = $titulaire;
        $this->solde = $soldeInitial;
    }

    public function deposer($montant) {
        if ($montant > 0) {
            $this->solde += $montant;
            return true;
        }
        return false;
    }

    public function retirer($montant) {
        if ($montant > 0 && $montant <= $this->solde) {
            $this->solde -= $montant;
            return true;
        }
        return false;
    }

    public function afficherSolde() {
        return "{$this->titulaire} : {$this->solde} €";
    }

    public function getSolde() {
        return $this->solde;
    }
}

echo "<br><h3>Compte Bancaire</h3>";
$compte = new CompteBancaire("Marie Dupont", 1000);
echo $compte->afficherSolde() . "<br>";

$compte->deposer(500);
echo "Après dépôt de 500€ : " . $compte->afficherSolde() . "<br>";

$compte->retirer(200);
echo "Après retrait de 200€ : " . $compte->afficherSolde() . "<br>";

// ===== Classe Produit =====
class Produit {
    private $nom;
    private $prix;
    private $stock;

    public function __construct($nom, $prix, $stock) {
        $this->nom = $nom;
        $this->prix = $prix;
        $this->stock = $stock;
    }

    public function afficher() {
        return "{$this->nom} - {$this->prix}€ (Stock: {$this->stock})";
    }

    public function vendre($quantite) {
        if ($quantite <= $this->stock) {
            $this->stock -= $quantite;
            return true;
        }
        return false;
    }

    public function estDisponible() {
        return $this->stock > 0;
    }

    // Getters
    public function getNom() { return $this->nom; }
    public function getPrix() { return $this->prix; }
    public function getStock() { return $this->stock; }

    // Setters
    public function setPrix($prix) {
        if ($prix > 0) {
            $this->prix = $prix;
        }
    }

    public function ajouterStock($quantite) {
        $this->stock += $quantite;
    }
}

echo "<br><h3>Gestion de Produits</h3>";
$produit1 = new Produit("Ordinateur", 999, 5);
$produit2 = new Produit("Souris", 29, 0);

echo $produit1->afficher() . "<br>";
echo $produit2->afficher() . "<br>";

echo "<br>Vente de 2 ordinateurs...<br>";
if ($produit1->vendre(2)) {
    echo "Vente réussie !<br>";
    echo $produit1->afficher() . "<br>";
}

echo "<br>Produit disponible ?<br>";
echo "Ordinateur : " . ($produit1->estDisponible() ? "Oui" : "Non") . "<br>";
echo "Souris : " . ($produit2->estDisponible() ? "Oui" : "Non") . "<br>";

// ===== Classe Utilisateur =====
class Utilisateur {
    private $nom;
    private $email;
    private $dateInscription;

    public function __construct($nom, $email) {
        $this->nom = $nom;
        $this->email = $email;
        $this->dateInscription = date("Y-m-d H:i:s");
    }

    public function afficherInfos() {
        return "<strong>$this->nom</strong><br>" .
               "Email: $this->email<br>" .
               "Inscrit le: $this->dateInscription";
    }

    public function changerEmail($nouvelEmail) {
        if (filter_var($nouvelEmail, FILTER_VALIDATE_EMAIL)) {
            $this->email = $nouvelEmail;
            return true;
        }
        return false;
    }
}

echo "<br><h3>Utilisateurs</h3>";
$user = new Utilisateur("Jean Martin", "jean@example.com");
echo $user->afficherInfos() . "<br><br>";

$user->changerEmail("jean.martin@newmail.com");
echo "Après changement d''email :<br>";
echo $user->afficherInfos();
?>',

'Créez une classe Livre avec :
- Propriétés privées : titre, auteur, prix, pages
- Un constructeur
- Des getters pour toutes les propriétés
- Un setter pour modifier le prix
- Une méthode afficherInfos() qui retourne toutes les infos
- Une méthode appliquerRemise($pourcentage) pour réduire le prix
Créez 3 livres et testez toutes les méthodes.',
2, 60
);

-- Leçon 3 : Héritage et Encapsulation
INSERT INTO lessons (course_id, title, description, content, code_example, exercise, order_index, duration)
VALUES (
12,
'Héritage et Concepts Avancés de la POO',
'Maîtrisez l''héritage, les classes abstraites et l''encapsulation',
'# Héritage en PHP

L''héritage permet à une classe d''hériter des propriétés et méthodes d''une autre classe.

## Syntaxe de Base

```php
class Vehicule {
    public $marque;

    public function demarrer() {
        return "Le véhicule démarre";
    }
}

class Voiture extends Vehicule {
    public $nombrePortes;

    public function klaxonner() {
        return "Pouet pouet !";
    }
}

$voiture = new Voiture();
$voiture->demarrer();  // Héritée de Vehicule
$voiture->klaxonner(); // Propre à Voiture
```

## Le mot-clé parent

Permet d''accéder aux méthodes de la classe parent.

```php
class Animal {
    protected $nom;

    public function __construct($nom) {
        $this->nom = $nom;
    }
}

class Chien extends Animal {
    private $race;

    public function __construct($nom, $race) {
        parent::__construct($nom);
        $this->race = $race;
    }
}
```

## Surcharge de Méthodes

Redéfinir une méthode héritée.

```php
class Vehicule {
    public function demarrer() {
        return "Démarrage standard";
    }
}

class VoitureElectrique extends Vehicule {
    public function demarrer() {
        return "Démarrage silencieux";
    }
}
```

## Classes Abstraites

Classes qui ne peuvent pas être instanciées directement.

```php
abstract class Forme {
    abstract public function calculerAire();

    public function afficher() {
        return "Aire : " . $this->calculerAire();
    }
}

class Rectangle extends Forme {
    private $largeur;
    private $hauteur;

    public function __construct($l, $h) {
        $this->largeur = $l;
        $this->hauteur = $h;
    }

    public function calculerAire() {
        return $this->largeur * $this->hauteur;
    }
}
```

## Méthodes et Propriétés Statiques

Accessibles sans créer d''instance.

```php
class Mathematiques {
    public static function carre($n) {
        return $n * $n;
    }
}

echo Mathematiques::carre(5); // 25
```

## Constantes de Classe

```php
class Configuration {
    const VERSION = "1.0";
    const APP_NAME = "MonApp";
}

echo Configuration::VERSION;
```

## Le mot-clé final

Empêche l''héritage ou la surcharge.

```php
final class ClasseFinale {
    // Ne peut pas être héritée
}

class Exemple {
    final public function methode() {
        // Ne peut pas être surchargée
    }
}
```',

'<?php
// ===== Héritage simple =====
class Animal {
    protected $nom;
    protected $age;

    public function __construct($nom, $age) {
        $this->nom = $nom;
        $this->age = $age;
    }

    public function sePresenter() {
        return "{$this->nom} ({$this->age} ans)";
    }

    public function manger() {
        return "{$this->nom} mange.";
    }
}

class Chien extends Animal {
    private $race;

    public function __construct($nom, $age, $race) {
        parent::__construct($nom, $age);
        $this->race = $race;
    }

    public function aboyer() {
        return "{$this->nom} aboie : Wouaf !";
    }

    public function sePresenter() {
        return parent::sePresenter() . " - Race : {$this->race}";
    }
}

class Chat extends Animal {
    public function miauler() {
        return "{$this->nom} miaule : Miaou !";
    }
}

echo "<h3>Animaux</h3>";
$chien = new Chien("Rex", 3, "Labrador");
$chat = new Chat("Félix", 2);

echo $chien->sePresenter() . "<br>";
echo $chien->aboyer() . "<br>";
echo $chien->manger() . "<br>";

echo "<br>" . $chat->sePresenter() . "<br>";
echo $chat->miauler() . "<br>";

// ===== Classes abstraites =====
abstract class Forme {
    protected $couleur;

    public function __construct($couleur) {
        $this->couleur = $couleur;
    }

    abstract public function calculerAire();
    abstract public function calculerPerimetre();

    public function afficher() {
        return "Forme {$this->couleur} - Aire: " .
               $this->calculerAire() . " - Périmètre: " .
               $this->calculerPerimetre();
    }
}

class Rectangle extends Forme {
    private $largeur;
    private $hauteur;

    public function __construct($largeur, $hauteur, $couleur = "bleu") {
        parent::__construct($couleur);
        $this->largeur = $largeur;
        $this->hauteur = $hauteur;
    }

    public function calculerAire() {
        return $this->largeur * $this->hauteur;
    }

    public function calculerPerimetre() {
        return 2 * ($this->largeur + $this->hauteur);
    }
}

class Cercle extends Forme {
    private $rayon;

    public function __construct($rayon, $couleur = "rouge") {
        parent::__construct($couleur);
        $this->rayon = $rayon;
    }

    public function calculerAire() {
        return pi() * $this->rayon * $this->rayon;
    }

    public function calculerPerimetre() {
        return 2 * pi() * $this->rayon;
    }
}

echo "<br><h3>Formes Géométriques</h3>";
$rectangle = new Rectangle(5, 3, "vert");
$cercle = new Cercle(4, "jaune");

echo $rectangle->afficher() . "<br>";
echo $cercle->afficher() . "<br>";

// ===== Méthodes statiques =====
class Utilitaires {
    public static function formaterPrix($prix) {
        return number_format($prix, 2, ",", " ") . " €";
    }

    public static function genererMotDePasse($longueur = 8) {
        $caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $motDePasse = "";
        for ($i = 0; $i < $longueur; $i++) {
            $motDePasse .= $caracteres[rand(0, strlen($caracteres) - 1)];
        }
        return $motDePasse;
    }
}

echo "<br><h3>Méthodes Statiques</h3>";
echo "Prix : " . Utilitaires::formaterPrix(1234.56) . "<br>";
echo "Mot de passe généré : " . Utilitaires::genererMotDePasse(12) . "<br>";

// ===== Constantes de classe =====
class Configuration {
    const VERSION = "2.1.0";
    const AUTEUR = "Développeur PHP";
    const MAX_UPLOAD = 5242880; // 5 MB

    public static function afficherInfos() {
        return "Version " . self::VERSION . " par " . self::AUTEUR;
    }
}

echo "<br><h3>Configuration</h3>";
echo Configuration::afficherInfos() . "<br>";
echo "Taille max upload : " . (Configuration::MAX_UPLOAD / 1024 / 1024) . " MB<br>";

// ===== Héritage multiple niveaux =====
class Employe {
    protected $nom;
    protected $salaire;

    public function __construct($nom, $salaire) {
        $this->nom = $nom;
        $this->salaire = $salaire;
    }

    public function afficherInfos() {
        return "{$this->nom} - {$this->salaire}€/mois";
    }
}

class Manager extends Employe {
    private $equipe = [];

    public function ajouterMembre($nom) {
        $this->equipe[] = $nom;
    }

    public function afficherEquipe() {
        return "{$this->nom} manage " . count($this->equipe) . " personnes";
    }
}

class DirecteurGeneral extends Manager {
    private $entreprise;

    public function __construct($nom, $salaire, $entreprise) {
        parent::__construct($nom, $salaire);
        $this->entreprise = $entreprise;
    }

    public function afficherInfos() {
        return parent::afficherInfos() . " - DG de {$this->entreprise}";
    }
}

echo "<br><h3>Hiérarchie</h3>";
$dg = new DirecteurGeneral("Pierre Durant", 8000, "TechCorp");
$dg->ajouterMembre("Alice");
$dg->ajouterMembre("Bob");
echo $dg->afficherInfos() . "<br>";
echo $dg->afficherEquipe() . "<br>";
?>',

'Créez une hiérarchie de classes pour un système de véhicules :
1. Classe abstraite Vehicule (marque, modele, annee, methode abstraite afficherType())
2. Classe Voiture extends Vehicule (nombrePortes)
3. Classe Moto extends Vehicule (cylindree)
4. Classe VoitureElectrique extends Voiture (autonomie)
5. Ajoutez des méthodes appropriées et testez tout',
3, 55
);

-- Continuer avec les leçons sur les bases de données...
-- (Le fichier continue avec d''autres leçons)
