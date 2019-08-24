import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
    bloodGroups.push(<div className='blood_group'><h4>{ value }:</h4> {props.details.blood_avl[value]}</div>)
  }


  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.details.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Phone: {props.details.ph_no}
        </Typography>
        <Typography color="textSecondary">
          { bloodGroups }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><a href={"https://www.google.com/maps/search/?api=1&query="+props.details.location.lat+","+props.details.location.long} target="blank">Open in Maps</a></Button>
      </CardActions>
    </Card>
  );
}
function App() {
  return (
    <Router>
      <Route exact path="/" component={HomeApp}/>
      <Route exact path="/request-blood" component={App}/>
    </Router>
  );
}

function HomeApp() {
  const cards = [];

  for (const [index, value] of bankData.entries()) {
    cards.push(<BankCard key={index} details={ value } />)
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>RedX</h1>
      </header>
      <main className="container">
        <section className="map-container">
          {cards}
        </section>
        <section className="action-container">
          <button className="request-btn"><Link to="/request-blood/">Request Blood</Link></button>
        </section>
      </main>
    </div>

  );
}
export default App;