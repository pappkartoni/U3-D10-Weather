import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Search from './components/Search';
import CityPage from "./components/CityPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/:city" element={<CityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
