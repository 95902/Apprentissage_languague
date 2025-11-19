import axios from 'axios';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'deepseek-coder:6.7b';
const USE_OLLAMA = OLLAMA_URL !== 'disabled' && OLLAMA_MODEL !== 'disabled';

// Pour utiliser OpenAI (optionnel)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

class LLMService {
  /**
   * Vérifie si le LLM est disponible
   */
  static async checkHealth() {
    if (!USE_OLLAMA) {
      return {
        available: false,
        message: 'LLM désactivé. Configurez OLLAMA_URL ou OPENAI_API_KEY pour activer.'
      };
    }

    try {
      const response = await axios.get(`${OLLAMA_URL}/api/tags`, {
        timeout: 5000
      });
      return {
        available: true,
        models: response.data.models || []
      };
    } catch (error) {
      return {
        available: false,
        error: error.message
      };
    }
  }

  /**
   * Génère une réponse avec le LLM
   */
  static async generate(prompt, options = {}) {
    // Si Ollama est désactivé, retourner un message par défaut
    if (!USE_OLLAMA) {
      return this.getDefaultResponse(prompt);
    }

    // Si OpenAI est configuré, l'utiliser
    if (OPENAI_API_KEY) {
      return await this.generateWithOpenAI(prompt, options);
    }

    // Sinon, utiliser Ollama
    return await this.generateWithOllama(prompt, options);
  }

