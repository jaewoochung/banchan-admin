import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerResults from '../components/customer/CustomerResults'
import CustomerToolBar from '../components/customer/CustomerToolbar';
import { makeStyles } from '@material-ui/styles';

const DashboardLayoutRoot = makeStyles({
  root: {
    backgroundColor: 'background.default',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
});

const DashboardLayoutWrapper = makeStyles({
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    
  }
})

const DashboardLayoutContainer = makeStyles({
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  }
})

const DashboardLayoutContent = makeStyles({
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
})

const CustomerList = () => (
  <>
    <div className = {DashboardLayoutRoot.root}>
      <div className={DashboardLayoutWrapper.wrapper}>
        <div className={DashboardLayoutContainer.container}>
          <div className={DashboardLayoutContent.content}>
            <Helmet>
              <title>Customers | Material Kit</title>
            </Helmet>
            <Box
              sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 12
              }}
            >
              <Container maxWidth={false}>
                <CustomerToolBar />
                <Box sx={{ pt: 3 }}>
                  <CustomerResults />
                </Box>
              </Container>
            </Box>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default CustomerList;
