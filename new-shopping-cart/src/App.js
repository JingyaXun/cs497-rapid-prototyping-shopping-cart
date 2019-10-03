import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container} from 'rbx';
import {ElevateAppBar, AddToCart} from './styling';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x,isRemove) => {
    if (isRemove){
      selected.splice(selected.indexOf(x),1)
      setSelected(selected)
    }
    else{
      setSelected([x].concat(selected))
    }
  };
  return [ selected, toggle ];
};

const Update = ({product, state}) => {
  state.toggle(product, false);
  console.log(`products in the list: ${state.selected}`);
  // console.log(state.selected);
  // console.log({product})
};

const Text = (selected, product, productList) => {
  return selected ? productList.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map()).get(product) + " added" : "Add to cart"
}

const Product = ({ product, productState, cartState, setCartState }) => {
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
    <Button onClick={ () => {productState.toggle(product, false); setCartState({ ...cartState, ['right']: true });}}>
        { Text(productState.selected.includes(product), product, productState.selected) }
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
  const products = Object.values(data);
  // shopping cart state
  //const [cartState, toggleDrawer] = useSelectionCart();
  const [cartState, setCartState] = useState({right: false,});

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
    <ElevateAppBar product={products} productState={ {selected,toggle} } cartState={cartState} setCartState={setCartState}/>
    <Grid container spacing={3}>
    {products.map(product =>
      <Grid item xs={3} key={product.sku}>
        <Container>
          <Product product={product} productState={ {selected,toggle} } cartState={cartState} setCartState={setCartState}/>
        </Container>
      </Grid>)}
    </Grid>
    </Container>

  );
};

export default App;
