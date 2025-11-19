import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateProfile(formData);
      setMessage('Profil mis à jour avec succès');
      setEditing(false);
    } catch (error) {
      setMessage('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{padding: 'var(--spacing-2xl) 0', maxWidth: '600px'}}>
      <h1>Mon Profil</h1>

      {message && (
        <div className={`alert ${message.includes('succès') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="card" style={{marginTop: 'var(--spacing-xl)'}}>
        {!editing ? (
          <>
            <div style={{marginBottom: 'var(--spacing-lg)'}}>
              <label style={{fontWeight: 600, display: 'block', marginBottom: 'var(--spacing-xs)'}}>
                Nom d'utilisateur
              </label>
              <p>{user?.username}</p>
            </div>

            <div style={{marginBottom: 'var(--spacing-lg)'}}>
              <label style={{fontWeight: 600, display: 'block', marginBottom: 'var(--spacing-xs)'}}>
                Email
              </label>
              <p>{user?.email}</p>
            </div>

            <button onClick={() => setEditing(true)} className="btn btn-primary">
              Modifier le profil
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: 'var(--spacing-md)'}}>
              <label>Nom d'utilisateur</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>

            <div style={{marginBottom: 'var(--spacing-md)'}}>
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div style={{display: 'flex', gap: 'var(--spacing-md)'}}>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <div className="loading"></div> : 'Enregistrer'}
              </button>
              <button type="button" onClick={() => setEditing(false)} className="btn btn-secondary">
                Annuler
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
