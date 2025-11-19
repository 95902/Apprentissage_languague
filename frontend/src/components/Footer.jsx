import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>📚 Learning Platform</h4>
            <p className="text-muted">
              Apprenez la programmation avec l'aide d'un LLM local
            </p>
          </div>

          <div className="footer-section">
            <h4>Langages</h4>
            <ul className="footer-links">
              <li><a href="/courses?lang=PHP">PHP</a></li>
              <li><a href="/courses?lang=JavaScript">JavaScript</a></li>
              <li><a href="/courses?lang=CSS">CSS</a></li>
              <li><a href="/courses?lang=HTML">HTML</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Ressources</h4>
            <ul className="footer-links">
              <li><a href="/courses">Tous les cours</a></li>
              <li><a href="/assistant">Assistant IA</a></li>
              <li><a href="/dashboard">Mon dashboard</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>À propos</h4>
            <p className="text-muted">
              Plateforme propulsée par Ollama
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="text-muted">
            © {new Date().getFullYear()} Learning Platform. Créé avec React & Ollama
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
