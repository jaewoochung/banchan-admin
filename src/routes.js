import { Navigate } from 'react-router-dom';
import Home from './components/Home'
import Customer from './components/Customer'
import DashboardLayout from './components/DashboardLayout'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'customers', element: <Customer /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  // {
  //   path: '/',
  //   element: <MainLayout />,
  //   children: [
  //     { path: '/', element: <Navigate to="/app/dashboard" /> },
  //     { path: '*', element: <Navigate to="/404" /> }
  //   ]
  // }
];

export default routes;