import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import Mainpg from './Components/Mainpg/mainp';
import Authorization from './Components/Authorization/authorizpage';
import Progress from './Components/Progress/progress';
//import PreLoader from './Components/compon/PreLoader';
import Profilepage from './Components/Profilepage/profilepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TraineModal from "./Components/modal/traine_modal.jsx";
import ProgramModal from "./Components/modal/program_modal.jsx";
import TrainCatalog from "./Components/Mainpg/traine_catalog.jsx";
import ProgramCatalog from "./Components/Mainpg/program_catalog.jsx";


function App() {
  return (
    <Router>
      {/*<PreLoader />*/}
      <Routes>
        <Route path="/" element={<div><Mainpg /></div>} />
        <Route path="/authorizpage" element={<div><Authorization /></div>} />
        <Route path="/login" element={<div><Login /></div>} />
        <Route path="/signup" element={<div><Signup /></div>} />
        <Route path="/progress" element={<div><Progress /></div>} />
        <Route path="/profilepage/*" element={<div><Profilepage /></div>}></Route>
        <Route path="/traininginfo/:id" element={<div><TraineModal /></div>}></Route>
        <Route path="/programinfo/:id" element={<div><ProgramModal /></div>}></Route>
        <Route path="/traincatalog" element={<div><TrainCatalog /></div>}></Route>
        <Route path="/programcatalog" element={<div><ProgramCatalog /></div>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
