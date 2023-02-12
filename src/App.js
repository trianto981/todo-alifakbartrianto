import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Detail from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/activity/:id" element={<Detail/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
