import { useState } from 'react';
import './App.css';
import { AuthProvider } from './pages/PrivateText/AuthContext';
import PrivateText from './pages/PrivateText/PrivateText';

const App = () => {
  const [currUser, setCurrUser] = useState(null);

  
  // if (currUser !== null) {
  //   return (
  //     <div>
  //       <ul className='nav'>
  //         <li className='buttom-nav'>
  //           <a href="/home" className='link-nav'>Home 🏠</a>
  //         </li>
  //         <li className='buttom-nav'>
  //           <a href="/course" className='link-nav'>Course</a>
  //         </li>
  //         <li className='buttom-nav'>
  //           <a href="/group" className='link-nav'>Groups</a>
  //         </li>
  //       </ul>
  //     </div>
  //   );
  // }

  return (
    <div className="App">
      <AuthProvider>
      <PrivateText currUser={currUser} setCurrUser={setCurrUser} />
      </AuthProvider>
    </div>
  );
};

export default App;
