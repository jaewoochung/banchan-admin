import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { listCustomers } from '../graphql/queries'

function DongsookCustomers() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const apiData = await API.graphql({ query: listCustomers })
    setCustomers(apiData.data.listCustomers.items)
  }

  return (
    <div>
      <h1>Dongsook's Customers</h1>
      {
        customers.filter(customer => customer.deliverer === 'Dongsook').map(filteredCustomer => (
          <div>
            Name: {filteredCustomer.name}
          </div>
        ))
      }
    </div>
  )
}

export default DongsookCustomers