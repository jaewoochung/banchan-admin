import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { listCustomers } from '../graphql/queries'
// import { createCustomer as createCustomerMutation, deleteCustomer as deleteCustomerMutation } from '../graphql/mutations'
import * as mutations from '../graphql/mutations'

const initialFormState = {
  name: '',
  number: '',
  address: ''
}

// const Customer = () => {
function Customer() {
  const [customers, setCustomers] = useState([])
  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const apiData = await API.graphql({ query: listCustomers })
    setCustomers(apiData.data.listCustomers.items)
  }

  async function createCustomer() {
    // if (!formData.name || !formData.address || !formData.number) return
    console.log("create Customer")
    // await API.graphql({ query: createCustomerMutation, variables: { input: formData } })

    await API.graphql({ query: mutations.createCustomer, variables: { input: formData} })

    console.log("got after the await")

    setCustomers([ ...customers, formData ])
    console.log(customers)
    setFormData(initialFormState)
  }

  async function deleteCustomer({ id }) {
    const newCustomersArray = customers.filter(note => note.id !== id)
    setCustomers(newCustomersArray)
    await API.graphql({ query: mutations.deleteCustomer, variables: { input: { id } }})
  }


  return (
    <div>
      <h1>Customers Page - Orders and prices available</h1>
      
      <input
        onChange = { e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Customer Name"
        value = {formData.name}
      />
      <input
        onChange = { e => setFormData({ ...formData, 'number': e.target.value})}
        placeholder = "Phone Number"
        value = {formData.number}
      />
      <input
        onChange = { e => setFormData({ ...formData, 'address': e.target.value})}
        placeholder = "Address"
        value = {formData.address}
      />
      <button onClick={createCustomer}>Create Customer</button>

      {
        customers.map(customer => (
            <div>
              <h3>{customer.name}</h3>
              <p>Number: {customer.number}</p>
              <p>Address: {customer.address}</p>
              <button onClick={() => deleteCustomer(customer)}>Delete Customer</button>
            </div>
        ))
      }
    </div>
  )
}

export default Customer