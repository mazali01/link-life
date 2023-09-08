import './App.css';
import { Route, BrowserRouter, Navigate, Routes } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import FeedPage from './Pages/FeedPage';
import UserPage from './Pages/UserPage';
import AppOutlet from './Pages/AppOutlet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/auth' element={<AuthPage />} />
          <Route path="/" element={<AppOutlet />}>
            <Route path="/" element={<FeedPage />} />
            <Route path="/:encodedEmail" element={<UserPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
