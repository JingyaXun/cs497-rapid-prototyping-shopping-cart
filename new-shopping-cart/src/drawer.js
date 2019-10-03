import React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Container } from 'rbx';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCart from "@bit/mui-org.material-ui-icons.shopping-cart";
import { ThemeProvider } from '@material-ui/styles';
import pink from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: pink,
  },
});

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
});

//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export function CartWindow({products, productStates}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = (side,products, productStates) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {productStates.selected.filter( onlyUnique ).map(product =>
          <Container key={product.sku}>
            {<img src={"data/products/"+product.sku+"_2.jpg"} height="100" width="100"></img>}
          </Container>
        )}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const fullList = side => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button size="large" color="primary" onClick={toggleDrawer('right', true)}><ShoppingCart /></Button>
      </ThemeProvider>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right', products, productStates)}
      </Drawer>
    </div>
  );
}
