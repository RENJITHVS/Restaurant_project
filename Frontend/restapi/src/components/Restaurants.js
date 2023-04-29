import React from 'react';
import axiosInstance from '../axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemCategory: {
        fontStyle: "italic",
    },
    itemCost: {
        fontWeight: "bold",
    },
    itemStatus: {
        textTransform: "uppercase",
        fontSize: "12px",
        letterSpacing: "1px",
        borderRadius: "4px",
        padding: "2px 4px",
    },
    available: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
    },
    unavailable: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
}));

const Restaurants = (props) => {
	const { posts } = props;
  const history = useHistory();
	const classes = useStyles();
    const [selectedQuantities, setSelectedQuantities] = React.useState({});

    const handleQuantityChange = (event, postId, incrementValue) => {
      const currentQuantity = selectedQuantities[postId] || 0;
      const newQuantity = Math.max(currentQuantity + incrementValue, 0);
      setSelectedQuantities({
        ...selectedQuantities,
        [postId]: newQuantity,
      });
    };

    const findCostById = (menuItemId) => {
        const menuItem = posts.find((post) => post.id === menuItemId);
        console.log(menuItem)
        return menuItem ? parseFloat(menuItem.cost) : 0;
    };

    const calculateTotal = (orderItems) => {
        let total = 0;
        orderItems.forEach((item) => {
            const cost = findCostById(parseInt(item.menu_item));
            total += cost * item.quantity;
        });
        return total.toFixed(2);
    }
    
    const handlePlaceOrder = (e) => {

        console.log("Placing order with quantities:", selectedQuantities);
        // Prepare the order items data
        const orderItems = [];
        for (const postId in selectedQuantities) {
                orderItems.push({
                    'menu_item': postId,
                    'quantity': selectedQuantities[postId],
                });
        }
        
        const total = calculateTotal(orderItems);
        if (!localStorage.getItem('access_token')) {
          // User is not authenticated, redirect to login page
          history.push('/login');
          return;
        }
        const orderData = {
          total: total,
          is_paid: false,
          is_complete: false,
          order_items: orderItems,
        };
        axiosInstance.post(`orders/create_order/`, orderData).then((res) => {
          console.log(res.data)
          history.push(`/bill/${res.data.id}`);
        }).catch((error) => {
          console.log(error);
        });
    };
    
	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {posts.map((post) => {
            return (
              <Grid item key={post.id} xs={12} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={post.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <div className={classes.cardHeader}>
                        <Typography
                        variant="h6"
                        component="h2"
                        className={classes.postTitle}
                        >
                        {post.name}
                        </Typography>
                    </div>
                    <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        className={classes.itemCategory}
                    >
                        {post.category.name}
                    </Typography>
                    <Typography variant="body2" color="textPrimary">
                        {post.description}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="textPrimary"
                        className={classes.itemCost}
                       
                    >
                        Rs. {post.cost}
                    </Typography>
                    <div>
                      <IconButton color="primary" onClick={(event) => handleQuantityChange(event, post.id, -1)}>
                        <RemoveIcon />
                      </IconButton>
                      <span>{selectedQuantities[post.id] || 0}</span>
                      <IconButton color="primary" onClick={(event) => handleQuantityChange(event, post.id, 1)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Container maxWidth="md" component="main">
      <Grid container spacing={5}  alignItems="center" justify="center" >
        <Grid item xs={12} md={4} >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Container>
    </React.Fragment>
	);
};
export default Restaurants;
