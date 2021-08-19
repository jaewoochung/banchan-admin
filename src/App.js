import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Home from './components/Home'
import Customer from './components/Customer'
import Menu from './components/Menu'

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/customers">Customers</Link>
          <Link style={padding} to="/menu">Menu Set</Link>
        </div>


        <Switch>
          <Route path="/menu">
            <Menu />
          </Route>
          <Route path="/customers">
            <Customer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      <p style={ {marginBottom: 60} }></p>
      <AmplifySignOut />
    </div>
  )
}

// export default App
export default withAuthenticator(App);