import React, { useState } from 'react';
import { llmService } from '../services/api';
import ReactMarkdown from 'react-markdown';

const LLMAssistantPage = () => {
  const [mode, setMode] = useState('explain');
  const [formData, setFormData] = useState({
    topic: '',
    language: 'JavaScript',
    level: 'beginner',
    code: '',
    error: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      let response;
      switch (mode) {
        case 'explain':
          response = await llmService.explainConcept(formData.topic, formData.language, formData.level);
          setResult(response.data.explanation);
          break;
        case 'debug':
          response = await llmService.debugCode(formData.code, formData.language, formData.error);
          setResult(response.data.help);
          break;
        case 'exercise':
          response = await llmService.generateExercise(formData.language, formData.topic, formData.level);
          setResult(response.data.exercise);
          break;
        case 'quiz':
          response = await llmService.generateQuiz(formData.language, formData.topic, 5);
          setResult(typeof response.data.quiz === 'string' ? response.data.quiz : JSON.stringify(response.data.quiz, null, 2));
          break;
      }
    } catch (error) {
      setResult('Erreur: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{padding: 'var(--spacing-2xl) 0', maxWidth: '1000px'}}>
      <h1>Assistant IA</h1>
      <p className="text-muted">Utilisez le LLM local pour vous aider dans votre apprentissage</p>

      <div style={{display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-xl)', flexWrap: 'wrap'}}>
        <button className={`btn ${mode === 'explain' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('explain')}>
          Expliquer un concept
        </button>
        <button className={`btn ${mode === 'debug' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('debug')}>
          Déboguer du code
        </button>
        <button className={`btn ${mode === 'exercise' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('exercise')}>
          Générer un exercice
        </button>
        <button className={`btn ${mode === 'quiz' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setMode('quiz')}>
          Générer un quiz
        </button>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{marginTop: 'var(--spacing-xl)'}}>
        <div style={{marginBottom: 'var(--spacing-md)'}}>
          <label>Langage</label>
          <select value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})}>
            <option value="JavaScript">JavaScript</option>
            <option value="PHP">PHP</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
            <option value="Python">Python</option>
          </select>
        </div>

        {(mode === 'explain' || mode === 'exercise' || mode === 'quiz') && (
          <>
            <div style={{marginBottom: 'var(--spacing-md)'}}>
              <label>Sujet</label>
              <input type="text" value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} placeholder="Ex: Les closures, Les boucles, etc." required />
            </div>
            <div style={{marginBottom: 'var(--spacing-md)'}}>
              <label>Niveau</label>
              <select value={formData.level} onChange={(e) => setFormData({...formData, level: e.target.value})}>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>
          </>
        )}

        {mode === 'debug' && (
          <>
            <div style={{marginBottom: 'var(--spacing-md)'}}>
              <label>Code à déboguer</label>
              <textarea value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} rows="10" placeholder="Collez votre code ici..." required />
            </div>
            <div style={{marginBottom: 'var(--spacing-md)'}}>
              <label>Message d'erreur (optionnel)</label>
              <input type="text" value={formData.error} onChange={(e) => setFormData({...formData, error: e.target.value})} placeholder="Message d'erreur..." />
            </div>
          </>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <div className="loading"></div> : 'Envoyer'}
        </button>
      </form>

      {result && (
        <div className="card" style={{marginTop: 'var(--spacing-xl)', backgroundColor: 'var(--bg-secondary)'}}>
          <h3>Résultat</h3>
          <div style={{marginTop: 'var(--spacing-md)', whiteSpace: 'pre-wrap'}}>
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default LLMAssistantPage;
