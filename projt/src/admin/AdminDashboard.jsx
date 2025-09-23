import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [candidatures, setCandidatures] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState('candidatures');

  useEffect(() => {
    fetch("http://localhost:5000/candidatures")
      .then(res => res.json())
      .then(data => setCandidatures(data))
      .catch(err => console.error(err));

    fetch("http://localhost:5000/contact")
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>🛠️ Interface Admin</h1>
      <div className="tab-buttons">
        <button
          onClick={() => setTab('candidatures')}
          className={tab === 'candidatures' ? 'active' : ''}
        >
          📄 Candidatures
        </button>
        <button
          onClick={() => setTab('messages')}
          className={tab === 'messages' ? 'active' : ''}
        >
          📬 Messages
        </button>
      </div>

      {tab === 'candidatures' && (
        <div className="table-wrapper">
          <h2>📄 Liste des Candidatures</h2>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Poste</th>
                <th>Niveau d'étude</th>
                <th>CV</th>
              </tr>
            </thead>
            <tbody>
              {candidatures.map((c) => (
                <tr key={c._id}>
                  <td>{c.nom}</td>
                  <td>{c.prenom}</td>
                  <td>{c.posteChoisi}</td>
                  <td>{c.niveauEtude}</td>
                  <td>
                    {c.cv ? (
                      <a
                        href={`http://localhost:5000/uploads/${c.cv}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Voir CV
                      </a>
                    ) : (
                      'Aucun'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'messages' && (
        <div className="table-wrapper">
          <h2>📬 Messages de Contact</h2>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m._id}>
                  <td>{m.nom}</td>
                  <td>{m.prenom}</td>
                  <td>{m.email}</td>
                  <td>{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
