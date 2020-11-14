import * as React from "react";
//import styles from "./SpCrudApp.module.scss";
import { ISpCrudAppProps } from "./ISpCrudAppProps";
import { ISpCrudAppState } from "./ISpCrudAppState";
import { escape } from "@microsoft/sp-lodash-subset";
//import { SPOperations } from "../services/SPServices";
import "bootstrap/dist/css/bootstrap.css";
//import { sp } from "@pnp/sp/presets/all";
//import { sp } from "@pnp/sp";
//import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";

// export interface IDataFromOtherScState {
//   listItems: any;
//   //createItem: any;
// }
export default class SpCrudApp extends React.Component<
  ISpCrudAppProps,
  //IDataFromOtherScState,
  ISpCrudAppState,
  any
> {
  public newItem: {};
  constructor(props: ISpCrudAppProps, any) {
    super(props);
    this.newItem = { title: "nitem", date: new Date() };
    this.state = {
      listItems: [],
    };
  }

  private web = Web(
    "https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo"
  );

  public componentDidMount = () => {
    this.web.lists
      .getByTitle("Test")
      .items()
      .then((items) => {
        this.setState({
          listItems: items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  public changeHandle = (e) => {
    const createdItem = this.newItem;
    createdItem[e.target.name] = e.target.value;
    console.log(createdItem, this.newItem["genre"]);

    //this.setState({[e.target.name]: e.target.value });
  };

  public handleSubmit = () => {
    // const list=[...this.state.createItem,this.newItem]
    // this.setState({ createItem: list});
    // console.log("endNew", this.state.createItem);
    this.web.lists
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

  public render(): React.ReactElement<ISpCrudAppProps> {
    //const { name, genre, plot, ratings } = this.state;
    return (
      <div className="card">
        <div className="card-body">
          <h2>Test Application</h2>
          <span>CRUD operations through SharePoint</span>
          <p>Loading from - {this.props.context.pageContext.web.absoluteUrl}</p>
          <table className="table">
            <thead>
              <th>Name</th>
              <th>Genre</th>
              <th>Released Date</th>
              <th>Ratings</th>
              <th>Plot</th>
            </thead>
            <tbody>
              {this.state.listItems.map((m) => (
                <tr>
                  <td>{m.name}</td>
                  <td>{m.Genre}</td>
                  <td>{m.ReleasedDate}</td>
                  <td>{m.Ratings}</td>
                  <td>{m.Plot}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card">
            <h3 style={{ padding: "10px", backgroundColor: "yellow" }}>
              Add new item here
            </h3>
            <form style={{ padding: "10px" }}>
              <div className="form-group">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  //value={name}
                  onChange={this.changeHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Genre</label>
                <input
                  type="text"
                  className="form-control"
                  name="genre"
                  //value={genre}
                  onChange={this.changeHandle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Plot</label>
                <textarea
                  className="form-control"
                  name="plot"
                  //value={plot}
                  onChange={this.changeHandle}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="">Ratings</label>
                <input
                  type="number"
                  className="form-control"
                  name="ratings"
                  //value={ratings}
                  onChange={this.changeHandle}
                />
              </div>
            </form>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Enter
            </button>
          </div>
        </div>
      </div>
    );
  }
}
