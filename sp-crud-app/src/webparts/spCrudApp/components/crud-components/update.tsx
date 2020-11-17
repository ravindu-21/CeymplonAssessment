import * as React from "react";
import { Component } from "react";
import { RouteComponentProps, match } from "react-router";

interface RouteData {
  itemId: any;
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
  constructor(props: EditProps) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      plot: "",
      releasedDate: "",
      ratings: undefined,
    };
  }

  public changeHandle = (e: any) => {
    const itemsCopy = { ...this.state };
    itemsCopy[e.target.name] = e.target.value;
    this.setState({
      name: itemsCopy["name"],
      genre: itemsCopy["genre"],
      plot: itemsCopy["plot"],
      ratings: itemsCopy["ratings"],
      releasedDate: itemsCopy["releasedDate"],
    });
  };

  public handleEdit = async (id: any) => {
    const { web } = this.props;
    const { name, genre, plot, releasedDate, ratings } = this.state;
    //updating an item from SP list
    await web.lists
      .getByTitle("Movies")
      .items.getById(id)
      .update({
        name: `${name}`,
        Genre: `${genre}`,
        Plot: `${plot}`,
        ReleasedDate: `${releasedDate}`,
        Ratings: `${ratings}`,
      })
      .then(() => alert("Update successful "))
      .catch((err) => alert(err));

     location.href =
     "https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo/_layouts/15/workbench.aspx";
    //this.reload();
  };
  

  componentDidMount = () => {
    const { itemId } = this.props.match.params;
    //filtering the item that is chosen to edit form all items
    const itemToBeEdit = this.props.items.filter(
      (item) => item.ID === parseInt(itemId)
    );
    for (let i = 0; i < itemToBeEdit.length; i++) {
      const element = itemToBeEdit[i];
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
    const { itemId } = this.props.match.params;
    const { name, genre, plot, releasedDate, ratings } = this.state;

    return (
      <div className="card" style={{padding:"10px",margin:"3px"}}>
        <h2>Edit Movie</h2>
        <div>
          <form style={{ padding: "10px" }} name="createItemForm">
            <div className="form-group">
              <label htmlFor="">Title</label>
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
              <select
                className="form-control"
                onChange={this.changeHandle}
                name="genre"
              >
                <option
                  value="Action"
                  selected={genre === "Action" ? true : false}
                >
                  Action
                </option>
                <option
                  value="Comedy"
                  selected={genre === "Comedy" ? true : false}
                >
                  Comedy
                </option>
                <option
                  value="Sci-fi"
                  selected={genre === "Sci-fi" ? true : false}
                >
                  Sci-fi
                </option>
              </select>
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

          <button
            className="btn btn-primary"
            onClick={() => this.handleEdit(parseInt(itemId))}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default Edit;
