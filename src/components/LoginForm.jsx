import Logo from '../logo.png'
import { useState } from 'react';
import axios from 'axios';

const projectID = 'YOUR_PROJECT_KEY';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject });

      localStorage.setItem('username-share_talks', username);
      localStorage.setItem('password-share_talks', password);

      window.location.reload();
      setError('');
    } catch (err) {
      setError('oops, incorrect credentials.');
    }
  };

  return (
    <div className="wrapper">
      <div className="form">
        <div className="login_header">
          <img src={Logo} alt="logo" width="150px"/>
          <h1 className="title">Share Talks</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
          <div align="center">
            <button type="submit" className="button">
              <span>Start your Talk</span>
            </button>
          </div>
          <h3 className="error">{error}</h3>
        </form>
      </div>
    </div>

  );
};

export default Modal;
