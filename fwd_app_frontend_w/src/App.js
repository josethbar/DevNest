import { useState } from 'react';
import './App.css';
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
      <PrivateText currUser={currUser} setCurrUser={setCurrUser} />
    </div>
  );
};

export default App;
