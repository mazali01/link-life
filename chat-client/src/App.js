import './App.css';
import { Route, Redirect } from 'react-router-dom';
import AuthPage from './Pages/AuthPage';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <div className="App">
      <Route path='/auth' component={AuthPage} />
      <Route path="/chats" component={ChatPage} />
      <Redirect to="/auth" />
    </div>
  );
}

export default App;
