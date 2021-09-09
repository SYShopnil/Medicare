import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
// import { userContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
