import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ReactMarkdown from 'react-markdown';

const LessonPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLesson();
  }, [id]);

  const loadLesson = async () => {
    try {
      const response = await courseService.getLessonById(id);
      setLesson(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      await courseService.completeLesson(id);
      alert('Leçon complétée ! 🎉');
      setLesson({...lesson, is_completed: true});
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}><div className="loading" style={{width: '40px', height: '40px', margin: '0 auto'}}></div></div>;
  if (!lesson) return <div className="container"><p>Leçon non trouvée</p></div>;

  return (
    <div className="container" style={{padding: 'var(--spacing-2xl) 0', maxWidth: '800px'}}>
      <h1>{lesson.title}</h1>
      <p className="text-muted">{lesson.description}</p>

      <div style={{marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
        <ReactMarkdown>{lesson.content}</ReactMarkdown>
      </div>

      {lesson.code_example && (
        <div style={{marginTop: 'var(--spacing-xl)'}}>
          <h3>Exemple de code</h3>
          <pre style={{backgroundColor: 'var(--bg-secondary)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-md)', overflow: 'auto'}}>
            <code>{lesson.code_example}</code>
          </pre>
        </div>
      )}

      {lesson.exercise && (
        <div style={{marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)'}}>
          <h3>Exercice</h3>
          <p>{lesson.exercise}</p>
        </div>
      )}

      <div style={{marginTop: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-md)'}}>
        {isAuthenticated && !lesson.is_completed && (
          <button onClick={handleComplete} className="btn btn-success">
            Marquer comme complétée ✓
          </button>
        )}
        {lesson.is_completed && (
          <span className="badge badge-success">Leçon complétée ✓</span>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
