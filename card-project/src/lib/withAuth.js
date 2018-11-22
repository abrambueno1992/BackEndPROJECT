import React from "react";

export default Page =>
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
      if (this.state.authenticated === true) {
        console.log("true, props are", this.props);
      }
      if (this.state.authenticated === false) {
        this.props.history.push("/login");
      }
    }

    render() {
      if (this.state.authenticated) {
        return <Page {...this.props} />;
      } else {
        return null;
      }
    }
  };
