import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { listMenuItems } from '../../graphql/queries'
import * as mutations from '../../graphql/mutations'

const initialFormState = {
  name: '',
  servingSize: '',
  weeklyMenu: false
}

function CustomerToolbar() {
  const [menuItems, setMenu] = useState([])
  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const apiData = await API.graphql({ query: listMenuItems })
    setMenu(apiData.data.listMenuItems.items)
  }

  async function createMenu() {
    if (!formData.name || !formData.servingSize) {
      alert("Cant create an empty menu item! - Fill out the form please")
      return;
    }
    // Create a new customer using graphql mutation functionality
    await API.graphql({ query: mutations.createMenuItem, variables: { input: formData } });
    // Re-initialize the form 
    setFormData(initialFormState)
    // Grab the list of menu items from graphql query functionality
    const apiData = await API.graphql({ query: listMenuItems })
    // Set the newly updated list of menu
    setMenu(apiData.data.listMenuItems.items)
    console.log(menuItems)
  }
  return (
    <Box sx={{ ml: 32 }}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ pr: 25 }}>
            <Box sx={{  }}>
              <TextField
                placeholder="Menu Name"
                variant="outlined"
                sx={{ pr: 1}}
                onChange = { e => setFormData({ ...formData, 'name': e.target.value})}
                value = {formData.name}
              />
              <TextField
                placeholder="Serving Size"
                variant="outlined"
                sx={{ pr: 1}}
                onChange = { e => setFormData({ ...formData, 'servingSize': e.target.value})}
                value = {formData.servingSize}
              />
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 55 }}
                onClick={createMenu}
              >
                Add menu
              </Button>
              
            </Box>
          </CardContent>
        </Card>
        
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ pr: 25 }}>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search menu item"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default CustomerToolbar;