  /**
   * Génère avec Ollama
   */
  static async generateWithOllama(prompt, options = {}) {
    try {
      const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
        model: options.model || OLLAMA_MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: options.temperature || 0.7,
          top_p: options.top_p || 0.9,
          ...options.llmOptions
        }
      }, {
        timeout: options.timeout || 60000
      });

      return response.data.response;
    } catch (error) {
      console.error('Erreur Ollama:', error.message);
      throw new Error(`Impossible de communiquer avec Ollama: ${error.message}`);
    }
  }

  /**
   * Génère avec OpenAI (alternative cloud)
   */
  static async generateWithOpenAI(prompt, options = {}) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          timeout: options.timeout || 60000
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Erreur OpenAI:', error.message);
      throw new Error(`Impossible de communiquer avec OpenAI: ${error.message}`);
    }
  }

  /**
   * Réponse par défaut quand le LLM est désactivé
   */
  static getDefaultResponse(prompt) {
    return `⚠️ Assistant IA non disponible

L'assistant IA est actuellement désactivé. Pour l'activer :

**Option 1 : Ollama (Gratuit, Local)**
1. Installez Ollama : https://ollama.com
2. Téléchargez un modèle : \`ollama pull deepseek-coder\`
3. Configurez OLLAMA_URL et OLLAMA_MODEL

**Option 2 : OpenAI (Payant, Cloud)**
1. Créez un compte sur https://platform.openai.com
2. Obtenez une clé API
3. Configurez OPENAI_API_KEY

En attendant, vous pouvez :
- Suivre tous les cours normalement
- Passer les quiz
- Gagner des badges

L'assistant IA aide à :
- Expliquer des concepts
- Déboguer du code
- Générer des exercices
- Créer des quiz`;
  }

  /**
   * Explique un concept de programmation
   */
  static async explainConcept(topic, language, level = 'beginner') {
    const levelDescriptions = {
      beginner: 'débutant (avec des exemples simples)',
      intermediate: 'intermédiaire (avec des cas d\'usage pratiques)',
      advanced: 'avancé (avec des détails techniques approfondis)'
    };

    const prompt = `Tu es un professeur de programmation expert. Explique le concept suivant de manière claire et pédagogique pour un niveau ${levelDescriptions[level]}.

Langage : ${language}
Concept : ${topic}

Structure ta réponse ainsi :
1. Définition simple
2. Exemple de code commenté
3. Cas d'usage pratique
4. Pièges à éviter

Utilise un langage clair et accessible.`;

    return await this.generate(prompt, {
      temperature: 0.7
    });
  }

  /**
   * Aide au débogage de code
   */
  static async debugCode(code, language, error = '') {
    const prompt = `Tu es un expert en débogage de code ${language}. Analyse le code suivant et aide à résoudre le problème.

Code :
\`\`\`${language.toLowerCase()}
${code}
\`\`\`

${error ? `Erreur rencontrée : ${error}` : 'Identifie les problèmes potentiels dans ce code.'}

Fournis :
1. L'explication du problème
2. La solution corrective (code corrigé)
3. Pourquoi c'était un problème
4. Comment éviter ce problème à l'avenir`;

    return await this.generate(prompt, {
      temperature: 0.5
    });
  }

  /**
   * Génère un exercice de programmation
   */
  static async generateExercise(language, topic, level = 'beginner') {
    const levelDescriptions = {
      beginner: 'débutant (exercice simple)',
      intermediate: 'intermédiaire (exercice modéré)',
      advanced: 'avancé (exercice complexe)'
    };

    const prompt = `Génère un exercice de programmation en ${language} sur le thème "${topic}" pour un niveau ${levelDescriptions[level]}.

Structure :
1. Titre de l'exercice
2. Énoncé clair et précis
3. Exemple d'entrée/sortie attendue
4. Indices (sans donner la solution)
5. Solution complète commentée

L'exercice doit être pratique et pédagogique.`;

    return await this.generate(prompt, {
      temperature: 0.8
    });
  }

  /**
   * Génère un quiz automatiquement
   */
  static async generateQuiz(language, topic, numberOfQuestions = 5) {
    const prompt = `Génère un quiz de ${numberOfQuestions} questions à choix multiples (QCM) sur le thème "${topic}" en ${language}.

Pour chaque question, fournis :
- La question
- 4 options de réponse (A, B, C, D)
- La lettre de la réponse correcte
- Une courte explication de pourquoi c'est la bonne réponse

Format JSON attendu :
{
  "questions": [
    {
      "question": "Question ici ?",
      "options": {
        "A": "Option A",
        "B": "Option B",
        "C": "Option C",
        "D": "Option D"
      },
      "correctAnswer": "A",
      "explanation": "Explication ici"
    }
  ]
}

Génère exactement ${numberOfQuestions} questions de difficulté progressive.`;

    const response = await this.generate(prompt, {
      temperature: 0.7
    });

    // Tenter de parser le JSON
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Erreur lors du parsing JSON:', error);
    }

    return { raw: response };
  }

  /**
   * Génère des suggestions de code
   */
  static async suggestCode(description, language) {
    const prompt = `Tu es un assistant de programmation. Génère du code ${language} pour la tâche suivante :

${description}

Fournis :
1. Code complet et fonctionnel
2. Commentaires expliquant les parties importantes
3. Exemple d'utilisation

Le code doit suivre les bonnes pratiques et être prêt à l'emploi.`;

    return await this.generate(prompt, {
      temperature: 0.6
    });
  }

  /**
   * Améliore du code existant
   */
  static async improveCode(code, language) {
    const prompt = `Analyse et améliore le code ${language} suivant :

\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Fournis :
1. Code amélioré avec les bonnes pratiques
2. Liste des améliorations apportées
3. Explications des changements

Focus sur : lisibilité, performance, sécurité et maintenabilité.`;

    return await this.generate(prompt, {
      temperature: 0.5
    });
  }

  /**
   * Génère une explication de code
   */
  static async explainCode(code, language) {
    const prompt = `Explique ce code ${language} de manière pédagogique :

\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Fournis :
1. Résumé de ce que fait le code
2. Explication ligne par ligne ou par bloc
3. Concepts clés utilisés
4. Cas d'usage potentiels`;

    return await this.generate(prompt, {
      temperature: 0.6
    });
  }
}

export default LLMService;
