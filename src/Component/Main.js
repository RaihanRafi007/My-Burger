import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "./Auth/Auth";
import Logout from "./Auth/Logout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Header from "./Header/Header";
import CheckOut from "./Orders/Checkout/Checkout";
import Orders from "./Orders/Orders";
import { authCheck } from "./redux/authActionCreators";

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    authCheck: () => dispatch(authCheck()),
  };
};

class Main extends Component {
  componentDidMount() {
    this.props.authCheck();
  }
  render() {
    let routes = null;
    if (this.props.token === null) {
      routes = (
        <Switch>
          <Route path="/login" component={Auth} />
          <Redirect to="/login" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={CheckOut} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Header />
        <div className="container">{routes}</div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
