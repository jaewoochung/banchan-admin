// import { Link as RouterLink } from 'react-router-dom';
import {
} from "react-router-dom"
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  Typography
} from '@material-ui/core';
import {
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import HomeIcon from '@material-ui/icons/Home';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Today Banchan',
  name: 'Jaewoo Chung'
};

const items = [
  {
    href: '/',
    icon: HomeIcon,
    title: 'Home'
  },
  {
    href: '/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/menu',
    icon: ShoppingBagIcon,
    title: 'Menu'
  }
];

const DashboardSidebar = () => {

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        {/* <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        /> */}
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
              bgcolor: 'background.default'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
              
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};


export default DashboardSidebar;
