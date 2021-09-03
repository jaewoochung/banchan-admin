import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { listMenuItems } from '../graphql/queries'

function LatestProducts() {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    fetchMenu()
  }, [])

  async function fetchMenu() {
    const apiData = await API.graphql({ query: listMenuItems })
    setMenu(apiData.data.listMenuItems.items)
  }

  return (
    <div>
    <Card>
    <CardHeader
      subtitle={`${menu.length} in total`}
      title="Latest Menu"
    />
    <Divider />
    <List sx={{ bgcolor: 'white'}}>
      {menu.filter(item => item.weeklyMenu).map((product, i) => (
        <ListItem
          divider={i < menu.length-1}
          key={product.id}
        >
          <ListItemAvatar>
            <AddIcon/>
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={product.servingSize}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
  </div>
  )
}

export default LatestProducts;
