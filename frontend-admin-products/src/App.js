import './App.css';
import { BrowserRouter, redirect } from 'react-router-dom';
import PublicRouters from './routers/PublicRouters';
import { useLocalStorage } from './utils/useLocalStorage';

function App() {
  const [user, setUser] = useLocalStorage('user', null);
  return (
    <div className="App px-3 py-2">
      <BrowserRouter>
        <PublicRouters user={user} />
      </BrowserRouter>
    </div>
  );
}

export default App;
