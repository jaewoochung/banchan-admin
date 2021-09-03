import {
  AppBar,
  Box,
  Toolbar
} from '@material-ui/core';

const DashboardNavbar = () => {
  return (
    <AppBar elevation={0}>
      <Toolbar sx={{ bgcolor: '#5664d2' }}>
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
