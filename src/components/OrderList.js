import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { getCustomer, listCustomers } from '../graphql/queries'

function OrderList() {
  const [date, setDate] = useState(0)
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    fetchDate()
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const apiData = await API.graphql({ query: listCustomers })
    setCustomers(apiData.data.listCustomers.items)
  }

  async function fetchDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var dayOfTheWeek = new Date(mm + " " + dd + ", " + yyyy)
    setDate(dayOfTheWeek.getDay())
  }
  
  if (date <= 4) {
    return (
      <div>
        <p>Wednesday Order</p>
        <h4>Total orders: {customers.filter(customer => customer.wednesdayOrder).length}</h4>
        {
          customers.filter(customer => customer.wednesdayOrder).map(filteredCustomer => (
            <div>
              {filteredCustomer.name}
            </div>
          ))
        }
      </div>
    )
  } else {
    return (
      <div>
        <p>Saturday Order</p>
      </div>
    )
  }
}

export default OrderList