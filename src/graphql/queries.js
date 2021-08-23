/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomer = /* GraphQL */ `
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      id
      name
      address
      number
      deliverer
      price
      wednesdayOrder
      saturdayOrder
      createdAt
      updatedAt
    }
  }
`;
export const listCustomers = /* GraphQL */ `
  query ListCustomers(
    $filter: ModelCustomerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        number
        deliverer
        price
        wednesdayOrder
        saturdayOrder
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMenuItem = /* GraphQL */ `
  query GetMenuItem($id: ID!) {
    getMenuItem(id: $id) {
      id
      name
      servingSize
      weeklyMenu
      createdAt
      updatedAt
    }
  }
`;
export const listMenuItems = /* GraphQL */ `
  query ListMenuItems(
    $filter: ModelMenuItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenuItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        servingSize
        weeklyMenu
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
