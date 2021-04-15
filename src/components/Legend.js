import React, { useState, useEffect } from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import IconHelp from "@material-ui/icons/Help";

export default function Legend({ counts, resetFilter, resetView }) {
  const [printCount, setPrintCount] = useState(0);
  useEffect(() => {
    setPrintCount(((counts / 75960) * 100).toFixed(2));
  }, [counts]);

  const PositionContainer = styled("div")({
    position: "absolute",
    zIndex: 1,
    top: "2em",
    left: "2em",
    width: "40%",
  });

  const CenterContainer = styled("div")({
    color: "#dddddd",
    borderColor: "rgb(72,72,72)",
    padding: "1em",
    position: "",
    zIndex: 1,
    height: "100%",
    width: "60%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "rgb(48,48,48)",
    borderRadius: "10px",
  });

  const TextContainer = styled("div")({
    color: "#dddddd",
    display: "block",
    fontSize: "1.2em",
    marginTop: "0.25em",
    marginBottom: "0.83em",
    marginLeft: 0,
    marginRight: 0,
    fontWeight: "bold",
  });

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

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <PositionContainer>
        <CenterContainer>
          <TextContainer>Percent of trips during this time</TextContainer>
          <TextContainer>{printCount}%</TextContainer>
          <div>
            <Button
              variant="contained"
              disableElevation
              onClick={resetFilter}
              color="primary"
            >
              Reset Filter
            </Button>
            <Button
              variant="contained"
              disableElevation
              onClick={resetView}
              color="primary"
            >
              Reset View
            </Button>
            <IconButton
              variant="contained"
              disableElevation
              onClick={handleOpen}
              color="secondary"
            >
              <IconHelp />
            </IconButton>
          </div>
        </CenterContainer>
      </PositionContainer>
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
              <h2 id="transition-modal-title">Help:</h2>
              <ul>
                <li>
                  The map displays Citibike stations where bikes can be rented
                  and returned.
                </li>
                <li>
                  The colors of the columns designate if there is a net inflow
                  or outflow of bikes at that station during the current time
                  window.
                </li>
                <li>Green designates inflow of bikes to that station.</li>
                <li>Red designates outflow of bikes from that station.</li>
                <p></p>
                <li>
                  Hovering on a station will adjust the map to show how where
                  bikes to this originated from.
                </li>
                <p></p>
                <li>
                  The time filter can be adjusted to view how bikes move
                  throughout the day.
                </li>
                <li>The lock icon toggles the fixed/free filter size.</li>
                <li>The filter can be reset with the "Reset Filter" button.</li>
                <p></p>
                <li>
                  The view of the map can be reset to the initial using the
                  "Reset View" button
                </li>
              </ul>
              <p>
                Data courtesy of CitiBike:
                https://www.citibikenyc.com/system-data
              </p>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
