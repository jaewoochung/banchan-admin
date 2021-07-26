import React from 'react'

const menuSet = [
  {
    name: "김치",
    include: true
  },
  {
    name: "깍두기",
    include: false
  },
  {
    name: "해물파전",
    include: true
  },
  {
    name: "돈까스",
    include: true
  },
  {
    name: "카래",
    include: true
  },
  {
    name: "파무침",
    include: true
  }
]

const Menu = () => {
  return (
    <div>
      <h1>Welcome - Admin Home Page</h1>
      <h4>Orders for this week</h4>
      <h4>Total: {menuSet.length}</h4>

      {
        menuSet.map((item) => {
          return (
            <div>
              Item: {item.name} <br></br>
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