import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { listCustomers } from '../graphql/queries'

function MisunCustomers() {
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
      <h1>Misun's Customers</h1>
      {
        customers.filter(customer => customer.deliverer === 'Misun').map(filteredCustomer => (
          <div>
            Name: {filteredCustomer.name}
          </div>
        ))
      }
    </div>
  )
}

export default MisunCustomers