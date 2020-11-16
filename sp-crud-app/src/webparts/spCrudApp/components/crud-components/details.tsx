import * as React from "react";
import { Component } from "react";
import { RouteComponentProps, match } from "react-router";
import { Icon } from "office-ui-fabric-react/lib/Icon";

interface RouteData {
  itemId: any;
}

export interface ItemDetailsProps {
  match?: match<RouteData>;
  items: any;
}

export interface ItemDetailsState {}

class ItemDetails extends React.Component<ItemDetailsProps, ItemDetailsState> {
  state = {};
  constructor(props: ItemDetailsProps) {
    super(props);
  }
  render() {
    const { itemId } = this.props.match.params;
    //filtering the item that is chosen to view form all items
    const itemToBeView = this.props.items.filter(
      (i) => i.ID === parseInt(itemId)
    );

    return (
      <div style={{ padding: "15px" }}>
        {itemToBeView.map((item) => (
          <div>
            <div className="card" style={{ padding: "15px" }}>
              <h2 className="card-title">
                <Icon iconName="MyMoviesTv" />
                {item.name}
                <span
                  className="badge badge-primary"
                  style={{ fontSize: "10px" }}
                >
                  <Icon iconName="FavoriteStarFill" />
                  {item.Ratings}/10
                </span>
              </h2>
              <p>
                <b>{item.Genre}</b> /<b>Released on: {item.ReleasedDate}</b>
              </p>
              <p>{item.Plot}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ItemDetails;
