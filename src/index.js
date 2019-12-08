import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Address from "./components/address/address";
import AddressMobile from "./components/address/address-mobile";
import Scheduler from "./components/scheduler/scheduler";
import SchedulerMobile from "./components/scheduler/scheduler-mobile";
import Feedback from "./components/feedback/feedback";
import FeedbackMobile from "./components/feedback/feedback-mobile";
import Demo from "./components/demo/demo";
import DemoMobile from "./components/demo/demo-mobile";
import Competition from "./components/competition/competition";
import CompetitionMobile from "./components/competition/competition-mobile";

// import TagManager from "react-gtm-module";

// const tagManagerArgs = {
//   gtmId: "GTM-MMJPSHT"
// };

// TagManager.initialize(tagManagerArgs);

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      dev: 450,
      md: 600,
      lg: 900,
      xl: 1200
    },
    keys: ["xs", "sm", "dev", "md", "lg", "xl"]
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/address" component={Address} />
        <Route path="/address-mobile" component={AddressMobile} />
        <Route path="/scheduler" component={Scheduler} />
        <Route path="/scheduler-mobile" component={SchedulerMobile} />
        <Route path="/feedback" component={Feedback} />
        <Route path="/feedback-mobile" component={FeedbackMobile} />
        <Route path="/demo" component={Demo} />
        <Route path="/demo-mobile" component={DemoMobile} />
        <Route path="/competition" component={Competition} />
        <Route path="/competition-mobile" component={CompetitionMobile} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
