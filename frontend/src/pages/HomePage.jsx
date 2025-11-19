import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './HomePage.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Apprenez la Programmation avec l'IA
            </h1>
            <p className="hero-subtitle">
              Maîtrisez PHP, JavaScript, CSS, HTML et bien plus avec l'aide d'un assistant
              IA local propulsé par Ollama
            </p>
            <div className="hero-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary btn-lg">
                    Mon Dashboard
                  </Link>
                  <Link to="/courses" className="btn btn-secondary btn-lg">
                    Parcourir les cours
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Commencer gratuitement
                  </Link>
                  <Link to="/courses" className="btn btn-secondary btn-lg">
                    Explorer les cours
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Pourquoi cette plateforme ?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Cours Structurés</h3>
              <p>
                Des modules progressifs avec leçons détaillées, exemples de code et
                mini-exercices
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Quiz Interactifs</h3>
              <p>
                Validez vos connaissances avec des quiz à choix multiples et obtenez un
                feedback instantané
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Assistant IA Local</h3>
              <p>
                Posez vos questions, débogguez votre code et générez des exercices avec
                un LLM local
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Système de Badges</h3>
              <p>
                Gagnez des badges en complétant des modules et suivez votre progression
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Suivi de Progression</h3>
              <p>
                Visualisez votre avancement dans chaque cours et identifiez vos points
                forts
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>100% Local & Privé</h3>
              <p>
                Vos données restent chez vous grâce à l'utilisation d'Ollama en local
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="languages">
        <div className="container">
          <h2 className="section-title">Langages Disponibles</h2>
          <div className="languages-grid">
            <Link to="/courses?lang=PHP" className="language-card">
              <div className="language-icon">🐘</div>
              <h3>PHP</h3>
              <p>Backend puissant et populaire</p>
            </Link>

            <Link to="/courses?lang=JavaScript" className="language-card">
              <div className="language-icon">⚡</div>
              <h3>JavaScript</h3>
              <p>Le langage du web moderne</p>
            </Link>

            <Link to="/courses?lang=CSS" className="language-card">
              <div className="language-icon">🎨</div>
              <h3>CSS</h3>
              <p>Stylisez vos applications</p>
            </Link>

            <Link to="/courses?lang=HTML" className="language-card">
              <div className="language-icon">📄</div>
              <h3>HTML</h3>
              <p>Structure du web</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta">
          <div className="container">
            <div className="cta-content">
              <h2>Prêt à commencer votre apprentissage ?</h2>
              <p>Rejoignez-nous et commencez à apprendre dès aujourd'hui</p>
              <Link to="/register" className="btn btn-primary btn-lg">
                Créer un compte gratuitement
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
