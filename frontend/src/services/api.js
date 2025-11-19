import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Services spécifiques

export const courseService = {
  getAll: () => api.get('/courses'),
  getById: (id) => api.get(`/courses/${id}`),
  getByLanguage: (language) => api.get(`/courses/language/${language}`),
  getLessonById: (id) => api.get(`/courses/lessons/${id}`),
  completeLesson: (lessonId) => api.post(`/courses/lessons/${lessonId}/complete`)
};

export const quizService = {
  getById: (id) => api.get(`/quizzes/${id}`),
  submit: (id, answers) => api.post(`/quizzes/${id}/submit`, { answers }),
  getAttempts: (id) => api.get(`/quizzes/${id}/attempts`)
};

export const llmService = {
  checkHealth: () => api.get('/llm/health'),
  explainConcept: (topic, language, level) =>
    api.post('/llm/explain', { topic, language, level }),
  debugCode: (code, language, error) =>
    api.post('/llm/debug', { code, language, error }),
  generateExercise: (language, topic, level) =>
    api.post('/llm/generate-exercise', { language, topic, level }),
  generateQuiz: (language, topic, numberOfQuestions) =>
    api.post('/llm/generate-quiz', { language, topic, numberOfQuestions }),
  suggestCode: (description, language) =>
    api.post('/llm/suggest-code', { description, language }),
  improveCode: (code, language) =>
    api.post('/llm/improve-code', { code, language }),
  explainCode: (code, language) =>
    api.post('/llm/explain-code', { code, language })
};

export const badgeService = {
  getAll: () => api.get('/badges'),
  getUserBadges: (userId) => api.get(`/users/${userId}/badges`)
};
