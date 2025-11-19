# Guide d'utilisation de l'API Ollama

Ce document explique comment utiliser l'intégration Ollama dans la plateforme d'apprentissage.

## Sommaire

1. [Introduction](#introduction)
2. [Endpoints disponibles](#endpoints-disponibles)
3. [Exemples d'utilisation](#exemples-dutilisation)
4. [Prompts personnalisés](#prompts-personnalisés)
5. [Modèles recommandés](#modèles-recommandés)

---

## Introduction

Ollama permet d'exécuter des modèles LLM localement sur votre machine. La plateforme utilise Ollama pour fournir un assistant IA capable de :

- Expliquer des concepts de programmation
- Aider au débogage de code
- Générer des exercices personnalisés
- Créer des quiz automatiquement
- Suggérer du code
- Améliorer du code existant

---

## Endpoints disponibles

### 1. Vérifier la santé d'Ollama

**Endpoint :** `GET /api/llm/health`

**Authentification :** Requise

**Exemple :**

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/llm/health
```

**Réponse :**

```json
{
  "available": true,
  "models": [
    {
      "name": "deepseek-coder:6.7b",
      "size": 3826793134
    }
  ]
}
```

### 2. Expliquer un concept

**Endpoint :** `POST /api/llm/explain`

**Authentification :** Requise

**Body :**

```json
{
  "topic": "Les closures en JavaScript",
  "language": "JavaScript",
  "level": "beginner"
}
```

**Exemple :**

```bash
curl -X POST http://localhost:3000/api/llm/explain \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "topic": "Les closures",
       "language": "JavaScript",
       "level": "beginner"
     }'
```

**Réponse :**

```json
{
  "topic": "Les closures",
  "language": "JavaScript",
  "level": "beginner",
  "explanation": "# Les Closures en JavaScript\n\n## Définition simple\nUne closure est une fonction qui a accès aux variables de sa portée parent, même après que la fonction parent ait terminé son exécution...\n\n## Exemple de code\n```javascript\nfunction createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n```"
}
```

### 3. Déboguer du code

**Endpoint :** `POST /api/llm/debug`

**Body :**

```json
{
  "code": "function sum(a, b) {\n  return a + b\n}\nconsole.log(sum(5));",
  "language": "JavaScript",
  "error": "NaN"
}
```

**Exemple :**

```bash
curl -X POST http://localhost:3000/api/llm/debug \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{
       "code": "function sum(a, b) { return a + b; } console.log(sum(5));",
       "language": "JavaScript",
       "error": "NaN"
     }'
```

### 4. Générer un exercice

**Endpoint :** `POST /api/llm/generate-exercise`

**Body :**

```json
{
  "language": "PHP",
  "topic": "Les tableaux",
  "level": "beginner"
}
```

### 5. Générer un quiz

**Endpoint :** `POST /api/llm/generate-quiz`

**Body :**

```json
{
  "language": "JavaScript",
  "topic": "Les fonctions",
  "numberOfQuestions": 5
}
```

**Exemple de réponse :**

```json
{
  "language": "JavaScript",
  "topic": "Les fonctions",
  "quiz": {
    "questions": [
      {
        "question": "Comment déclare-t-on une fonction en JavaScript ?",
        "options": {
          "A": "function myFunc() {}",
          "B": "def myFunc():",
          "C": "func myFunc() {}",
          "D": "create function myFunc()"
        },
        "correctAnswer": "A",
        "explanation": "En JavaScript, on utilise le mot-clé 'function' suivi du nom..."
      }
    ]
  }
}
```

### 6. Suggérer du code

**Endpoint :** `POST /api/llm/suggest-code`

**Body :**

```json
{
  "description": "Créer une fonction qui vérifie si un nombre est premier",
  "language": "JavaScript"
}
```

### 7. Améliorer du code

**Endpoint :** `POST /api/llm/improve-code`

**Body :**

```json
{
  "code": "function test(x){if(x>0){return true}else{return false}}",
  "language": "JavaScript"
}
```

### 8. Expliquer du code

**Endpoint :** `POST /api/llm/explain-code`

**Body :**

```json
{
  "code": "const nums = [1,2,3].map(x => x * 2);",
  "language": "JavaScript"
}
```

---

## Exemples d'utilisation

### Depuis le frontend React

```javascript
import { llmService } from '../services/api';

// Expliquer un concept
const explainConcept = async () => {
  try {
    const response = await llmService.explainConcept(
      'Les promesses',
      'JavaScript',
      'intermediate'
    );
    console.log(response.data.explanation);
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Déboguer du code
const debugMyCode = async () => {
  const code = `
    function divide(a, b) {
      return a / b;
    }
    console.log(divide(10, 0));
  `;

  try {
    const response = await llmService.debugCode(
      code,
      'JavaScript',
      'Infinity'
    );
    console.log(response.data.help);
  } catch (error) {
    console.error('Erreur:', error);
  }
};

// Générer un quiz
const generateQuiz = async () => {
  try {
    const response = await llmService.generateQuiz(
      'PHP',
      'Les tableaux associatifs',
      7
    );
    console.log(response.data.quiz);
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

### Directement avec axios

```javascript
import axios from 'axios';

const token = localStorage.getItem('token');

// Générer un exercice
const response = await axios.post(
  'http://localhost:3000/api/llm/generate-exercise',
  {
    language: 'CSS',
    topic: 'Flexbox',
    level: 'intermediate'
  },
  {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data.exercise);
```

---

## Prompts personnalisés

Les prompts sont définis dans `backend/src/services/ollamaService.js`. Vous pouvez les personnaliser selon vos besoins.

### Exemple : Personnaliser le prompt d'explication

```javascript
static async explainConcept(topic, language, level = 'beginner') {
  const prompt = `Tu es un professeur de programmation expert et pédagogue.

Langage : ${language}
Concept : ${topic}
Niveau : ${level}

Explique ce concept de manière :
- Claire et accessible
- Avec des exemples concrets
- En français

Structure ta réponse ainsi :
1. Définition en une phrase simple
2. Analogie du monde réel
3. Exemple de code commenté
4. Cas d'usage pratique
5. Erreurs courantes à éviter

Ton ton doit être encourageant et motivant.`;

  return await this.generate(prompt, {
    temperature: 0.7
  });
}
```

### Paramètres de température

- **0.3 - 0.5** : Réponses plus déterministes et factuelles (bon pour le débogage)
- **0.6 - 0.8** : Équilibre créativité/précision (bon pour les explications)
- **0.9 - 1.0** : Plus créatif et varié (bon pour générer des exercices)

---

## Modèles recommandés

### Pour le code : deepseek-coder

```bash
ollama pull deepseek-coder:6.7b
```

**Avantages :**
- Spécialisé pour la programmation
- Excellent pour le débogage
- Comprend de nombreux langages
- Taille raisonnable (6.7B)

### Pour usage général : llama3

```bash
ollama pull llama3
```

**Avantages :**
- Polyvalent
- Bonnes explications
- Multilingue

### Pour la rapidité : mistral

```bash
ollama pull mistral
```

**Avantages :**
- Plus rapide
- Moins de ressources
- Bonnes performances générales

### Tableau comparatif

| Modèle | Taille | Spécialité | Vitesse | RAM requise |
|--------|--------|------------|---------|-------------|
| deepseek-coder:6.7b | ~4GB | Code | Moyenne | 8GB |
| llama3 | ~4.7GB | Général | Moyenne | 8GB |
| mistral | ~4GB | Général | Rapide | 8GB |
| codellama | ~3.8GB | Code | Rapide | 8GB |

---

## Conseils de performance

### 1. Première requête lente

La première requête après le démarrage d'Ollama peut être lente (chargement du modèle en mémoire). Les requêtes suivantes seront beaucoup plus rapides.

### 2. Timeout

Pour les requêtes complexes, augmentez le timeout dans `ollamaService.js` :

```javascript
const response = await axios.post(url, data, {
  timeout: 120000 // 2 minutes au lieu de 1
});
```

### 3. Streaming

Pour des réponses en temps réel, activez le streaming :

```javascript
const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
  model: OLLAMA_MODEL,
  prompt: prompt,
  stream: true
});
```

### 4. Context window

Limitez la taille du code envoyé pour le débogage :

```javascript
if (code.length > 5000) {
  code = code.substring(0, 5000) + '\n// ... (code tronqué)';
}
```

---

## Dépannage

### Erreur : "Model not found"

**Solution :**

```bash
ollama pull deepseek-coder:6.7b
```

### Erreur : "Connection refused"

**Solution :**

Vérifiez qu'Ollama est bien démarré :

```bash
ollama serve
```

### Réponses lentes

**Solutions :**

1. Utilisez un modèle plus léger (mistral)
2. Réduisez la longueur du prompt
3. Augmentez les ressources GPU/CPU

### Réponses de mauvaise qualité

**Solutions :**

1. Ajustez la température
2. Affinez le prompt
3. Utilisez un modèle plus spécialisé
4. Ajoutez plus de contexte dans le prompt

---

## Ressources

- [Documentation Ollama](https://github.com/ollama/ollama)
- [Liste des modèles disponibles](https://ollama.com/library)
- [API Reference](https://github.com/ollama/ollama/blob/main/docs/api.md)

---

Bon développement avec l'IA ! 🤖
