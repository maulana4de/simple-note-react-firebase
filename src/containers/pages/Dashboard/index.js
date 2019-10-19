import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import { connect } from "react-redux";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataFromAPI,
  deleteDataFromAPI
} from "../../../config/redux/action";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    noteId: "",
    textButton: "SIMPAN"
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;

    // getdata from localstorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // initialitation data
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid
    };

    // selection if button equal simpan then running saveNotes function
    if (textButton === "SIMPAN") {
      saveNotes(data);
    } else {
      // initialitaion noteId and running updateNotes function
      data.noteId = noteId;
      updateNotes(data);
    }

    console.log(data);
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    });
  };

  updateNotes = note => {
    console.log(note);

    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "UPDATE",
      noteId: note.id
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN"
    });
  };

  deleteNote = (el, note) => {
    el.stopPropagation();
    const { deleteNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id
    };
    deleteNotes(data);
  };

  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props;
    const { updateNotes, cancelUpdate, deleteNote } = this;
    // test
    console.log("notes: ", notes);

    return (
      <div className="container">
        <div className="input-form">
          <input
            placeholder="title"
            className="input-title"
            value={title}
            onChange={e => this.onInputChange(e, "title")}
          />
          <textarea
            placeholder="content"
            className="input-content"
            value={content}
            onChange={e => this.onInputChange(e, "content")}
          ></textarea>
          <div className="action-wrapper">
            {textButton === "UPDATE" ? (
              <button
                className="save-btn cancel"
                onClick={this.handleSaveNotes}
                onClick={cancelUpdate}
              >
                CANCEL
              </button>
            ) : (
              <div></div>
            )}
            <button className="save-btn" onClick={this.handleSaveNotes}>
              {textButton}
            </button>
          </div>
        </div>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map(note => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => updateNotes(note)}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <p
                    className="delete-btn"
                    onClick={el => deleteNote(el, note)}
                  >
                    x
                  </p>
                </div>
              );
            })}
          </Fragment>
        ) : null}
      </div>
    );
  }
}

const reduxState = state => ({
  userData: state.user,
  notes: state.notes
});

const reduxDispatch = dispatch => ({
  saveNotes: data => dispatch(addDataToAPI(data)),
  getNotes: data => dispatch(getDataFromAPI(data)),
  updateNotes: data => dispatch(updateDataFromAPI(data)),
  deleteNotes: data => dispatch(deleteDataFromAPI(data))
});

export default connect(
  reduxState,
  reduxDispatch
)(Dashboard);
