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
import { listCustomers } from '../../graphql/queries'
// import * as mutations from '../../graphql/mutations'
import { createCustomer as createCustomerMutation } from '../../graphql/mutations'

const initialFormState = {
  name: '',
  number: '',
  address: '',
  deliverer: '',
  price: 100,
  wednesdayOrder: false,
  saturdayOrder: false
}

function CustomerToolbar() {
  const [customers, setCustomers] = useState([])
  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const apiData = await API.graphql({ query: listCustomers })
    // console.log(customers)
    setCustomers(apiData.data.listCustomers.items)
  }

  async function createCustomer() {
    if (!formData.name || !formData.number || !formData.address) {
      alert("Cant create an empty customer! - Fill out the form please")
      return;
    }
    // Create a new customer using graphql mutation functionality
    await API.graphql({ query: createCustomerMutation, variables: { input: formData } });
    // Re-initialize the form 
    setFormData(initialFormState)
    // Grab the list of customers from graphql query functionality
    const apiData = await API.graphql({ query: listCustomers })
    // Set the newly updated list of customers
    setCustomers(apiData.data.listCustomers.items)
    console.log(customers)
  }
  return (
    <Box sx={{ ml: 32 }}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ pr: 25 }}>
            <Box sx={{  }}>
              <TextField
                placeholder="Customer Name"
                variant="outlined"
                sx={{ pr: 1}}
                onChange = { e => setFormData({ ...formData, 'name': e.target.value})}
                value = {formData.name}
              />
              <TextField
                placeholder="Phone Number"
                variant="outlined"
                sx={{ pr: 1}}
                onChange = { e => setFormData({ ...formData, 'number': e.target.value})}
                value = {formData.number}
              />
              <TextField
                placeholder="Address"
                variant="outlined"
                sx={{ pr: 1, minWidth: 350}}
                onChange = { e => setFormData({ ...formData, 'address': e.target.value})}
                value = {formData.address}
              />
              
              <Button
                color="primary"
                variant="contained"
                sx={{ height: 55 }}
                onClick={createCustomer}
              >
                Add customer
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
                placeholder="Search customer"
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
