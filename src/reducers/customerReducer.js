
const customerReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_CUSTOMER':
      return state.concat(action.data)
    default:
      return state
  }
}

export const createCustomer = (content) => {
  return {
    type: 'NEW_CUSTOMER',
    data: {
      content
    }
  }
}

export default customerReducer