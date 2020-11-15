import * as React from "react";
import { Component } from "react";

export interface CreateProps {
  web?: any;
  onChange?: any;
  onSubmit?: any;
}

export interface CreateState {}

class Create extends React.Component<CreateProps, CreateState> {
  public newItemCreated: {}; //stores the details of the new item
  state = {};
  constructor(props: CreateProps) {
    super(props);
    this.newItemCreated = { title: "new item", };
  }

  public changeHandle = (e) => {
    const createdItem = this.newItemCreated;
    createdItem[e.target.name] = e.target.value;
    console.log(createdItem, this.newItemCreated["genre"]);
  };

  public handleSubmit = () => {
    const { web } = this.props;
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
      .then((result: any) => console.log("insert successful "))
      .catch((err) => console.log(err));

    //window.location.reload();
    // let frm=document.getElementsByName("createItemForm");
    // frm.reset();
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
            <input
              type="text"
              className="form-control"
              name="genre"
              onChange={this.changeHandle}
            />
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
              onChange={this.changeHandle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Ratings</label>
            <input
              type="date"
              className="form-control"
              name="releasedDate"
              onChange={this.changeHandle}
            />
          </div>
        </form>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Enter
        </button>
      </div>
    );
  }
}

export default Create;
