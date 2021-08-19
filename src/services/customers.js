/**
 * Implement the back-end first
 */

import { API } from 'aws-amplify'
import { listCustomers } from './graphql/queries';
import { createCustomer as createCustomerMutation, deleteCustomer as deleteCustomerMutation } from './graphql/mutations';

