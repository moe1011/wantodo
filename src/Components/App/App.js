import React from "react";
import { List } from "../List/List";
import "./App.css";
import taskIncomplete from "./taskIncomplete.png";
import taskComplete from "./taskComplete.png";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      uniqueTaskId:
        JSON.parse(localStorage.getItem("uniqueId")) == null
          ? 0
          : JSON.parse(localStorage.getItem("uniqueId")),
    };

    // Binding of functions with (this)
    this.saveToStorage = this.saveToStorage.bind(this);
    this.getFromStorage = this.getFromStorage.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleTaskCheck = this.handleTaskCheck.bind(this);

    // Retrieves the contents stored in local storage
    this.getFromStorage();
  }

  // Saves the current state onto local storage
  saveToStorage() {
    var taskJson = this.state.list;
    localStorage.setItem("tasks", JSON.stringify(taskJson));

    var idJson = this.state.uniqueTaskId;
    localStorage.setItem("uniqueId", JSON.stringify(idJson));
    console.log(localStorage.getItem("tasks"));
    console.log(localStorage.getItem("uniqueId"));
  }

  // Retrieves the previously stored state from the local storage
  getFromStorage() {
    try {
      let taskObj = JSON.parse(localStorage.getItem("tasks"));
      let task = this.state.list;

      for (let i = 0; i < taskObj.length; i++) {
        if (taskObj != null) {
          task.push(taskObj[i]);
        }
      }
    } catch (e) {}
    console.log("Storage Received");
  }

  // Handles a new task being added to the list
  handleAdd(event, taskTitle, taskComment) {
    this.state.list.push({
      title: taskTitle,
      comment: taskComment,
      isComplete: false,
      id: this.state.uniqueTaskId,
    });

    this.setState({ uniqueTaskId: this.state.uniqueTaskId + 1 }, () => {
      this.saveToStorage();
    });
  }

  // Handles a task being deleted
  handleDelete(event) {
    try {
      let key = event.target.id;

      const newList = this.state.list.filter((task) => task.id !== key);
      this.setState({ list: newList }, () => {
        this.saveToStorage();
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Handles tasks being marked as complete or incomplete
  handleTaskCheck(event) {
    // Creates new image objects for a task being Complete and Incomplete
    let taskDone = new Image();
    taskDone.src = taskComplete;
    let taskNotDone = new Image();
    taskNotDone.src = taskIncomplete;

    // Creates a copy of the tasks list
    let newList = this.state.list.filter((task) => task);
    // Grabs the tasks index location based on the tasks ID
    let key = newList.findIndex((task) => task.id === event.target.id);

    // Task is marked as complete and was previously incomplete
    if (newList[key].isComplete !== true) {
      event.target.src = taskDone.src;
      newList[key].isComplete = true;

      // Task is marked as incomplete and was previously complete
    } else {
      event.target.src = taskNotDone.src;
      newList[key].isComplete = false;
    }

    // Sets the new state of the list and saves the current values to the local storage
    this.setState({ list: newList }, () => {
      this.saveToStorage();
    });
  }

  // Renders the application
  render() {
    return (
      <div className="App">
        <h1>WanTo-Do</h1>
        <p>
          {" "}
          <a
            href="https://www.linkedin.com/in/mohammed-abdulla-b5281b19a/"
            target={"_blank"}
            rel="noreferrer"
          >
            LinkedIn
          </a>
          {" - "}
          <a
            href="https://github.com/moe1011"
            target={"_blank"}
            rel="noreferrer"
          >
            GitHub
          </a>
          {" - "}
          <a
            href="https://moe1011.github.io/moeasite/Home.html"
            target={"_blank"}
            rel="noreferrer"
          >
            Portfolio
          </a>
        </p>
        <p>An application by Mohammed Abdulla</p>
        <List
          task={this.state.list}
          uniqueId={this.state.uniqueTaskId}
          onAdd={this.handleAdd}
          onDelete={this.handleDelete}
          onTaskCheck={this.handleTaskCheck}
        />
      </div>
    );
  }
}

export default App;
