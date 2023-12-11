import { useState } from 'react';
import './App.css';
// import User from './components/User/User';
import PrivateText from './pages/PrivateText/PrivateText';
const App=()=>{
  const [currUser, setCurrUser]=useState(null);
  return (
    <div className="App">
      <PrivateText currUser={currUser} setCurrUser={setCurrUser}></PrivateText>
      {/* <User currUser={currUser} setCurrUser={setCurrUser} /> */}
    </div>
  );
}
export default App;