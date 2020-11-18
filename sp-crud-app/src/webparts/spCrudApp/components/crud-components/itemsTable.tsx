import * as React from "react";
import { Component } from "react";
import { Link, HashRouter } from "react-router-dom";
import { Icon } from "office-ui-fabric-react/lib/Icon";

export interface ItemsTableProps {
  items?: any; //all items in SP List
  web?: any; //SP url
}

export interface ItemsTableState {}

class ItemsTable extends React.Component<ItemsTableProps, ItemsTableState> {
  state = {};
  constructor(props: ItemsTableProps) {
    super(props);
  }

  public handleDelete = (movie: any) => {
    const { web } = this.props;
    //Deleting an item from SP list
    web.lists
      .getByTitle("Movies")
      .items.getById(movie)
      .delete()
      .then(() => console.log("delete successful"))
      .catch((err) => console.log(err));

    location.href =
      "https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo/_layouts/15/workbench.aspx";
  };

  render() {
    return (
      <HashRouter>
        <table className="table">
          <thead>
            <th>Title</th>
            <th>Genre</th>
            <th>Ratings</th>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            {this.props.items.map((item) => (
              <tr>
                <td style={{ padding: "20px" }}>{item.name}</td>
                <td style={{ padding: "20px" }}>{item.Genre}</td>
                <td style={{ padding: "20px" }}>
                  <span style={{ color: "Blue", letterSpacing: "2px" }}>
                    {item.Ratings}
                    <Icon
                      iconName="FavoriteStarFill"
                      style={{ paddingTop: "2px" }}
                    />
                  </span>
                </td>
                <td>
                  <button className="btn btn-secondary" title="View">
                    <Link to={`/details/${item.ID}`} style={{ color: "white" }}>
                      <Icon iconName="View" />
                    </Link>
                  </button>
                </td>
                <td>
                  <button className="btn btn-warning" title="Edit">
                    <Link to={`/edit/${item.ID}`} style={{ color: "white" }}>
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
          </tbody>
        </table>
      </HashRouter>
    );
  }
}

export default ItemsTable;
