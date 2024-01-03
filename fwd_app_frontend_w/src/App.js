import { useState } from 'react';
import './App.css';
import { AuthProvider } from './pages/PrivateText/AuthContext';
import PrivateText from './pages/PrivateText/PrivateText';

const App = () => {
  const [currUser, setCurrUser] = useState(null);
  return (
    <div className="App">
      <AuthProvider>
      <PrivateText currUser={currUser} setCurrUser={setCurrUser} />
      </AuthProvider>
    </div>
  );
};

export default App;
