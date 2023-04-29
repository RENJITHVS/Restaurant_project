import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  total: {
    fontWeight: 'bold',
  },
}));

const Bill = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();
  const classes = useStyles();

  useEffect(() => {
    axiosInstance
      .get(`/orders/${orderId}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error(err));
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" className={classes.title}>
          Order Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.order_items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell component="th" scope="row">
                    {item.menu_item.name}
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.menu_item.cost}</TableCell>
                  <TableCell align="right">{(item.quantity * item.menu_item.cost).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3} align="right">
                  <Box className={classes.total}>Total</Box>
                </TableCell>
                <TableCell align="right">{order.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Bill;