import * as React from "react";
import { Component } from "react";
import { RouteComponentProps, match } from "react-router";

interface RouteData {
  movie: any;
}

export interface ItemDetailsProps {
  match?: match<RouteData>;
}

export interface ItemDetailsState {}

class ItemDetails extends React.Component<ItemDetailsProps, ItemDetailsState> {
  state = {};
  constructor(props: ItemDetailsProps) {
    super(props);
  }
  render() {
    return (
      <div>
        <p>{this.props.match.params.movie.name}</p>
      </div>
    );
  }
}

export default ItemDetails;
