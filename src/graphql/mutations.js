/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomer = /* GraphQL */ `
  mutation CreateCustomer(
    $input: CreateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    createCustomer(input: $input, condition: $condition) {
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
export const updateCustomer = /* GraphQL */ `
  mutation UpdateCustomer(
    $input: UpdateCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    updateCustomer(input: $input, condition: $condition) {
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
export const deleteCustomer = /* GraphQL */ `
  mutation DeleteCustomer(
    $input: DeleteCustomerInput!
    $condition: ModelCustomerConditionInput
  ) {
    deleteCustomer(input: $input, condition: $condition) {
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
export const createMenuItem = /* GraphQL */ `
  mutation CreateMenuItem(
    $input: CreateMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    createMenuItem(input: $input, condition: $condition) {
      id
      name
      servingSize
      weeklyMenu
      createdAt
      updatedAt
    }
  }
`;
export const updateMenuItem = /* GraphQL */ `
  mutation UpdateMenuItem(
    $input: UpdateMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    updateMenuItem(input: $input, condition: $condition) {
      id
      name
      servingSize
      weeklyMenu
      createdAt
      updatedAt
    }
  }
`;
export const deleteMenuItem = /* GraphQL */ `
  mutation DeleteMenuItem(
    $input: DeleteMenuItemInput!
    $condition: ModelMenuItemConditionInput
  ) {
    deleteMenuItem(input: $input, condition: $condition) {
      id
      name
      servingSize
      weeklyMenu
      createdAt
      updatedAt
    }
  }
`;
