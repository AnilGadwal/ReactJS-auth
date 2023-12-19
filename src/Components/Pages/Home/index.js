import { useEffect, useState } from 'react';
import './Home.css';
import { useAuth } from '../../../Contexts/authContext';
import { logout } from '../../../utils';

const Home = () => {
  const { setToken } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  }, []);

  const handleLogout = () => {
    setToken('');
    logout(process.env.REACT_APP_API_BASE_URL)
  };

  return (
    <div className="welcome-container">
      <div className={`welcome-content ${showContent ? 'fade-in' : ''}`}>
        <h1>Welcome 👋 🤓</h1>
        <p>This app is made with React, Typescript, Vanilla CSS, NestJS, MongoDB and Prisma! ❤️</p>
        <p>This app has really good input validations! ✅</p>
        <p>This app has extensive logging on the backend! 🖥️</p>
        <p>This app employs a refresh token strategy with JWTs, avoiding storing tokens in vulnerable spaces like local storage or cookies. This approach mitigates risks associated with potential attacks such as CSRF and XSR. The refresh token, created with a secure one-day validity, is transmitted via HTTP-only cookies, reinforcing its safety measures! 💪</p>
        <p>Additionally, the access token, found in the response body, is stored within the frontend state, because of which, upon each page refresh the access token is lost. Lost 🙁? that's a bummer, now the user has to login again 😰? NOT REALLY! 😎. The application seamlessly acquires a new access token using the refresh token. This recurring process ensures heightened security and a continuously authenticated user session! 🔥</p>
        <p>Now look at the bottom right of your screen 👀</p>
        <small className='bottom-right small-text'>👈 Look at your bottom left </small>
        <small className='bottom-left small-text'>Oops! I meant the top left corner 😬👆</small>
        <small className='top-left small-text'>I really need this job 👉👈</small>
      </div>
      <button className='primary-btn' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
