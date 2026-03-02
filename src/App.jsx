import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch for window size
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(false);

    // Check against the environment variable
    // We remove quotes and whitespace just in case
    const targetPassword = import.meta.env.VITE_BIRTHDAY_PASSWORD?.trim().replace(/^"|"$/g, '');
    const enteredPassword = password.trim().replace(/^"|"$/g, '');

    if (enteredPassword === targetPassword) {
      setIsUnlocked(true);
    } else {
      setError(true);
      // Automatically hide error after 3 seconds
      setTimeout(() => setError(false), 3000);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="app-container">
        <div className="glass-card">
          <h1 className="title">Special Delivery</h1>
          <p className="subtitle">Enter the secret code to unlock</p>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              placeholder="Enter password..."
              className="password-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="error-message">Oops! That's not the right password.</div>}
            <button type="submit" className="unlock-btn">
              Unlock Surprise ✨
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {mounted && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.05}
        />
      )}

      <div className="birthday-content">
        <h1 className="birthday-title">Happy Birthday! 🎂🥳</h1>
        <div className="video-container">
          <ReactPlayer
            url='https://your-video-link.com/video.mp4'
            playing={false}
            controls={true}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            wrapper={({ children }) => (
              <div style={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
                {children}
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: -1 }}>
                  <span className="video-placeholder">Your awesome video will go here!</span>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
