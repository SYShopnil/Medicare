import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
// import { userContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
  const loginInfo = useSelector((state) => state.login.headers);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loginInfo ? (
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
