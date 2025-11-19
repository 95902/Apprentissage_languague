import React, { useState } from 'react';
import api from '../services/api';
import './AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('course');
  const [message, setMessage] = useState('');

  // États pour le cours
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    language: 'JavaScript',
    level: 'beginner',
    image_url: ''
  });

  // États pour la leçon
  const [lessonData, setLessonData] = useState({
    course_id: '',
    title: '',
    description: '',
    content: '',
    code_example: '',
    exercise: '',
    order_index: 1,
    duration: 30
  });

  // États pour le quiz
  const [quizData, setQuizData] = useState({
    course_id: '',
    title: '',
    description: '',
    passing_score: 70
  });

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/courses', courseData);
      setMessage(`✅ Cours créé avec succès ! ID: ${response.data.id}`);
      setCourseData({
        title: '',
        description: '',
        language: 'JavaScript',
        level: 'beginner',
        image_url: ''
      });
    } catch (error) {
      setMessage(`❌ Erreur: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/courses/lessons', {
        ...lessonData,
        course_id: parseInt(lessonData.course_id),
        order_index: parseInt(lessonData.order_index),
        duration: parseInt(lessonData.duration)
      });
      setMessage(`✅ Leçon créée avec succès ! ID: ${response.data.id}`);
      setLessonData({
        course_id: lessonData.course_id,
        title: '',
        description: '',
        content: '',
        code_example: '',
        exercise: '',
        order_index: parseInt(lessonData.order_index) + 1,
        duration: 30
      });
    } catch (error) {
      setMessage(`❌ Erreur: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/quizzes', {
        ...quizData,
        course_id: parseInt(quizData.course_id),
        passing_score: parseInt(quizData.passing_score)
      });
      setMessage(`✅ Quiz créé avec succès ! ID: ${response.data.id}`);
      setQuizData({
        course_id: quizData.course_id,
        title: '',
        description: '',
        passing_score: 70
      });
    } catch (error) {
      setMessage(`❌ Erreur: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Administration</h1>
        <p className="text-muted">Gérez les cours, leçons et quiz de la plateforme</p>

        {message && (
          <div className={`alert ${message.startsWith('✅') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'course' ? 'active' : ''}`}
            onClick={() => setActiveTab('course')}
          >
            📚 Nouveau Cours
          </button>
          <button
            className={`tab-btn ${activeTab === 'lesson' ? 'active' : ''}`}
            onClick={() => setActiveTab('lesson')}
          >
            📖 Nouvelle Leçon
          </button>
          <button
            className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveTab('quiz')}
          >
            ✅ Nouveau Quiz
          </button>
        </div>

        {/* Formulaire Cours */}
        {activeTab === 'course' && (
          <form onSubmit={handleCreateCourse} className="admin-form card">
            <h2>Créer un nouveau cours</h2>

            <div className="form-group">
              <label>Titre du cours *</label>
              <input
                type="text"
                value={courseData.title}
                onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                placeholder="Ex: Python pour Débutants"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={courseData.description}
                onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                rows="3"
                placeholder="Décrivez le contenu du cours..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Langage *</label>
                <select
                  value={courseData.language}
                  onChange={(e) => setCourseData({...courseData, language: e.target.value})}
                >
                  <option value="JavaScript">JavaScript</option>
                  <option value="PHP">PHP</option>
                  <option value="Python">Python</option>
                  <option value="CSS">CSS</option>
                  <option value="HTML">HTML</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                  <option value="Ruby">Ruby</option>
                  <option value="Go">Go</option>
                </select>
              </div>

              <div className="form-group">
                <label>Niveau *</label>
                <select
                  value={courseData.level}
                  onChange={(e) => setCourseData({...courseData, level: e.target.value})}
                >
                  <option value="beginner">Débutant</option>
                  <option value="intermediate">Intermédiaire</option>
                  <option value="advanced">Avancé</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>URL de l'image (optionnel)</label>
              <input
                type="url"
                value={courseData.image_url}
                onChange={(e) => setCourseData({...courseData, image_url: e.target.value})}
                placeholder="https://images.unsplash.com/..."
              />
              <small className="text-muted">Suggestion: utilisez Unsplash pour des images gratuites</small>
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Créer le cours
            </button>
          </form>
        )}

        {/* Formulaire Leçon */}
        {activeTab === 'lesson' && (
          <form onSubmit={handleCreateLesson} className="admin-form card">
            <h2>Créer une nouvelle leçon</h2>

            <div className="form-row">
              <div className="form-group">
                <label>ID du Cours *</label>
                <input
                  type="number"
                  value={lessonData.course_id}
                  onChange={(e) => setLessonData({...lessonData, course_id: e.target.value})}
                  placeholder="Ex: 1"
                  required
                />
                <small className="text-muted">ID du cours auquel appartient cette leçon</small>
              </div>

              <div className="form-group">
                <label>Ordre *</label>
                <input
                  type="number"
                  value={lessonData.order_index}
                  onChange={(e) => setLessonData({...lessonData, order_index: e.target.value})}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Durée (min) *</label>
                <input
                  type="number"
                  value={lessonData.duration}
                  onChange={(e) => setLessonData({...lessonData, duration: e.target.value})}
                  min="5"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Titre de la leçon *</label>
              <input
                type="text"
                value={lessonData.title}
                onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
                placeholder="Ex: Introduction aux Variables"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={lessonData.description}
                onChange={(e) => setLessonData({...lessonData, description: e.target.value})}
                rows="2"
                placeholder="Courte description..."
                required
              />
            </div>

            <div className="form-group">
              <label>Contenu (Markdown) *</label>
              <textarea
                value={lessonData.content}
                onChange={(e) => setLessonData({...lessonData, content: e.target.value})}
                rows="10"
                placeholder="# Titre&#10;&#10;Contenu de la leçon en Markdown...&#10;&#10;## Sous-titre&#10;&#10;Texte..."
                required
              />
              <small className="text-muted">Utilisez la syntaxe Markdown (# pour titres, ** pour gras, etc.)</small>
            </div>

            <div className="form-group">
              <label>Exemple de code</label>
              <textarea
                value={lessonData.code_example}
                onChange={(e) => setLessonData({...lessonData, code_example: e.target.value})}
                rows="8"
                placeholder="// Votre code exemple ici&#10;console.log('Hello World!');"
                style={{fontFamily: 'monospace'}}
              />
            </div>

            <div className="form-group">
              <label>Exercice</label>
              <textarea
                value={lessonData.exercise}
                onChange={(e) => setLessonData({...lessonData, exercise: e.target.value})}
                rows="3"
                placeholder="Créez une fonction qui..."
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Créer la leçon
            </button>
          </form>
        )}

        {/* Formulaire Quiz */}
        {activeTab === 'quiz' && (
          <form onSubmit={handleCreateQuiz} className="admin-form card">
            <h2>Créer un nouveau quiz</h2>

            <div className="form-group">
              <label>ID du Cours *</label>
              <input
                type="number"
                value={quizData.course_id}
                onChange={(e) => setQuizData({...quizData, course_id: e.target.value})}
                placeholder="Ex: 1"
                required
              />
            </div>

            <div className="form-group">
              <label>Titre du quiz *</label>
              <input
                type="text"
                value={quizData.title}
                onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                placeholder="Ex: Quiz Python Débutant"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={quizData.description}
                onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                rows="2"
                placeholder="Testez vos connaissances..."
                required
              />
            </div>

            <div className="form-group">
              <label>Score de réussite (%) *</label>
              <input
                type="number"
                value={quizData.passing_score}
                onChange={(e) => setQuizData({...quizData, passing_score: e.target.value})}
                min="0"
                max="100"
                required
              />
              <small className="text-muted">Score minimum pour valider le quiz (ex: 70%)</small>
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Créer le quiz
            </button>

            <div className="alert" style={{marginTop: 'var(--spacing-lg)', backgroundColor: 'var(--bg-tertiary)'}}>
              <strong>Note:</strong> Après avoir créé le quiz, vous devrez ajouter les questions directement dans la base de données SQLite. Consultez le guide AJOUTER_COURS.md pour plus d'informations.
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
