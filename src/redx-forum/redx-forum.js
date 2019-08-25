import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ForumData from "../demo_data/forum.json";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import "./redx-forum.css";

function ChatList(props) {
  const classes = makeStyles(theme => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    }
  }));
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src="https://www.w3schools.com/howto/img_avatar.png"
          />
        </ListItemAvatar>
        <ListItemText
          primary={props.details.user_name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.details.message}
              </Typography>
              {"  " + props.details.time} {",  " + props.details.date}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
class ListView extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.chatList = props.chatList;
  }

  sendMessage() {
    console.log(this);
    this.chatList.push({
      user_name: "Vandan Shah",
      date:
        new Date().getDate() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getYear(),
      time: new Date().getHours() + ":" + new Date().getMinutes(),
      message: document.getElementsByTagName("textarea")[0]
        ? document.getElementsByTagName("textarea")[0].value
        : ""
    });
    this.forceUpdate();
  }
  render() {
    return (
      <div className="chats_container">
        <div>{this.chatList}</div>
        <div className="comment_area">
          <TextareaAutosize
            aria-label="Write Message"
            rows={5}
            placeholder="Write Message"
          />
          <Button onClick={this.sendMessage.bind(this)} variant="contained">
            Send Message
          </Button>
        </div>
      </div>
    );
  }
}
function RedxForum() {
  let chatList = [];
  for (const [index, value] of ForumData.entries()) {
    chatList.push(<ChatList key={index} details={value} />);
  }
  return (
    <div className="top_donners_container">
      <h1>Forum</h1>
      <ListView chatList={chatList} />
    </div>
  );
}

export default RedxForum;
