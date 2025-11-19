import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../services/api';
import './CoursesPage.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await courseService.getAll();
      setCourses(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des cours:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = filter === 'all'
    ? courses
    : courses.filter(c => c.language === filter);

  const languages = [...new Set(courses.map(c => c.language))];

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
        <div className="loading" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="container">
        <h1>Tous les cours</h1>
        <p className="text-muted">Explorez nos cours et commencez à apprendre</p>

        <div className="courses-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous
          </button>
          {languages.map(lang => (
            <button
              key={lang}
              className={`filter-btn ${filter === lang ? 'active' : ''}`}
              onClick={() => setFilter(lang)}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filteredCourses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} className="course-card">
              <div className="course-header">
                <span className="course-language">{course.language}</span>
                <span className={`course-level level-${course.level}`}>
                  {course.level}
                </span>
              </div>
              <h3>{course.title}</h3>
              <p className="text-muted">{course.description}</p>
              <div className="course-footer">
                <span>{course.total_lessons} leçons</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <p className="text-center text-muted">Aucun cours trouvé</p>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
