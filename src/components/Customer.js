import React, { useState } from 'react'

const customers = [
  {
    name: "지아",
    number: "781-859-9940",
    address: "365 Trapelo Road, Belmont MA",
    order: true,
    price: 100,
    delivery: "윤미선"
  },
  {
    name: "도현",
    number: "617-233-1299",
    address: "123 Highland Ave, Arlington MA",
    order: true,
    price: 100,
    delivery: "윤미선"
  },
  {
    name: "서준",
    number: "781-316-2440",
    address: "99 Brookline Road, Brookline MA",
    order: false,
    price: 125,
    delivery: "신동숙"
  },
  {
    name: "민준",
    number: "781-490-6381",
    address: "44 Chestnut Lane, Boston MA",
    order: true,
    price: 115,
    delivery: "정면수"
  }
]
const Customer = () => {
  const [newName, setNewName] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleAddressChange = (event) => {
    console.log(event.target.value)
    setNewAddress(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addCustomer = (event) => {
    event.preventDefault()
    const customerObject = {
      name: newName,
      number: newNumber,
      address: newAddress,
      order: false,
      price: 0,
      delivery: "",
      id: customers.length + 1,
    }

    console.log(customerObject)
  }

  return (
    <div>
      <h1>Customers Page - Orders and prices available</h1>
      
      <form onSubmit={addCustomer}>
        Name: <input value={newName} onChange={handleNameChange}/>
        <br></br>
        Address: <input value={newAddress} onChange={handleAddressChange}/>
        <br></br>
        Phone Number: <input value={newNumber} onChange={handleNumberChange}/>
        <button type="submit">Add</button>
        <br></br>
      </form>

      {
        customers.map((customer) => {
          return (
            <div>
              Name: {customer.name} <br></br>
              Number: {customer.number} <br></br>
              Address: {customer.address} <br></br>
              Price: ${customer.price} <br></br>
              Delivery: {customer.delivery} <br></br>
              <br></br>
            </div>
          )
        })
      }
    </div>
    
  )
}

export default Customer