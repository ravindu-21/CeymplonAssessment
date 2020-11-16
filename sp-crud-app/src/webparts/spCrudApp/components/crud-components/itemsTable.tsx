import * as React from "react";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  match,
} from "react-router-dom";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import ItemDetails from "./details";
import Edit from "./update";

export interface ItemsTableProps {
  items?: any;
  web?: any;
}

export interface ItemsTableState {}

class ItemsTable extends React.Component<ItemsTableProps, ItemsTableState> {
  state = {};
  constructor(props: ItemsTableProps) {
    super(props);
  }

  public handleDelete = (movie: any) => {
    const { web, items } = this.props;
    console.log(movie);
    console.log(items);
    web.lists
      .getByTitle("Test")
      .items.getById(movie)
      .delete()
      .then(() => console.log("delete successful"))
      .catch((err) => console.log(err));
  };

  public scrollDown = () => {
    let offsetTop = document.getElementById("ViewAndEdit").offsetTop;
    window.scrollTo({
      top: offsetTop - 10,
      behavior: "smooth",
    });
  };

  render() {
    return (
      <Router>
        <table className="table">
          <thead>
            <th style={{ textAlign: "center" }}>Title</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody id="table-content">
            <div>
              {this.props.items.map((item) => (
                <tr>
                  <td style={{ padding: "20px" }}>{item.name}</td>
                  <td>
                    <button className="btn btn-link" onClick={this.scrollDown}>
                      <Link to={`/details/${item.ID}`}>View</Link>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-warning">
                      <Link to={`/edit/${item.ID}`}>
                        <Icon iconName="EditSolid12" />
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(item.ID)}
                    >
                      <Icon iconName="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </div>
            <div id="ViewAndEdit">
              <Route
                path="/details/:movie"
                render={(props) => (
                  <ItemDetails {...props} items={this.props.items} />
                )}
                //component={ItemDetails}
              />
              <Route
                path="/edit/:movie"
                render={(props) => <Edit {...props} web={this.props.web} items={this.props.items} />}
              />
            </div>
          </tbody>
        </table>
      </Router>
    );
  }
}

export default ItemsTable;
