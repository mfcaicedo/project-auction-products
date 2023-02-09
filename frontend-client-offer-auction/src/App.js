import './App.css';
import { BrowserRouter } from 'react-router-dom';
import PublicRouters from './routers/PublicRouters';
import { useLocalStorage } from './utils/useLocalStorage';

function App() {
  const [user, setUser] = useLocalStorage('user', null);
  return (
    <div className="App">
      <BrowserRouter>
        <PublicRouters user={user} />
      </BrowserRouter>
    </div>
  );
}

export default App;
