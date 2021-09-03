import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { getCustomer, listCustomers } from '../graphql/queries'
import * as mutations from '../graphql/mutations'
import { createCustomer as createCustomerMutation } from '../graphql/mutations'

const initialFormState = {
  name: '',
  number: '',
  address: '',
  deliverer: '',
  price: 100,
  wednesdayOrder: false,
  saturdayOrder: false
}

function Customer() {
  const [customers, setCustomers] = useState([])
  const [formData, setFormData] = useState(initialFormState)
  // const [prices, setPrice] = useState()

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const apiData = await API.graphql({ query: listCustomers })
    setCustomers(apiData.data.listCustomers.items)
  }

  async function createCustomer() {
    // await API.graphql({ query: mutations.createCustomer, variables: { input: formData} })
    await API.graphql({ query: createCustomerMutation, variables: { input: formData } });

    // setCustomers([ ...customers, formData ])
    setFormData(initialFormState)
    const apiData = await API.graphql({ query: listCustomers })

    console.log(apiData.data.listCustomers.items)
    setCustomers(apiData.data.listCustomers.items)
    console.log(customers)
  }

  async function deleteCustomer({ id }) {
    const newCustomersArray = customers.filter(note => note.id !== id)
    setCustomers(newCustomersArray)
    await API.graphql({ query: mutations.deleteCustomer, variables: { input: { id } }})
  }

  async function saturdayOrder({ id }) {
    const customerData = await API.graphql({ query: getCustomer, variables: { id: id} })
    const updatedCustomer = {
      id: customerData.data.getCustomer.id,
      name: customerData.data.getCustomer.name,
      number: customerData.data.getCustomer.number,
      address: customerData.data.getCustomer.address,
      deliverer: customerData.data.getCustomer.deliverer,
      price: customerData.data.getCustomer.price,
      wednesdayOrder: customerData.data.wednesdayOrder,
      saturdayOrder: true
    }
    await API.graphql({ query: mutations.updateCustomer, variables: { input: updatedCustomer } })
    alert("added to saturday Orders!")
  }

  async function wednesdayOrder({ id }) {
    const customerData = await API.graphql({ query: getCustomer, variables: { id: id} })
    const updatedCustomer = {
      id: customerData.data.getCustomer.id,
      name: customerData.data.getCustomer.name,
      number: customerData.data.getCustomer.number,
      address: customerData.data.getCustomer.address,
      deliverer: customerData.data.getCustomer.deliverer,
      price: customerData.data.getCustomer.price,
      wednesdayOrder: true,
      saturdayOrder: customerData.data.saturdayOrder
    }
    await API.graphql({ query: mutations.updateCustomer, variables: { input: updatedCustomer } })
    alert("added to wednesday orders")
  }

  async function logInfo($id) {
    console.log($id.id)
    // const apiCustomer = await API.graphql({ query: getCustomer, variables: { id: id} })
    // console.log(apiCustomer.data.getCustomer)
  }

  async function toggleDelivery(id, deliverer) {
    console.log(deliverer)
    console.log(id)
    const customerData = await API.graphql({ query: getCustomer, variables: { id: id} })
    const updatedCustomer = {
      id: customerData.data.getCustomer.id,
      name: customerData.data.getCustomer.name,
      number: customerData.data.getCustomer.number,
      address: customerData.data.getCustomer.address,
      deliverer: deliverer,
      price: customerData.data.getCustomer.price,
      wednesdayOrder: customerData.data.getCustomer.wednesdayOrder,
      saturdayOrder: customerData.data.saturdayOrder
    }
    await API.graphql({ query: mutations.updateCustomer, variables: { input: updatedCustomer }})
    const apiData = await API.graphql({ query: listCustomers })
    setCustomers(apiData.data.listCustomers.items)
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
              <p>Deliverer: {customer.deliverer}</p>
              <button onClick={() => toggleDelivery(customer.id, "Misun")}>Misun</button>
              <button onClick={() => toggleDelivery(customer.id, "Myunsoo")}>Myunsoo</button>
              <button onClick={() => toggleDelivery(customer.id, "Dongsook")}>Dongsook</button>
              <p>Price: {customer.price}</p>
              <button onClick={() => wednesdayOrder(customer)}>Wednesday Order</button>
              <button onClick={() => saturdayOrder(customer)}>Saturday Order</button>
              <button onClick={() => deleteCustomer(customer)}>Delete Customer</button>
              <button onClick={() => logInfo(customer)}>Log</button>
            </div>
        ))
      }
    </div>
  )
}

export default Customer