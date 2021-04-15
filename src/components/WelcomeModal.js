import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { CircularProgress } from "@material-ui/core";
import Done from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    color: "#dddddd",
    background: "rgb(48,48,48)",
    border: "0px solid #000",
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function WelcomeModal({ loading }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  
  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Welcome to Citibike Trips!</h2>
            <p id="transition-modal-description">
              Explore how residents of Jersey City (neighbors of NYC) use the
              Citibikes bike share system throughout the day.
            </p>
            <p>Where do they come from? Where do they go? Let's find out!</p>
            <p>
              Data courtesy of CitiBike: https://www.citibikenyc.com/system-data
            </p>

            {loading ? (
              <div>
                The data is loading, please wait. <CircularProgress />
              </div>
            ) : (
              <div>
                <p>
                  Loading complete. Click outside to continue <Done />
                </p>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
