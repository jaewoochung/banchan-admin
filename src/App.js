import * as React from 'react'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme'
import {
  Switch, Route,
} from "react-router-dom"
import Home from './components/Home'
import CustomerList from './pages/CustomerList'
import MenuList from './pages/MenuList'
import DashboardNavbar from './components/DashboardNavbar'
import DashboardSidebar from './components/DashboardSidebar';

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        {/* <Box> */}
          <DashboardNavbar />
          <BrowserRouter>
            <DashboardSidebar />
            <Switch>
              <Route path="/menu">
                <MenuList />
              </Route>
              <Route path="/customers">
                {/* <Customer /> */}
                <CustomerList />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </BrowserRouter>
        {/* </Box> */}
      <AmplifySignOut />

      </ThemeProvider>
  )
}

export default withAuthenticator(App);