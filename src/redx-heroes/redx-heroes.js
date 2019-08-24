import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AllBloodDonners from "../demo_data/blood-donor.json";
import "./redx-heroes.css";

function HeroCard(props) {
  const classes = makeStyles({
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
          <h2>Total Donations: </h2>
          {props.details.blood_donation_count}
        </Typography>
      </CardContent>
    </Card>
  );
}
function RedxHeroes() {
  const cards = [];
  AllBloodDonners.sort(function(a, b) {
    return b["blood_donation_count"] - a["blood_donation_count"];
  });
  AllBloodDonners.splice(10);
  for (const [index, value] of AllBloodDonners.entries()) {
    cards.push(<HeroCard key={index} details={value} />);
  }
  return (
    <div className="top_donners_container">
      <h1>Top Donners</h1>
      <div className="top_donners_card_container">{cards}</div>
    </div>
  );
}

export default RedxHeroes;
