import './App.css'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Jobs from './components/Jobs'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

import FullJobDescription from './components/FullJobDescription'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/jobs/:id" component={FullJobDescription} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)
export default App
