import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export interface CreateProps {
  web?: any;
}

export interface CreateState {}

class Create extends React.Component<CreateProps, CreateState> {
  public newItemCreated: {}; //stores the details of the new item
  state = {};
  constructor(props: CreateProps) {
    super(props);
    this.newItemCreated = { title: "new item" };
  }

  public changeHandle = (e) => {
    const createdItem = this.newItemCreated;
    createdItem[e.target.name] = e.target.value;
  };

  public handleSubmit = () => {
    const { web } = this.props;
    //Adding an item to the SP list
    web.lists
      .getByTitle("Test")
      .items.add({
        Title: this.newItemCreated["title"],
        name: this.newItemCreated["name"],
        Genre: this.newItemCreated["genre"],
        Plot: this.newItemCreated["plot"],
        ReleasedDate: this.newItemCreated["releasedDate"],
        Ratings: this.newItemCreated["ratings"],
      })
      .then((result: any) => alert("insert successful "))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="card">
        <h3>Add a new item here</h3>
        <form style={{ padding: "10px" }} name="createItemForm">
          <div className="form-group">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.changeHandle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Genre</label>
            <select
              className="form-control"
              onChange={this.changeHandle}
              name="genre"
            >
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-fi">Sci-fi</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Plot</label>
            <textarea
              className="form-control"
              name="plot"
              onChange={this.changeHandle}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="">Ratings</label>
            <input
              type="number"
              className="form-control"
              name="ratings"
              min={0}
              max={10}
              onChange={this.changeHandle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Released Date</label>
            <input
              type="date"
              className="form-control"
              name="releasedDate"
              onChange={this.changeHandle}
            />
          </div>
        </form>
        <button className="btn btn-success" onClick={this.handleSubmit}>
          Enter
        </button>
      </div>
    );
  }
}

export default Create;
