import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Notification } from 'rbx';
import {ElevateAppBar, AddToCart} from './styling';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';


const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x) => {
    setSelected([x].concat(selected))
  };
  return [ selected, toggle ];
};

const Update = ({product, state}) => {
  state.toggle(product);
  console.log(`products in the list: ${state.selected}`);
  // console.log(state.selected);
  // console.log({product})
};

const Text = (selected, product, productList) => {
  return selected ? productList.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map()).get(product) + " added" : "Add to cart"
}

const Product = ({ product, state }) => {
  const classes = useStyles();
  return (
  <Paper className={classes.paper}>
    {<img src={"data/products/"+product.sku+"_1.jpg"} height="250" width="250"></img>}
    {<br/>}
    {product.title}
    {<br/>}
    {product.currencyFormat}
    {product.price}
    {<br/>}
    <Button variant="contained" className={classes.button}>S</Button>
    <Button variant="contained" className={classes.button}>M</Button>
    <Button variant="contained" className={classes.button}>L</Button>
    <Button variant="contained" className={classes.button}>XL</Button>
    {<br/>}
    <Button onClick={ () => state.toggle(product) }>
        { Text(state.selected.includes(product), product, state.selected) }
    </Button>
  </Paper>
  );
};

const ProductList = ({ products }) => {
  const [selected, toggle] = useSelection();
  return (
    <React.Fragment>
      { products.map(product => <Product key={product.sku} product={product}
        quantity={0} state={ { selected, toggle } } />) }
    </React.Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const App = () => {
  const [data, setData] = useState({});
  const [selected, toggle] = useSelection();
  
  //const [cart, setCart] = useState({ isOpen: 'True' });
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container maxwidth="1000">
    <ElevateAppBar product={products} state={ {selected,toggle} }/>
    <Grid container spacing={3}>
    {products.map(product =>
      <Grid item xs={3} key={product.sku}>
        <Container>
          <Product product={product} state={ {selected,toggle } }/>
        </Container>
      </Grid>)}
    </Grid>
    </Container>

  );
};

export default App;

// <Paper className={classes.paper}>
//   {<img src={"data/products/"+product.sku+"_1.jpg"} height="250" width="250"></img>}
//   {<br/>}
//   {product.title}
//   {<br/>}
//   {product.currencyFormat}
//   {product.price}
//   {<br/>}
//   <Button variant="contained" className={classes.button}>S</Button>
//   <Button variant="contained" className={classes.button}>M</Button>
//   <Button variant="contained" className={classes.button}>L</Button>
//   <Button variant="contained" className={classes.button}>XL</Button>
//   {<br/>}
//   //<Button variant="contained" className={classes.button}>Add to cart</Button>
//   <ProductButton/>
//   <Product/>
// </Paper>
