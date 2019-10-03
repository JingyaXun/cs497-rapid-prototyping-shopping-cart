import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Button } from 'rbx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingCart from "@bit/mui-org.material-ui-icons.shopping-cart";
import Grid from '@material-ui/core/Grid';
import {CartWindow} from './drawer';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export const AddToCart = ({ products }) => (
  <Container>
    {products.filter(product => product.status === 1).map(
      product => <Grid>
        <img src={"data/products/"+product.sku+"_2.jpg"} height="50" width="50"></img>}
        {<br/>}
        {product.size} {" | "} {product.style}
        {<br/>}
        {product.quantity}
      </Grid>
    )}
  </Container>
);

const LoadCart = ({state}) => {
  console.log("loading shopping cart");
  console.log(state)
  //const s => state.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
};

export function ElevateAppBar({ props, products, state }) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h5" className={classes.title}></Typography>
            {auth && (
              <div>
                <IconButton
                  aria-label="shopping cart"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={function(event){handleMenu(event);}}
                  color="inherit"
                >
                {console.log(state.selected)}
                </IconButton>
                <CartWindow/>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box my={2}>
        </Box>
      </Container>
    </React.Fragment>
  );
}
