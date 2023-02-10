import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Search from './components/Search';
import CityPage from "./components/CityPage"
import Navi from './components/Navi';

function App() {
  return (
    <BrowserRouter>
      <Navi />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/:city" element={<CityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
