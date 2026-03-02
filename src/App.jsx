import { useState } from 'react'
import ReactPlayer from 'react-player'

function App() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Accessing the secret from your .env file
    if (password === import.meta.env.VITE_BIRTHDAY_PASSWORD) {
      setIsUnlocked(true);
    } else {
      alert("Oops! That's not the right password.");
    }
  };

  if (!isUnlocked) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1>Who is this for?</h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter the secret code"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Unlock Surprise</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Happy Birthday! 🎂</h1>
      <ReactPlayer
        url='https://your-video-link.com/video.mp4'
        playing={true}
        controls={true}
        width="100%"
      />
    </div>
  );
}

export default App;
