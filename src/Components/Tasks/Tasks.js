import React from "react";
import trashFilled from "./trashFilled.png";
import "./Tasks.css";
import taskIncomplete from "./taskIncomplete.png";
import taskComplete from "./taskComplete.png";

export class Tasks extends React.Component {
  constructor(props) {
    super(props);

    // Binding of functions with (this)
    this.deleteTask = this.deleteTask.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  // Calls onto the callback function to delete a specific task
  deleteTask(event) {
    this.props.onDelete(event);
  }

  // Calls onto the callback functions to handle if a task is marked as complete or incomplete
  handleCheck(event) {
    this.props.onTaskCheck(event);
  }

  // Renders the tasks if any have been added
  render() {
    return (
      <div>
        {this.props.task.map((task) => (
          <div key={task.id}>
            <h2 id={"title-" + task.id} className="TaskTitle">
              {task.title}
              <div>
                <input
                  className="TaskCheck"
                  id={task.id}
                  type="image"
                  alt="TaskCheck"
                  src={task.isComplete === true ? taskComplete : taskIncomplete}
                  onClick={this.handleCheck}
                ></input>
                <input
                  className="Trash"
                  id={task.id}
                  type="image"
                  alt="Trash"
                  src={trashFilled}
                  onMouseDown={this.trashEffect}
                  onMouseUp={this.deleteTask}
                ></input>
              </div>
            </h2>
            <h3 id={"comment-" + task.id} className="TaskComment">
              {task.comment}
            </h3>
            <hr id={"line-" + task.id}></hr>
          </div>
        ))}
      </div>
    );
  }
}
