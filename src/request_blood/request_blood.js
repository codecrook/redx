import Button from "@material-ui/core/Button";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import BloodGroups from "../demo_data/blood_groups.json";
import AllBloodDonners from "../demo_data/blood-donor.json";
let allAvailableDoners = 0;
function RequestBlood() {
  const availableBloodGroups = [];

  for (const [index, value] of BloodGroups.available_groups.entries()) {
    availableBloodGroups.push(
      <option key={index} value={value}>
        {value}
      </option>
    );
  }
  const useStyles = makeStyles(theme => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    console.log(AllBloodDonners);
    let selectedGroup = document.getElementById("selected_blood_group")
      .selectedOptions[0].text;
    let allAvailableUsers = AllBloodDonners.filter(
      data => data.blood_group === selectedGroup
    );
    if (allAvailableUsers) {
      allAvailableDoners = allAvailableUsers.length;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="req_blood_container">
      <div className="req_blood_input_container">
        <label className="req_blood_label">Name:</label>
        <input type="text" />
      </div>
      <div className="req_blood_input_container">
        <label className="req_blood_label">Blood Group:</label>
        <select id="selected_blood_group">{availableBloodGroups}</select>
      </div>
      <div className="req_blood_input_container">
        <label className="req_blood_label">Phone Number:</label>
        <input type="number" />
      </div>
      <Button onClick={handleOpen} variant="contained">
        Send Request
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Blood Donation Request Sent</h2>
            <p id="transition-modal-description">
              Total request sent:- {allAvailableDoners}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default RequestBlood;
