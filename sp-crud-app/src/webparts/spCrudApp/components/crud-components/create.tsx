import * as React from "react";
import { Component } from "react";

export interface CreateNProps {
  web?: any;
  onChange?: any;
  onSubmit?: any;
}

export interface CreateNState {}

class CreateN extends React.Component<CreateNProps, CreateNState> {
  public newItem: {}; //stores the details of the new item
  state = {};
  constructor(props: CreateNProps) {
    super(props);
    this.newItem = { title: "nitem", date: new Date() };
  }

  public changeHandle = (e) => {
    const createdItem = this.newItem;
    createdItem[e.target.name] = e.target.value;
    console.log(createdItem, this.newItem["genre"]);

    //this.setState({[e.target.name]: e.target.value });
  };

  public handleSubmit = () => {
    const { web } = this.props;
    web.lists
      .getByTitle("Test")
      .items.add({
        Title: this.newItem["title"],
        name: this.newItem["name"],
        Genre: this.newItem["genre"],
        Plot: this.newItem["plot"],
        ReleasedDate: this.newItem["date"],
        Ratings: this.newItem["ratings"],
      })
      .then((result: any) => console.log("insert successful "))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  render() {
    const { onChange, onSubmit } = this.props;
    return (
      <div className="card">
        <h3 style={{ padding: "10px", backgroundColor: "blue" }}>
          Add new item here
        </h3>
        <form style={{ padding: "10px" }}>
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
        </form>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
          Enter
        </button>
      </div>
    );
  }
}

export default CreateN;
