import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Button, Container, Title, Column, Notification } from 'rbx';
import {NestedGrid} from './styling';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const Banner = ({ title }) => (
  <Title>{ title }</Title>
);

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
  const products = Object.values(data);
  const classes = useStyles();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
    {products.map(product =>
      <Grid key={product.sku}><Paper className={classes.paper}>{
        <img src={"data/products/"+product.sku+"_2.jpg"} height="250" width="250"></img>}
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
      </Paper>
      </Grid>)}

    </Container>

  );
};

export default App;
