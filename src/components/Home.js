import React from 'react'

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
    order: false,
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

const menuSet = [
  {
    name: "김치",
    include: true,
    size: "8 oz"
  },
  {
    name: "깍두기",
    include: false,
    size: "8 oz"
  },
  {
    name: "해물파전",
    include: true,
    size: "20 oz"
  },
  {
    name: "돈까스",
    include: true,
    size: "32 oz"
  },
  {
    name: "카래",
    include: true,
    size: "32 oz"
  },
  {
    name: "파무침",
    include: true,
    size: "12 oz"
  }
]

const Home = () => {
  // returning a filtered array of only important values or showing all
  const customersToShow = customers.filter(customer => customer.order)

  // returning a filtered array of only menu items for the week
  const menuToShow = menuSet.filter(item => item.include)

  
  return (
    <div>
      <h1>Welcome - Admin Home Page</h1>
      <h4>Total orders: {customersToShow.length}</h4>

      <h4>Food Menu</h4>
      {
        menuToShow.map((item) => {
          return (
            <div>
              {item.name} - {item.size}
            </div>
          )
        })
      }

      <br></br>
      <h4>Customers that ordered for the week</h4>
      {
        // List of customers that are approved for this week
        customersToShow.map((customer) => {
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


      <br></br>
    </div>
    
  )
}

export default Home