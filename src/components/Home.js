import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { listMenuItems, listCustomers } from '../graphql/queries'
import OrderList from './OrderList'

function Home () {
  const [items, setItems] = useState([])
  const [customerList, setCustomers] = useState([])
  // const [date, setDate] = useState(0)
  // returning a filtered array of only important values or showing all

  useEffect(() => {
    fetchMenuItems()
    fetchCustomers()
    // fetchDate()
  }, [])

  // async function fetchDate() {
  //   var today = new Date();
  //   var dd = String(today.getDate()).padStart(2, '0');
  //   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   var yyyy = today.getFullYear();
  //   var dayOfTheWeek = new Date(mm + " " + dd + ", " + yyyy)
  //   setDate(dayOfTheWeek.getDay())
  // }

  async function fetchCustomers() {
    const apiData = await API.graphql({ query: listCustomers})
    setCustomers(apiData.data.listCustomers.items)
  }

  async function fetchMenuItems() {
    const apiData = await API.graphql({ query: listMenuItems})
    setItems(apiData.data.listMenuItems.items)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <h3>Food Menu</h3>
      {
        items.filter(item => item.weeklyMenu).map(filteredMenu => (
          <div>
            {filteredMenu.name} - {filteredMenu.servingSize}
          </div>
        ))
      }

      <br></br>
      <OrderList />
      <br></br>
    </div>
    
  )
}

export default Home