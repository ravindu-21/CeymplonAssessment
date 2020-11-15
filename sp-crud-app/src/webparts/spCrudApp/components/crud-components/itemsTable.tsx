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
          <tbody>
            {this.props.items.map((item) => (
              <tr>
                <td style={{ padding: "20px" }}>{item.name}</td>
                <td>
                  <button className="btn btn-link">
                    <Link to={`/details/${item}`}>View Details</Link>
                  </button>
                </td>
                <td>
                  <button className="btn btn-warning">
                    <Icon iconName="EditSolid12" />
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
                {/* <tr>
                  <Edit web={this.props.web} item={item.ID}></Edit>
                </tr> */}
              </tr>
            ))}
            <Route
              path="/details/:movie"
              // render={(props) => <ItemDetails {...props} item={this.state.listItems}  />}
              component={ItemDetails}
            />
            {/* <Route
                  path="/edit/:movies"
                  render={(props) => <Edit {...props} web={this.props.web} />}
                /> */}
          </tbody>
        </table>
      </Router>
    );
  }
}

export default ItemsTable;
