import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <Route path='/' exact>
          <Redirect to={'/login'} />
        </Route>
        <Route path={'/login'} exact component={Login} />
        <Route path={'/signup'} exact component={Signup} />
        <Route path={'/home'} exact component={Home} />
      </BrowserRouter>
    </div>
  );
}

export default App;
