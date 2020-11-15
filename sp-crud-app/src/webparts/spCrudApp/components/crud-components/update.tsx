import * as React from "react";
import { Component } from "react";

export interface EditProps {
  item?: any;
  web?: any;
}

export interface EditState {}

class Edit extends React.Component<EditProps, EditState> {
  state = {};
  public itemEdited: {};
  constructor(props: EditProps) {
    super(props);
    this.itemEdited = { title: "new item" };
  }

  public changeHandle = (e) => {
    const createdItem = this.itemEdited;
    createdItem[e.target.name] = e.target.value;
    console.log(createdItem, this.itemEdited["genre"]);
  };

  public handleEdit = () => {};

  render() {
    return (
      <div>
        <h2>Edit item here</h2>
        {this.props.item.map((i) => {
          <div>
            <form style={{ padding: "10px" }} name="createItemForm">
              <div className="form-group">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={i.name}
                  onChange={this.changeHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  name="genre"
                  value={i.Genre}
                  onChange={this.changeHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Plot</label>
                <textarea
                  className="form-control"
                  name="plot"
                  value={i.Plot}
                  onChange={this.changeHandle}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="">Ratings</label>
                <input
                  type="number"
                  className="form-control"
                  name="ratings"
                  value={i.Ratings}
                  onChange={this.changeHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Ratings</label>
                <input
                  type="date"
                  className="form-control"
                  name="releasedDate"
                  value={i.ReleasedDate}
                  onChange={this.changeHandle}
                />
              </div>
            </form>
            <button className="btn btn-primary" onClick={this.handleEdit}>
              Enter
            </button>
          </div>;
        })}
      </div>
    );
  }
}

export default Edit;
