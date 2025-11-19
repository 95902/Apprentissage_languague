import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [badges, setBadges] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await api.get('/auth/profile');
      setStats(response.data.stats);
      setBadges(response.data.badges);
      setProgress(response.data.progress);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <div className="loading" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Bienvenue, {user?.username} !</h1>
        <p className="text-muted">Voici un aperçu de votre progression</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-value">{stats?.total_badges || 0}</div>
            <div className="stat-label">Badges obtenus</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📚</div>
            <div className="stat-value">{stats?.completed_lessons || 0}</div>
            <div className="stat-label">Leçons complétées</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{stats?.passed_quizzes || 0}</div>
            <div className="stat-label">Quiz réussis</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-value">
              {stats?.average_score ? Math.round(stats.average_score) : 0}%
            </div>
            <div className="stat-label">Score moyen</div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Mes badges</h2>
          {badges.length > 0 ? (
            <div className="badges-grid">
              {badges.map(badge => (
                <div key={badge.id} className="badge-card">
                  <div className="badge-icon-large">{badge.icon}</div>
                  <h3>{badge.name}</h3>
                  <p className="text-muted">{badge.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Vous n'avez pas encore de badges. Complétez des cours pour en gagner !</p>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Ma progression</h2>
          {progress.length > 0 ? (
            <div className="progress-list">
              {progress.map(item => (
                <div key={item.course_id} className="progress-item">
                  <div className="progress-header">
                    <h3>{item.course_title}</h3>
                    <span className="progress-percentage">{item.progress_percentage}%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: `${item.progress_percentage}%` }}></div>
                  </div>
                  <p className="text-muted">
                    {item.completed_lessons} / {item.total_lessons} leçons complétées
                  </p>
                  <Link to={`/courses/${item.course_id}`} className="btn btn-primary btn-sm">
                    Continuer
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-muted">Vous n'avez pas encore commencé de cours.</p>
              <Link to="/courses" className="btn btn-primary">
                Parcourir les cours
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
