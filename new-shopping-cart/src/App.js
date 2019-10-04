import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container} from 'rbx';
import {ElevateAppBar, AddToCart} from './styling';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD3nnHJp02-ZeipmqAD60PjVr1vcIcJpfY",
  authDomain: "react-shopping-cart-7d1d3.firebaseapp.com",
  databaseURL: "https://react-shopping-cart-7d1d3.firebaseio.com/",
  projectId: "react-shopping-cart-7d1d3",
  storageBucket: "react-shopping-cart-7d1d3.appspot.com",
  messagingSenderId: "476849977207",
  appId: "1:476849977207:web:b7eff48e3e3eb3195ed372"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x, selectedSize, isRemove) => {
    if (isRemove){
      selected.splice(selected.indexOf(x),1)
      setSelected(selected)
    }
    else{
      let item = {};
      item["sku"]=x.sku;
      item["title"]=x.title;
      item["style"]=x.style;
      item["price"]=x.price;
      item["currencyFormat"]=x.currencyFormat;
      item["size"]=selectedSize.size;
      setSelected([item].concat(selected))
      //setSelected([item].concat(selected))
    }
    console.log(selected)
  };
  return [ selected, toggle ];
};

const allOutOfStock = (product) =>{
  if (outOfStock(product, 'S') && outOfStock(product, 'M') && outOfStock(product, 'L') && outOfStock(product, 'XL')){
    return true
  }
  return false
}

const outOfStock = (product, size) =>{
  return product[size] === 0
}

const Text = (selected, product, productList) => {
  if (allOutOfStock(product)){
    return "Out of Stock"
  }
  return selected ? productList.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map()).get(product) + " added" : "Add to cart"
}

const Product = ({allProducts, product, productState, sizeState, cartState, setCartState }) => {
  const classes = useStyles();
  var currSize = [];
  return (
  <Paper className={classes.paper}>
    {<img src={"data/products/"+product.sku+"_1.jpg"} height="250" width="250"></img>}
    {<br/>}
    {product.title}
    {<br/>}
    {product.currencyFormat}
    {product.price}
    {<br/>}
    <Button variant="contained" className={classes.button} disabled={outOfStock(product, 'S')} onClick={() =>{sizeState.setSize({ ...sizeState, ['size']: 'S' })}}>S</Button>
    <Button variant="contained" className={classes.button} disabled={outOfStock(product, 'M')} onClick={() =>{sizeState.setSize({ ...sizeState, ['size']: 'M' })}}>M</Button>
    <Button variant="contained" className={classes.button} disabled={outOfStock(product, 'L')} onClick={() =>{sizeState.setSize({ ...sizeState, ['size']: 'L' })}}>L</Button>
    <Button variant="contained" className={classes.button} disabled={outOfStock(product, 'XL')} onClick={() =>{sizeState.setSize({ ...sizeState, ['size']: 'XL' })}}>XL</Button>
    {<br/>}
    <Button disabled={allOutOfStock(product)} onClick={ () => {productState.toggle(product, sizeState.selectedSize, false); setCartState({ ...cartState, ['right']: true });}}>
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
  const [cartState, setCartState] = useState({right: false,});
  // size useState
  const [selectedSize, setSize] = useState({size:"S",});

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      const handleData = snap=>{
        if(snap.val()) {
          let combo = {};
          Object.keys(json).map(item => combo[item] = Object.assign(json[item], snap.val()[item]));
          setData(combo);
        }
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
    }
    fetchProducts();
  }, []);

  return (
    <Container maxwidth="1000">
    <ElevateAppBar product={products} productState={ {selected,toggle} } cartState={cartState} setCartState={setCartState}/>
    <Grid container spacing={3}>
    {products.map(product =>
      <Grid item xs={3} key={product.sku}>
        <Container>
          <Product allProducts={products} product={product} productState={{selected,toggle}} sizeState={{selectedSize,setSize}} cartState={cartState} setCartState={setCartState}/>
        </Container>
      </Grid>)}
    </Grid>
    </Container>

  );
};

export default App;
