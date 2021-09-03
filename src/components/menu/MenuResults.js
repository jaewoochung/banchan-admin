import { useState, useEffect } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { API } from 'aws-amplify'
import { getMenuItem, listMenuItems } from '../../graphql/queries'
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import * as mutations from '../../graphql/mutations'

function CustomerResults() {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [menuItems, setMenu] = useState([])

  useEffect(() => {
    fetchMenu()
  }, [])

  async function fetchMenu() {
    const apiData = await API.graphql({ query: listMenuItems })
    setMenu(apiData.data.listMenuItems.items)
  }

  async function toggleMenu({ id }) {
    const apiMenu = await API.graphql({ query: getMenuItem, variables: { id: id} })
    // update necessary fields
    const updatedItem = {
      id: apiMenu.data.getMenuItem.id,
      name: apiMenu.data.getMenuItem.name,
      servingSize: apiMenu.data.getMenuItem.servingSize,
      weeklyMenu: true
    }
    await API.graphql({ query: mutations.updateMenuItem, variables: { input: updatedItem } })
    fetchMenu()
  }
  async function deleteMenu({ id }) {
    const newMenu = menuItems.filter(item => item.id !== id)
    setMenu(newMenu)
    await API.graphql({ query: mutations.deleteMenuItem, variables: { input: { id } }})
  }

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = menuItems.map((menu) => menu.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card sx= {{ ml: 32}}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === menuItems.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < menuItems.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Serving Size
                </TableCell>
                <TableCell>
                  Weekly Menu
                </TableCell>
                <TableCell>
                  Created date
                </TableCell>
                <TableCell>
                  Toggle Menu
                </TableCell>
                <TableCell>
                  Delete Food
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menuItems.slice(0, limit).map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  selected={selectedCustomerIds.indexOf(item.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(item.id) !== -1}
                      onChange={(event) => handleSelectOne(event, item.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={item.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {item.name}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.servingSize}
                  </TableCell>
                  <TableCell>
                    {`${item.weeklyMenu}`}
                  </TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ height: 35 }}
                      onClick={() => toggleMenu(item)}
                    >
                      Add menu
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{ height: 35 }}
                      onClick={() => deleteMenu(item)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={menuItems.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};


export default CustomerResults;
