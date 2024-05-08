import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import Mainpg from './Components/Mainpg/mainp';
import Authorization from './Components/Authorization/authorizpage';
import Progress from './Components/Progress/progress';
import PreLoader from './Components/compon/PreLoader';
import Profilepage from './Components/Profilepage/profilepage';
import Profileside from './Components/Profileside/profileside';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <PreLoader />
      <Routes>
        <Route path="/" element={<div><Mainpg /></div>} />
        <Route path="/authorizpage" element={<div><Authorization /></div>} />
        <Route path="/login" element={<div><Login /></div>} />
        <Route path="/signup" element={<div><Signup /></div>} />
        <Route path="/progress" element={<div><Progress /></div>} />
        <Route path="/profilepage" element={<div><Profilepage /></div>}></Route>
        <Route path="/profileside" element={<div><Profileside /></div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
