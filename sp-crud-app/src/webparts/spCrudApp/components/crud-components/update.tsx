import * as React from "react";
import { Component } from "react";
import { RouteComponentProps, match } from "react-router";

interface RouteData {
  movie: any;
}

export interface EditProps {
  match?: match<RouteData>;
  items?: any;
  web?: any;
}

export interface EditState {
  name: string;
  genre: string;
  plot: any;
  releasedDate: any;
  ratings: number;
}

class Edit extends React.Component<EditProps, EditState> {
  //state = {};
  public itemEdited: {};
  constructor(props: EditProps) {
    super(props);
    this.itemEdited = { title: "new item" };
    this.state = {
      name: "",
      genre: "",
      plot: "",
      releasedDate: "",
      ratings: undefined,
    };
  }

  public changeHandle = (e: any) => {
    // const createdItem = this.itemEdited;
    // createdItem[e.target.name] = e.target.value;
    // console.log(createdItem, this.itemEdited["genre"]);
    const editedData = {...this.state};
    editedData[e.target.name] = e.target.value;
    this.setState({
      name: editedData["name"],
      genre: editedData["genre"],
      plot: editedData["plot"],
      ratings: editedData["ratings"],
      releasedDate: editedData["releasedDate"],
    });
  };

  public handleEdit = (id: any) => {
    const { web } = this.props;
    const { name, genre, plot, releasedDate, ratings } = this.state;
    console.log("id: "+id);
    web.lists
      .getByTitle("Test")
      .items.getById(id)
      .update({
        name: `${name}`,
        Genre: `${genre}`,
        Plot: `${plot}`,
        ReleasedDate: `${releasedDate}`,
        Ratings: `${ratings}`,
      })
      .then((result: any) => console.log("Update successful "))
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    const { movie } = this.props.match.params;
    const filteredItems = this.props.items.filter(
      (m) => m.ID === parseInt(movie)
    );
    for (let i = 0; i < filteredItems.length; i++) {
      const element = filteredItems[i];
      this.setState({
        name: element.name,
        genre: element.Genre,
        plot: element.Plot,
        releasedDate: element.ReleasedDate,
        ratings: element.Ratings,
      });
    }
  };

  render() {
    const { movie } = this.props.match.params;
    const filteredItems = this.props.items.filter(
      (m) => m.ID === parseInt(movie)
    );
    console.log(this.state);
    console.log(filteredItems);
    const { name, genre, plot, releasedDate, ratings } = this.state;
    return (
      <div>
        <h2>Edit item here</h2>
        <div>
          {filteredItems.map((i) => (
            <form style={{ padding: "10px" }} name="createItemForm">
              <div className="form-group">
                <label htmlFor="">{i.name}</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={this.changeHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  name="genre"
                  value={genre}
                  onChange={this.changeHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Plot</label>
                <textarea
                  className="form-control"
                  name="plot"
                  value={plot}
                  onChange={this.changeHandle}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="">Ratings</label>
                <input
                  type="number"
                  className="form-control"
                  name="ratings"
                  value={ratings}
                  onChange={this.changeHandle}
                  min={0}
                  max={10}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">ReleasedDate</label>
                <input
                  type="date"
                  className="form-control"
                  name="releasedDate"
                  value={releasedDate}
                  onChange={this.changeHandle}
                />
              </div>
            </form>
          ))}

          <button className="btn btn-primary" onClick={()=>this.handleEdit(parseInt(movie))}>
            Enter
          </button>
        </div>
      </div>
    );
  }
}

export default Edit;
