import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  if (!props.isAuth) {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Play
        </NavigationItem>
        <NavigationItem link="/signin">Signin</NavigationItem>
        <NavigationItem link="/signup">Signup</NavigationItem>
      </ul>
    );
  } else {
    return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Play
        </NavigationItem>
        <NavigationItem link="/signout" clicked={props.logout}>
          Signout
        </NavigationItem>
      </ul>
    );
  }
};

export default navigationItems;
