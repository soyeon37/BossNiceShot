import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from './setup/routes-manager/Navbar';
import Main from './pages/main/Main'
import Solution from './pages/solution/Solution';
import Learning from './pages/learning/Learning';
import Golffield from './pages/golffield/Golffield';
import Accompany from "./pages/accompany/Accompany";
import Community from './pages/community/Community';
import Signup from './pages/signup/Signup';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/solution" element={<Solution />}/>
            <Route path="/learning" element={<Learning />}/>
            <Route path="/golffield" element={<Golffield />}/>
            <Route path='/accompany/' element={<Accompany />} />
            <Route path="/community" element={<Community />}/>
            <Route path="/Signup/" element={<Signup />}/> 
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
