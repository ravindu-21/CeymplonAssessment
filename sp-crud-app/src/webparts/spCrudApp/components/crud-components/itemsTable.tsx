import * as React from "react";
import { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  match,
  useHistory,Redirect,
  HashRouter
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
    const { web} = this.props;
    //Deleting an item from SP list
    web.lists
      .getByTitle("Movies")
      .items.getById(movie)
      .delete()
      .then(() => console.log("delete successful"))
      .catch((err) => console.log(err));

      location.href = "https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo/_layouts/15/workbench.aspx";
  };

  render() {
    return (
      <HashRouter>
        <table className="table">
          <thead>
            <th>Title</th>
          </thead>
          <tbody id="table-content">
            <div>
              {this.props.items.map((item) => (
                <tr>
                  <td style={{ padding: "20px" }}>{item.name}</td>
                  <td>
                    <button className="btn btn-secondary" title="View">
                      <Link to={`/details/${item.ID}`} style={{color:"white"}}><Icon iconName="View" /></Link>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-warning" title="Edit">
                      <Link to={`/edit/${item.ID}`} style={{color:"white"}}>
                        <Icon iconName="EditSolid12" />
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(item.ID)}
                      title="Delete"
                    >
                      <Icon iconName="Delete" />
                    </button>
                  </td>
                </tr>
              ))}
            </div>
            {/* Details / Edit form is displaying here */}
            <section id="ViewAndEdit">
              {/* <Route
                path="/details/:itemId"
                render={(props) => (
                  <ItemDetails {...props} items={this.props.items} />
                )}
              />
              <Route
                path="/edit/:itemId"
                render={(props) => (
                  <Edit
                    {...props}
                    web={this.props.web}
                    items={this.props.items}
                  />
                )}
              /> */}
            </section>
            
          </tbody>
        </table>
      </HashRouter>
    );
  }
}

export default ItemsTable;
