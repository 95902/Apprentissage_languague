import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const QuizPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadQuiz();
  }, [id]);

  const loadQuiz = async () => {
    try {
      const response = await quizService.getById(id);
      setQuiz(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({...answers, [questionId]: answer});
  };

  const handleSubmit = async () => {
    try {
      const response = await quizService.submit(id, answers);
      setResult(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la soumission');
    }
  };

  if (loading) return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}><div className="loading" style={{width: '40px', height: '40px', margin: '0 auto'}}></div></div>;
  if (!quiz) return <div className="container"><p>Quiz non trouvé</p></div>;

  if (result) {
    return (
      <div className="container" style={{padding: 'var(--spacing-2xl) 0', maxWidth: '800px'}}>
        <h1>Résultats</h1>
        <div className="card" style={{marginTop: 'var(--spacing-xl)', textAlign: 'center'}}>
          <h2 style={{fontSize: '3rem', color: result.passed ? 'var(--success)' : 'var(--error)'}}>{result.score}%</h2>
          <p style={{fontSize: '1.25rem', marginBottom: 'var(--spacing-lg)'}}>
            {result.correctAnswers} / {result.totalQuestions} bonnes réponses
          </p>
          <p className={result.passed ? 'text-success' : 'text-error'} style={{fontSize: '1.125rem', fontWeight: 600}}>
            {result.passed ? '✓ Quiz réussi !' : '✗ Quiz non réussi'}
          </p>
          {result.newBadges && result.newBadges.length > 0 && (
            <div style={{marginTop: 'var(--spacing-lg)'}>
              <p style={{fontWeight: 600}}>Nouveau badge obtenu !</p>
              {result.newBadges.map(badge => (
                <div key={badge.id} style={{fontSize: '2rem', marginTop: 'var(--spacing-md)'}}>{badge.icon} {badge.name}</div>
              ))}
            </div>
          )}
        </div>
        <div style={{marginTop: 'var(--spacing-xl)'}}>
          {result.questions?.map((q, index) => (
            <div key={q.id} className="card" style={{marginBottom: 'var(--spacing-md)'}}>
              <h4>Question {index + 1}</h4>
              <p>{q.question_text}</p>
              <p style={{color: q.is_correct ? 'var(--success)' : 'var(--error)'}}>
                Votre réponse: {q.user_answer || 'Non répondu'} {q.is_correct ? '✓' : '✗'}
              </p>
              <p>Bonne réponse: {q.correct_answer}</p>
              {q.explanation && <p className="text-muted">{q.explanation}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{padding: 'var(--spacing-2xl) 0', maxWidth: '800px'}}>
      <h1>{quiz.title}</h1>
      <p className="text-muted">{quiz.description}</p>

      <div style={{marginTop: 'var(--spacing-xl)'}}>
        {quiz.questions?.map((question, index) => (
          <div key={question.id} className="card" style={{marginBottom: 'var(--spacing-lg)'}}>
            <h3>Question {index + 1}</h3>
            <p style={{fontSize: '1.125rem', marginBottom: 'var(--spacing-md)'}}>{question.question_text}</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)'}}>
              {['A', 'B', 'C', 'D'].map(option => question[`option_${option.toLowerCase()}`] && (
                <label key={option} style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', padding: 'var(--spacing-sm)', cursor: 'pointer', backgroundColor: answers[question.id] === option ? 'var(--bg-tertiary)' : 'transparent', borderRadius: 'var(--radius-md)'}}>
                  <input type="radio" name={`question_${question.id}`} value={option} onChange={() => handleAnswerChange(question.id, option)} />
                  <span>{option}. {question[`option_${option.toLowerCase()}`]}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="btn btn-primary btn-lg" disabled={Object.keys(answers).length !== quiz.questions?.length} style={{marginTop: 'var(--spacing-xl)'}}>
        Soumettre le quiz
      </button>
    </div>
  );
};

export default QuizPage;
