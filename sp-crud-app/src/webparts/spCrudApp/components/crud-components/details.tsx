import * as React from "react";
import { RouteComponentProps, match } from "react-router";
import { Icon } from "office-ui-fabric-react/lib/Icon";

interface RouteData {
  itemId: any; //id of the item passed through routing
}

export interface ItemDetailsProps {
  match?: match<RouteData>;
  items: any;//all items
  //itemID: any;
}

export interface ItemDetailsState {}

class ItemDetails extends React.Component<ItemDetailsProps, ItemDetailsState> {
  state = {};
  constructor(props: ItemDetailsProps) {
    super(props);
  }

  goBack = () => {
    location.href =
      "https://ravinduceymplon.sharepoint.com/sites/CeymplonDemo/_layouts/15/workbench.aspx";
  };
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
              <div className="card-title" id="details-card-title">
                <h1 style={{ textShadow: "0.5px 0.5px 1px #000000" }}>
                  <Icon iconName="MyMoviesTv" style={{ padding: "15px" }} />
                  {item.name}
                </h1>
                <span id="ratings-badge">
                  <Icon iconName="FavoriteStarFill" />
                  {item.Ratings}
                </span>
              </div>
              <p>
                Genre:<b>{item.Genre}</b>
              </p>
              <p>
                Released Date:
                <b>
                  {new Intl.DateTimeFormat("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }).format(new Date(item.ReleasedDate))}
                </b>
              </p>
              <p>{item.Plot}</p>
              <button
                className="btn btn-primary"
                style={{ marginLeft: "80%" }}
                onClick={this.goBack}
              >
                <Icon iconName="ChromeBack" style={{ padding: "5px" }} />
                Go Back
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ItemDetails;
