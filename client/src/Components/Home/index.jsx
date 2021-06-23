import React from "react";
import { connect } from "react-redux";
import AppNavbar from "../NavBar";
import Dashboard from "../Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Spinner from "../Spinner";
import GuardedRoute from "../../utils/GuardedRoute";
import Profile from "../Profile";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { clearErrors } from "../../store/actions/errorActions";

const Home = ({ isLoading, isAuthenticated, error, clearErrors }) => {
  React.useEffect(() => {
    const clear = setTimeout(clearErrors, 2000);
    return () => clearTimeout(clear);
  }, [error.id]);

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    clearErrors();
  };
  return (
    <>
      {isAuthenticated !== null ? (
        <>
          <Router>
            <AppNavbar />
            <Switch>
              <GuardedRoute
                exact
                path="/"
                auth={isAuthenticated}
                component={Dashboard}
              />
              <Route exact path="/user/:username" component={Profile} />
            </Switch>
          </Router>
        </>
      ) : (
        <Spinner />
      )}
      {error.id !== null ? (
        <Snackbar
          open={error.id !== null}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={handleCloseError}
        >
          <Alert onClose={handleCloseError} severity="error" variant="filled">
            {error.msg && error.msg.msg ? error.msg.msg : null}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
  };
};

export default connect(mapStateToProps, { clearErrors })(Home);
