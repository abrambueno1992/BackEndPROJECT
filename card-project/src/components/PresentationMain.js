import React from "react";
import { logoutAction, reorderState, getNotesAction } from "../actions/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Presentation from "./Presentation";
import withAuth from "../lib/withAuth";

const mainSt = {
  marginLeft: "2%",
  paddingTop: 50
};

export class PresentationMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }
  componentWillUpdate = nextProps => {
    if (this.props.notes !== nextProps.notes) {
      this.setState({ notes: nextProps.notes });
    }
    if (this.props.reOrder === true) {
      this.setState({ notes: this.props.notes });
    }
    if (!this.props.notes && !nextProps.notes) {
      this.props.getNotesAction(this.props.history);
    }
    if (
      this.props.error !== nextProps.error &&
      nextProps.error === "TokenExpiredError"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("ID");
      localStorage.removeItem("notes");
      this.props.history.push("/");
    }
  };

  componentDidMount() {
	  if (this.props.notes === null) {
		  this.props.getNotesAction(this.props.history);
	  }
    // if (
    //   localStorage.getItem("token") !== null &&
    //   localStorage.getItem("ID") !== null
    // ) {
    //   this.setState({ list: this.props.notes });
    // } else {
    //   this.setState({ autheticated: "Not authenticated, Access Denied" });
    //   this.props.history.push("/");
    // }
  }

  refresh = () => {
    this.props.notes;
    // this.forceUpdate()
  };

  toggle = e => {
    e.preventDefault();
    this.setState({
      modal: !this.state.modal
    });
  };
  handleDelete = id => {
    let IDnote = {
      Id: id
    };
    this.props.deleteNote(IDnote, this.props.history);
    this.refresh();
    this.setState({
      modal: !this.state.modal
    });
    this.props.history.push("/notes");
  };
  handleInputChange = (checkBoolean, id) => {
    // event.preventDefault();
    let trueObj = {
      check: true,
      Id: id
    };
    let falseObj = {
      check: false,
      Id: id
    };
    // this.setState({checked: this.state.checked === false ? true : false});
    // this.setState({ccolor: this.state.ccolor === 'red' ? 'blue' : 'red' });
    checkBoolean === false
      ? this.props.updateNote(trueObj, this.props.history)
      : this.props.updateNote(falseObj, this.props.history);
    // this.setState({Complete: this.state.Complete === 'NOT COMPLETE' ? 'COMPLETED' : 'NOT COMPLETE'});
    // this.props.getNotesAction();
    this.props.history.push("/notes");
    // this.props.checkUpdate(this.state.checked, this.props.id);
    // window.location.reload()
  };

  render() {
    return (
      <div style={mainSt}>
        <Presentation ndata={this.props.notes} />
      </div>
    );
  }
}
const mapDispatchToProps = state => {
  return {
    notes: state.notes,
    error: state.error
  };
};

export default withRouter(
  connect(
    mapDispatchToProps,
    { logoutAction, getNotesAction, reorderState }
  )(withAuth(PresentationMain))
);
