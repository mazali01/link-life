import './App.css';
import { Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import FeedPage from './Pages/FeedPage';
import UserPage from './Pages/UserPage';
import AppOutlet from './Pages/AppOutlet';
import { AdminPage } from './Pages/AdminPage';
import { LandingPage } from './Pages/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path="/dashboard" element={<AdminPage />} />
          <Route path="/app" element={<AppOutlet />}>
            <Route path="/app" element={<FeedPage />} />
            <Route path="/app/:encodedEmail" element={<UserPage />} />
          </Route>
          <Route path='/' element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/app" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
