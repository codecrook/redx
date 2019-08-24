import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './App.css';
import bankData from './demo_data/blood-bank.json';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function BankCard(props) {
  const useStyles = makeStyles({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();
  const bloodGroups = [];

  for (const [index, value] of Object.keys(props.details.blood_avl).entries()) {
    bloodGroups.push(<div key={ index } className='blood_group'><h4>{ value }:</h4> { props.details.blood_avl[value] }</div>)
  }


  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.details.name}
        </Typography>
        <Typography component={'div'} variant={'body2'} className={classes.pos} color="textSecondary">
          Phone: {props.details.ph_no}
        </Typography>
        <Typography color="textSecondary" component={'div'} variant={'body2'}>
          { bloodGroups }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><a href={"https://www.google.com/maps/search/?api=1&query="+props.details.location.lat+","+props.details.location.long} target="blank">Open in Maps</a></Button>
      </CardActions>
    </Card>
  );
}
function RequestBlood() {
  return (
    <form noValidate autoComplete="off">
      <TextField
        id="filled-name"
        label="Name"
        margin="normal"
        variant="filled"
      />
    </form>
);
}
function App() {
  return (
    <Router>
      <Route exact path="/" component={HomeApp}/>
      <Route exact path="/request-blood" component={RequestBlood}/>
    </Router>
  );
}

function HomeApp() {
  const cards = [];

  for (const [index, value] of bankData.entries()) {
    cards.push(<BankCard key={ index } details={ value } />)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>RedX</h1>
      </header>
      <div className="container">
        <div className="map-container">
          {cards}
        </div>
        <div className="action-container">
          <button className="request-btn"><Link to="/request-blood/">Request Blood</Link></button>
        </div>
      </div>
    </div>

  );
}
export default App;