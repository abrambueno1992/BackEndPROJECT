import React from "react";

import { updateNote, getNotesAction } from "../actions/actions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import withAuth from "../lib/withAuth";

const textarea = {
  width: "90%",
  height: 300,
  padding: "12px 20px",
  boxSizing: "border-box",
  border: "2px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#f8f8f8",
  resize: "none",
  marginTop: 20
};
const bStyle = {
  marginTop: 20,
  width: "28.33%",
  backgroundColor: "#25b8bd",
  cursor: "pointer",
  color: "white",
  height: 50,
  fontWeight: "bold",
  fontSize: 20
};
const mainSt = {
  marginLeft: "5%",
  paddingTop: 55
};
const tStyle = {
  width: "47%",
  height: 40,
  marginTop: 10
};
const hSt = {
  fontWeight: "bold"
};

class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      note: "",
      notes: []
    };
  }
  componentWillUpdate = nextProps => {
    console.log("NoteS", nextProps.notes);
    if (this.props.notes !== nextProps.notes) {
      let noteTitle =
        nextProps.notes[this.props.match.params.idE] !== undefined ? (
          nextProps.notes[this.props.match.params.idE].title
        ) : (
          <div />
        );

      let noteContent =
        nextProps.notes[this.props.match.params.idE] !== undefined ? (
          nextProps.notes[this.props.match.params.idE].note
        ) : (
          <div />
        );
      this.setState({
        notes: nextProps.notes,
        note: noteContent,
        title: noteTitle
      });
    }
  };

  componentDidMount() {
    this.props.getNotesAction(this.props.history);
  }

  handleTextInput = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  newNote = e => {
    let noteID = this.props.notes[this.props.idE]._id;
    e.preventDefault();
    let updateContet = {
      title: this.state.title,
      note: this.state.note,
      Id: noteID
    };
    this.props.updateNote(updateContet, this.props.history);
    // const noteObject = { title: this.state.title, note: this.state.note };
    // this.props.updateNote(this.state.title, this.state.note, this.props.idE);
    this.setState({
      title: "",
      note: ""
    });
    this.props.history.push("/notes");
  };
  render() {
    console.log("This is the note from EditNote", this.props.match.params.idE);
    let noteContent =
      this.props.notes[this.props.match.params.idE] !== undefined ? (
        this.props.notes[this.props.match.params.idE].note
      ) : (
        <div />
      );
    return (
      <div style={mainSt}>
        <h3 style={hSt}>Edit Note:</h3>
        <input
          style={tStyle}
          type="text"
          name="title"
          value={this.state.title}
          placeholder="Note Title"
          onChange={this.handleTextInput}
        />
        <input
          style={textarea}
          type="text"
          name="note"
          value={this.state.note}
          placeholder={noteContent} //"Note Content"
          onChange={this.handleTextInput}
        />
        <Link to={`/`} onClick={this.newNote} style={bStyle}>
          <button style={bStyle}> Update</button>
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = state => {
  return {
    notes: state.notes
  };
};
export default withRouter(
  connect(
    mapDispatchToProps,
    { updateNote, getNotesAction }
  )(withAuth(EditNote))
);
