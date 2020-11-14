import * as React from "react";
//import styles from "./SpCrudApp.module.scss";
import { ISpCrudAppProps } from "./ISpCrudAppProps";
import { ISpCrudAppState } from "./ISpCrudAppState";
import Create from "./crud-components/create";
import "./style.css";
import { escape } from "@microsoft/sp-lodash-subset";
//import { SPOperations } from "../services/SPServices";
import "bootstrap/dist/css/bootstrap.css";
//import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
//import { Button } from 'react-bootstrap'
// import "font-awesome/css/font-awesome.css"
// import "font-awesome/css/font-awesome.min.css"

export default class SpCrudApp extends React.Component<
  ISpCrudAppProps,
  ISpCrudAppState,
  any
> {
  constructor(props: ISpCrudAppProps, any) {
    super(props);
    this.state = {
      listItems: [], //stores items retrieved from SharePoint list
    };
  }
  //SharePoint site URL
  public web = Web("https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo");

  public componentDidMount = () => {
    //retrieving items from SP list
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

  public render(): React.ReactElement<ISpCrudAppProps> {
    return (
      <Router>
        <Route path="/create" component={Create} ></Route>
        <div >
          <div id="head">
            <h2>My Movies</h2>
            <p>CRUD operations through SharePoint</p>
          </div>
          <button
            className="btn btn-dark"
            style={{ margin: "10px" }}
            data-toggle="modal"
            data-target="#addItemForm"
          >
            <Link to={"/create"}>New +</Link>
            
          </button>
          
          <table className="table">
            <thead>
              <th>Title</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </thead>
            <tbody>
              {this.state.listItems.map((m) => (
                <tr>
                  <td style={{ padding: "20px" }}>{m.name}</td>
                  <td>
                    <button className="btn btn-link">View Details</button>
                  </td>
                  <td>
                    <button className="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <section style={{ display: "none" }}>
          <Create web={this.web}></Create>
        </section> */}
        </div>
      </Router>
    );
  }
}
