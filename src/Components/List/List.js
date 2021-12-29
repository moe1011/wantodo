import React from "react";
import { Tasks } from "../Tasks/Tasks";
import "./List.css";
import addTask from "./addTask.png";
import addTaskClicked from "./addTaskClicked.png";

export class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = { addIsClicked: false };

    // Binding of functions with (this)
    this.handleAdd = this.handleAdd.bind(this);
    this.addButtonEffect = this.addButtonEffect.bind(this);
    this.LoadStorage = this.LoadStorage.bind(this);
  }

  //Adds a click effect to the button when left click on the mouse is held down
  addButtonEffect() {
    this.setState({ addIsClicked: true });
  }

  //Handles the addition of new tasks
  handleAdd(event) {
    this.setState({ addIsClicked: false });

    const taskTitle = document.getElementsByClassName("Title")[0].value;
    const taskComment = document.getElementsByClassName("Comment")[0].value;

    //If the title is empty (or white space is entered) a new task will not be created
    if (taskTitle.trim().length === 0) {
      return;
    }

    this.props.onAdd(event, taskTitle, taskComment);

    //Emptys the input fields
    document.getElementsByClassName("Title")[0].value = "";
    document.getElementsByClassName("Comment")[0].value = "";
  }

  LoadStorage() {}

  //Grabs user input for a new task and comment, displays it if a non-empty task is entered
  render() {
    return (
      <div className="List">
        <Tasks
          task={this.props.task}
          id={this.props.id}
          onDelete={this.props.onDelete}
          onTaskCheck={this.props.onTaskCheck}
        />

        <input
          className="Title"
          type={"text"}
          placeholder="Enter a Title for your task!"
          title=""
        ></input>
        <br></br>
        <input
          className="Comment"
          type={"text"}
          placeholder="Enter a Comment to describe your task (optional)"
          comment=""
        ></input>
        <input
          className="AddTask"
          type="image" 
          alt="AddTask"
          src={this.state.addIsClicked ? addTaskClicked : addTask}
          onMouseDown={this.addButtonEffect}
          onMouseUp={this.handleAdd}
        ></input>
      </div>
    );
  }

  componentDidMount() {}
}
