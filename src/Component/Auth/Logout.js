import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../redux/authActionCreators";

//const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
