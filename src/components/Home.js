import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import {
} from '@material-ui/core';
import TotalCustomers from './TotalCustomers'
import TotalOrders from './TotalOrders'
import TotalProfits from './TotalProfits'
import HomeMenuList from './HomeMenuList'
import LatestCustomers from './LatestCustomers'

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


function Home () {
  return (
     <div className = {DashboardLayoutRoot.root}>
       <div className={DashboardLayoutWrapper.wrapper}>
         <div className={DashboardLayoutContainer.container}>
           <div className={DashboardLayoutContent.content}>
            <Box 
              sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 12,
              }}
            >
              <Container maxWidth={false}>
                <Grid sx={{ pl: 32, pr: 0}}
                  container
                  spacing={3}
                >
                  <Grid item lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    <TotalCustomers/>
                  </Grid>
                  <Grid item lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    <TotalOrders/>
                  </Grid>
                  <Grid item lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    <TotalProfits/>
                  </Grid>
                  <Grid item lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                  >
                    <TotalCustomers/>
                  </Grid>
                  <Grid
                    item
                    lg={4}
                    // md={6}
                    // xl={3}
                    xs={12}
                  >
                    <HomeMenuList sx={{ bgcolor: 'white', height: '100%' }} />
                  </Grid>
                  <Grid
                    item
                    lg={8}
                    // md={12}
                    // xl={9}
                    xs={12}
                  >
                    <LatestCustomers sx={{ height: '100%' }} />
                  </Grid>
                </Grid>
              </Container>
            </Box>
            </div>
          </div>
        </div>
     </div>
  )
}

export default Home