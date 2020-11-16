import * as React from "react";
import { Component } from "react";
import { RouteComponentProps, match } from "react-router";
import { Icon } from "office-ui-fabric-react/lib/Icon";

interface RouteData {
  movie: any;
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
    const { movie } = this.props.match.params;
    const filteredItems = this.props.items.filter(
      (m) => m.ID === parseInt(movie)
    );

    return (
      <div style={{ padding: "15px" }}>
        {filteredItems.map((item) => (
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
