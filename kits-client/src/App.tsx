import './App.css';
import { Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
