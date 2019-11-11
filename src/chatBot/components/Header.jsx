import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#fff",
    "&$checked": {
      color: purple[500]
    },
    "&$checked + $track": {
      backgroundColor: purple[500]
    }
  },
  checked: {},
  track: {}
})(Switch);

const useStyles = makeStyles(theme => ({
  header: {
    alignItems: "center",
    backgroundColor: "#01a6e0",
    color: "#fff",
    display: "flex",
    fill: "#fff",
    height: "56px",
    justifyContent: "space-between",
    paddingLeft: "10px",
    paddingTop: "7px"
  },
  title: {
    fontSize: "17px"
  }
}));

const Header = ({ headerTitle, showParams, setShowParams }) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h2 className={classes.title}>{headerTitle}</h2>
      <FormGroup>
        {headerTitle !== "CoCo's Chatbot Competition" &&
          headerTitle !== "CoCo Demo" &&
          headerTitle !== "CoCo Bot" && (
            <FormControlLabel
              control={
                <PurpleSwitch
                  checked={showParams}
                  onChange={e => setShowParams(e.target.checked)}
                  value="checked"
                />
              }
              label="Dev Mode"
            />
          )}
      </FormGroup>
    </div>
  );
};

export default Header;
