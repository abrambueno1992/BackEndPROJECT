import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

let globalUser = null;

export default (Page, { loginRequired = true, logoutRequired = false } = {}) =>
  class BaseComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated:
          localStorage.getItem("token") !== null &&
          localStorage.getItem("ID") !== null
            ? true
            : false,
        checked: false
      };
    }
    componentDidMount() {
      //Get credentials from storage, cookies, or wherever
      //Check credentials if any
      //if there are no credentials redirect to login
      //if there are credentials, give permission to render Page (aka the component)
      //   if (
      //     localStorage.getItem("token") !== null &&
      //     localStorage.getItem("ID") !== null
      //   ) {
      //     this.setState({ list: this.props.notes });
      //   } else {
      //     this.setState({ autheticated: "Not authenticated, Access Denied" });
      //     this.props.history.push("/");
      //   }
      //   if (loginRequired && !logoutRequired && !user) {
      //     Router.push("/public/login", "/login");
      //     this.props.history.push("/notes");
      //     return;
      //   }
      //   if (logoutRequired && user) {
      //     Router.push("/");
      //   }
      //   if (adminRequired && (!user || !user.isAdmin)) {
      //     Router.push('/customer/my-books', '/my-books');
      //   }
      if (this.state.authenticated === true) {
        // this.props.history.push("/notes");
        console.log("true, props are", this.props);
      }
      if (this.state.authenticated === false) {
        this.props.history.push("/login");
        console.log("false, props are false", this.props);
      }
    }

    render() {
      //   const { user } = this.props;

      //   if (loginRequired && !logoutRequired && !user) {
      //     return null;
      //   }

      //   if (logoutRequired && user) {
      //     return null;
      //   }

      //   if (adminRequired && (!user || !user.isAdmin)) {
      //     return null;
      //   }

      return <Page {...this.props} />;
    }
  };
