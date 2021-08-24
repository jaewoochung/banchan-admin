import React, { useState, useEffect } from 'react'
import { API } from 'aws-amplify'
import { getMenuItem, listMenuItems } from '../graphql/queries'
import * as mutations from '../graphql/mutations'

const initialFormState = {
  name: '',
  servingSize: '',
  weeklyMenu: false
  }

function Menu () {
  const [items, setItems] = useState([])
  const [formData, setFormData] = useState(initialFormState)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  async function fetchMenuItems() {
    const apiData = await API.graphql({ query: listMenuItems})
    setItems(apiData.data.listMenuItems.items)
  }

  async function createMenuItem() {
    // grab the "create" mutation from graphql
    await API.graphql({ query: mutations.createMenuItem, variables: { input: formData} })
    // set the items in usestate and re-initialize
    setItems([ ...items, formData ])
    setFormData(initialFormState)
  }

  async function deleteMenuItem({ id }) {
    const newMenuItemsArray = items.filter(item => item.id !== id)
    setItems(newMenuItemsArray)
    await API.graphql({ query: mutations.deleteMenuItem, variables: { input: { id } }})
  }

  async function updateMenuItem({ id }) {
    const apiMenu = await API.graphql({ query: getMenuItem, variables: { id: id} })
    // update necessary fields
    const updatedItem = {
      id: apiMenu.data.getMenuItem.id,
      name: apiMenu.data.getMenuItem.name,
      servingSize: apiMenu.data.getMenuItem.servingSize,
      weeklyMenu: true
    }
    await API.graphql({ query: mutations.updateMenuItem, variables: { input: updatedItem } })
  }

  async function logInfo({ id }) {
    const apiMenu = await API.graphql({ query: getMenuItem, variables: { id: id} })
    console.log(apiMenu.data.getMenuItem)
  }

  return (
    <div>
      <h1>Menu Page</h1>
      <h3>Add a new menu item</h3>

      <input
        onChange = { e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Menu Name"
        value = {formData.name}
      />
      <input
        onChange = { e => setFormData({ ...formData, 'servingSize': e.target.value})}
        placeholder="Serving Size"
        value = {formData.servingSize}
      />

      <button onClick={createMenuItem}>Add Menu Item</button>

      {
        items.map((item) => {
          return (
            <div>
              <strong>Item:</strong> {item.name} - {item.servingSize} {item.weeklyMenu} <br></br>
              <button onClick={() => updateMenuItem(item)}>Add to this week</button>
              <button onClick={() => deleteMenuItem(item)}>Delete</button>
              <button onClick={() => logInfo(item)}>Log</button>
              <br></br>
              <br></br>
            </div>
          )
        })
      }

      <br></br>
    </div>
    
  )
}

export default Menu