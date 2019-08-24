import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Typography from "@material-ui/core/Typography";
import "./App.css";
import bankData from "./demo_data/blood-bank.json";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RequestBlood from "./request_blood/request_blood";
import RedxHeroes from "./redx-heroes/redx-heroes";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ForumIcon from "@material-ui/icons/Forum";
import StarIcon from "@material-ui/icons/Star";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function BankCard(props) {
  const useStyles = makeStyles({
    card: {
      minWidth: 275
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)"
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  });
  const classes = useStyles();
  const bloodGroups = [];

  for (const [index, value] of Object.keys(props.details.blood_avl).entries()) {
    bloodGroups.push(
      <div key={index} className="blood_group">
        <h4>{value}:</h4> {props.details.blood_avl[value]}
      </div>
    );
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.details.name}
        </Typography>
        <Typography
          component={"div"}
          variant={"body2"}
          className={classes.pos}
          color="textSecondary"
        >
          Phone: {props.details.ph_no}
        </Typography>
        <Typography color="textSecondary" component={"div"} variant={"body2"}>
          {bloodGroups}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <a
            href={
              "https://www.google.com/maps/search/?api=1&query=" +
              props.details.location.lat +
              "," +
              props.details.location.long
            }
            target="blank"
          >
            Open in Maps
          </a>
        </Button>
      </CardActions>
    </Card>
  );
}

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomeApp} />
      <Route exact path="/request-blood" component={RequestBlood} />
      <Route exact path="/redx-heroes" component={RedxHeroes} />
    </Router>
  );
}

function HomeApp() {
  const cards = [];

  for (const [index, value] of bankData.entries()) {
    cards.push(<BankCard key={index} details={value} />);
  }
  const useStyles = makeStyles({
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    }
  });
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List className="drawer">
        <Link to="/redx-heroes/">
          <ListItem button key="RedX Heros">
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="RedX Heros" />
          </ListItem>
        </Link>
        <ListItem button key="Forum">
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Forum" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="App">
      <header className="app-header">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className="drawer_ico"
          onClick={toggleDrawer("left", true)}
        >
          <MenuIcon />
        </IconButton>
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {sideList("left")}
        </SwipeableDrawer>
        <h1 className="main_header">RedX</h1>
      </header>
      <div className="container">
        <div className="map-container">{cards}</div>
      </div>
      <button className="request-btn">
        <Link to="/request-blood/">Request Blood</Link>
      </button>
    </div>
  );
}
export default App;
