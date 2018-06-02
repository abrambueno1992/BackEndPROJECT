import React from 'react';
import { updateNote, deleteNote } from '../actions/actions';
import { connect } from 'react-redux';

class UpdateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            note: '',
            check: false,
            tag: '',
            //id of note coming soon
        }
    }
    componentDidMount = () => {

    };
    handleInput = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({ [name]: value })
    };
    handleSubmit = () => {
        this.props.updateNote(this.state, this.props.history)
    }
    handleDelete = () => {
        this.props.deleteNote("", this.props.history)
    }
    render() {
        return (
            <div>
                <h1>Update Component</h1>
                <input
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInput}
                />
                <input
                    type="text"
                    placeholder="Enter note"
                    name="note"
                    value={this.state.note}
                    onChange={this.handleInput}
                />
                <input
                    type="text"
                    placeholder="Enter tag"
                    name="tag"
                    value={this.state.tag}
                    onChange={this.handleInput}
                />
                <div>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
                <div>
                    <button onClick={this.handleDelete}>Delete Note</button>
                </div>
            </div>
        )
    }

};

const mapStateToProps = state => {
    return {

        notes: state.notes
    }
}

export default connect(mapStateToProps, { updateNote, deleteNote })(UpdateNote)