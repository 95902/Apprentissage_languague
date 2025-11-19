import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courseService } from '../services/api';

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      const response = await courseService.getById(id);
      setCourse(response.data);
      setLessons(response.data.lessons || []);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{padding: '100px 0', textAlign: 'center'}}><div className="loading" style={{width: '40px', height: '40px', margin: '0 auto'}}></div></div>;
  if (!course) return <div className="container"><p>Cours non trouvé</p></div>;

  return (
    <div className="container" style={{padding: 'var(--spacing-2xl) 0'}}>
      <h1>{course.title}</h1>
      <p className="text-muted">{course.description}</p>
      <div style={{marginTop: 'var(--spacing-xl)'}}>
        <h2>Leçons ({lessons.length})</h2>
        <div className="grid" style={{marginTop: 'var(--spacing-lg)'}}>
          {lessons.map((lesson, index) => (
            <Link to={`/lessons/${lesson.id}`} key={lesson.id} className="card" style={{textDecoration: 'none', color: 'inherit'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h3>Leçon {index + 1}: {lesson.title}</h3>
                {lesson.is_completed && <span style={{color: 'var(--success)'}}>✓</span>}
              </div>
              <p className="text-muted">{lesson.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
