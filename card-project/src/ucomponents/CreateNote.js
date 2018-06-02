import React from 'react';
import {createNoteAction} from '../actions/actions'
import {connect  } from "react-redux";
class CreateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            title: '',
            note: '',
            check: false,
            tag: '',
            _creator: ''
        }
    }
    componentDidMount = () => {
      
    }
    handleSubmit = () => {
        this.props.createNoteAction(this.state, this.props.history)
    }
    handleInput = (e) => {
     const   {name, value} = e.target;
     this.setState({[name]: value})
    }
    render() {
      return (
        <div>
          <h1>Create Note Component</h1>
          <input
          type="text"
          placeholder="Enter title"
          value={this.state.title}
          name="title"
          onChange={this.handleInput}
          />
          <input
          type="text"
          placeholder="Enter note"
          value={this.state.note}
          name="note"
          onChange={this.handleInput}
          />
          <input
          type="text"
          placeholder="Enter tag"
          value={this.state.tag}
          name="tag"
          onChange={this.handleInput}
          />
          <button onClick={this.handleSubmit}>Submit Note</button>
        </div>
      )
    }
    
};

// export default CreateNote
const mapStateToProp = state => {
   return {

       user: state.user
   }
};

export default connect(mapStateToProp, {createNoteAction})(CreateNote);